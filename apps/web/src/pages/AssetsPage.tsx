import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import {
  createAsset,
  getAssetCategories,
  getAssets,
  type AssetCategory,
  type AssetListItem,
} from "../lib/assetsApi";

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

export default function AssetsPage() {
  const [assets, setAssets] = useState<AssetListItem[]>([]);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [notes, setNotes] = useState("");

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
      setAssetCode("");
      setName("");
      setCategoryId(categories[0]?.id ?? "");
      setDescription("");
      setBrand("");
      setModel("");
      setSerialNumber("");
      setNotes("");
      await loadAssets();
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

  return (
    <section className="page-section">
      <p className="eyebrow">Asset management</p>
      <h1>Assets</h1>
      <p>Review campus assets visible to your current role.</p>

      <form className="create-ticket-form" onSubmit={handleCreateAsset}>
        <h2>Create asset</h2>

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

        <button
          className="primary-button"
          type="submit"
          disabled={isCreating || isLoadingCategories}
        >
          {isCreating ? "Creating..." : "Create asset"}
        </button>

        {formMessage ? <p className="form-message">{formMessage}</p> : null}
      </form>

      {isLoading ? <p className="state-message">Loading assets...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && assets.length === 0 ? (
        <p className="state-message">No assets found.</p>
      ) : null}

      {!isLoading && !errorMessage && assets.length > 0 ? (
        <div className="ticket-list">
          {assets.map((asset) => (
            <article className="ticket-card" key={asset.id}>
              <div>
                <h2>{asset.name}</h2>
                <p>{asset.assetCode || "No asset code"}</p>
              </div>

              <div className="ticket-meta">
                <span>{asset.status}</span>
                <span>{asset.category?.name ?? "Uncategorized"}</span>
                <span>{asset.department?.name ?? "No department"}</span>
              </div>

              <dl className="asset-summary-grid">
                <div>
                  <dt>Location</dt>
                  <dd>{formatLocation(asset)}</dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{formatDate(asset.createdAt)}</dd>
                </div>
              </dl>

              <Link className="secondary-link" to={`/assets/${asset.id}`}>
                View detail
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
