import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import {
  createAsset,
  getAssetCategories,
  getAssets,
  type AssetCategory,
  type AssetListItem,
  type AssetStatus,
} from "../lib/assetsApi";

type AssetStatusFilter = "ALL" | AssetStatus;

const assetStatusFilters: AssetStatusFilter[] = [
  "ALL",
  "AVAILABLE",
  "IN_USE",
  "UNDER_MAINTENANCE",
  "RETIRED",
  "LOST",
];

function getAssetStatusBadgeClass(status: AssetStatus) {
  return `badge badge-status badge-status-${status.toLowerCase().replace(/_/g, "-")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatLocation(asset: AssetListItem) {
  if (!asset.location) {
    return "No location";
  }

  const parts = [
    asset.location.name,
    asset.location.building,
    asset.location.floor ? `Floor ${asset.location.floor}` : null,
    asset.location.room ? `Room ${asset.location.room}` : null,
  ].filter(Boolean);

  return parts.join(" - ");
}

function formatBrandModel(asset: AssetListItem) {
  const parts = [asset.brand, asset.model].filter(Boolean);

  return parts.length > 0 ? parts.join(" / ") : "Not provided";
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<AssetListItem[]>([]);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [pageMessage, setPageMessage] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AssetStatusFilter>("ALL");

  const loadAssets = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getAssets();

      setAssets(data);
      setErrorMessage("");
    } catch {
      setErrorMessage("Unable to load assets. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [assetData, categoryData] = await Promise.all([
          getAssets(),
          getAssetCategories(),
        ]);

        if (isMounted) {
          setAssets(assetData);
          setCategories(categoryData);
          setCategoryId(categoryData[0]?.id ?? "");
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load assets. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingCategories(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedAssetCode = assetCode.trim();
    const trimmedName = name.trim();
    const selectedCategory = categories.find((category) => category.id === categoryId);

    if (!trimmedAssetCode || !trimmedName || !selectedCategory) {
      setFormMessage("Please enter an asset code, name, and category.");
      return;
    }

    if (trimmedAssetCode.length < 2) {
      setFormMessage("Asset code must be at least 2 characters long.");
      return;
    }

    if (trimmedName.length < 2) {
      setFormMessage("Asset name must be at least 2 characters long.");
      return;
    }

    setIsCreating(true);
    setFormMessage("");

    try {
      const response = await createAsset({
        assetCode: trimmedAssetCode,
        name: trimmedName,
        categoryId: selectedCategory.id,
        description,
        brand,
        model,
        serialNumber,
        notes,
      });

      setFormMessage(response.message || "Asset created successfully.");
      setPageMessage(response.message || "Asset created successfully.");
      setAssetCode("");
      setName("");
      setCategoryId(categories[0]?.id ?? "");
      setDescription("");
      setBrand("");
      setModel("");
      setSerialNumber("");
      setNotes("");
      await loadAssets();
      setIsCreateModalOpen(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setFormMessage(
        axiosError.response?.data?.message ||
          "Unable to create asset. Please check the form and try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  const filteredAssets = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return assets.filter((asset) => {
      const matchesStatus =
        statusFilter === "ALL" || asset.status === statusFilter;

      const searchableText = [
        asset.name,
        asset.assetCode,
        asset.brand,
        asset.model,
        asset.serialNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [assets, searchTerm, statusFilter]);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">Asset management</p>
          <h1>Assets</h1>
          <p>Review campus assets visible to your current role.</p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setFormMessage("");
            setPageMessage("");
            setIsCreateModalOpen(true);
          }}
        >
          Create asset
        </button>
      </div>

      {pageMessage ? <p className="form-message">{pageMessage}</p> : null}

      <Modal
        title="Create asset"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        footer={
          <>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              type="submit"
              form="create-asset-form"
              disabled={isCreating || isLoadingCategories}
            >
              {isCreating ? "Creating..." : "Create asset"}
            </button>
          </>
        }
      >
        <form
          id="create-asset-form"
          className="modal-form"
          onSubmit={handleCreateAsset}
        >
          <div className="form-grid">
            <label className="form-field" htmlFor="asset-code">
              <span>Asset code</span>
              <input
                id="asset-code"
                value={assetCode}
                onChange={(event) => setAssetCode(event.target.value)}
                placeholder="ASSET-001"
              />
            </label>

            <label className="form-field" htmlFor="asset-name">
              <span>Name</span>
              <input
                id="asset-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Classroom projector"
              />
            </label>
          </div>

          <label className="form-field" htmlFor="asset-category">
            <span>Category</span>
            <select
              id="asset-category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              disabled={isLoadingCategories}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field" htmlFor="asset-description">
            <span>Description</span>
            <textarea
              id="asset-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional asset description"
              rows={3}
            />
          </label>

          <div className="form-grid">
            <label className="form-field" htmlFor="asset-brand">
              <span>Brand</span>
              <input
                id="asset-brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                placeholder="Optional brand"
              />
            </label>

            <label className="form-field" htmlFor="asset-model">
              <span>Model</span>
              <input
                id="asset-model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="Optional model"
              />
            </label>
          </div>

          <label className="form-field" htmlFor="asset-serial-number">
            <span>Serial number</span>
            <input
              id="asset-serial-number"
              value={serialNumber}
              onChange={(event) => setSerialNumber(event.target.value)}
              placeholder="Optional serial number"
            />
          </label>

          <label className="form-field" htmlFor="asset-notes">
            <span>Notes</span>
            <textarea
              id="asset-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional asset notes"
              rows={3}
            />
          </label>

          {formMessage ? <p className="form-message">{formMessage}</p> : null}
        </form>
      </Modal>

      {isLoading ? <p className="state-message">Loading assets...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && assets.length > 0 ? (
        <section className="filter-panel" aria-label="Asset filters">
          <label className="form-field" htmlFor="asset-search">
            <span>Search assets</span>
            <input
              id="asset-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, code, brand, model, or serial number"
            />
          </label>

          <label className="form-field" htmlFor="asset-status-filter">
            <span>Status</span>
            <select
              id="asset-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as AssetStatusFilter)
              }
            >
              {assetStatusFilters.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </section>
      ) : null}

      {!isLoading && !errorMessage && assets.length === 0 ? (
        <p className="state-message">No assets found.</p>
      ) : null}

      {!isLoading && !errorMessage && assets.length > 0 && filteredAssets.length === 0 ? (
        <p className="state-message">No assets match the current filters.</p>
      ) : null}

      {!isLoading && !errorMessage && filteredAssets.length > 0 ? (
        <div className="ticket-list resource-list asset-resource-list">
          <div className="resource-table-header asset-table-header" aria-hidden="true">
            <span>Asset</span>
            <span>Code</span>
            <span>Category</span>
            <span>Status</span>
            <span>Brand / model</span>
            <span>Location</span>
            <span>Created</span>
            <span>Action</span>
          </div>

          {filteredAssets.map((asset) => (
            <article className="ticket-card" key={asset.id}>
              <div className="resource-primary">
                <h2>{asset.name}</h2>
                <p>{asset.department?.name ?? "No department"}</p>
              </div>

              <div className="resource-cell" data-label="Code">
                {asset.assetCode || "No asset code"}
              </div>

              <div className="resource-cell" data-label="Category">
                {asset.category?.name ?? "Uncategorized"}
              </div>

              <div className="resource-cell" data-label="Status">
                <span className={getAssetStatusBadgeClass(asset.status)}>
                  {asset.status}
                </span>
              </div>

              <div className="resource-cell" data-label="Brand / model">
                {formatBrandModel(asset)}
              </div>

              <div className="resource-cell" data-label="Location">
                {formatLocation(asset)}
              </div>

              <div className="resource-cell resource-date" data-label="Created">
                {formatDate(asset.createdAt)}
              </div>

              <div className="resource-action">
                <Link className="outline-button compact-button" to={`/assets/${asset.id}`}>
                  View detail
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
