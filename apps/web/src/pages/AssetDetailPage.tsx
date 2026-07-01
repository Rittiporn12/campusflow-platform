import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import {
  getAssetById,
  getAssetCategories,
  updateAsset,
  updateAssetStatus,
  type AssetCategory,
  type AssetDetail,
  type AssetStatus,
} from "../lib/assetsApi";

const assetStatuses: AssetStatus[] = [
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

function formatOptional(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : "Not provided";
}

function formatLocation(asset: AssetDetail) {
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

export default function AssetDetailPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isUpdatingAsset, setIsUpdatingAsset] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [editName, setEditName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editSerialNumber, setEditSerialNumber] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<AssetStatus>("AVAILABLE");
  const [statusNote, setStatusNote] = useState("");

  const loadAsset = useCallback(async () => {
    if (!id) {
      setErrorMessage("Asset ID is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await getAssetById(id);

      setAsset(data);
      if (data) {
        setEditName(data.name);
        setEditCategoryId(data.categoryId);
        setEditDescription(data.description ?? "");
        setEditBrand(data.brand ?? "");
        setEditModel(data.model ?? "");
        setEditSerialNumber(data.serialNumber ?? "");
        setEditNotes(data.notes ?? "");
        setSelectedStatus(data.status);
      }
      setErrorMessage("");
    } catch {
      setErrorMessage(
        "Unable to load this asset. It may not exist or you may not have access.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAsset();
  }, [loadAsset]);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const data = await getAssetCategories();

        if (isMounted) {
          setCategories(data);
        }
      } catch {
        if (isMounted) {
          setEditMessage("Unable to load asset categories.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAssetUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = editName.trim();
    const selectedCategory = categories.find(
      (category) => category.id === editCategoryId,
    );

    if (!id || !trimmedName || !selectedCategory) {
      setEditMessage("Please enter a name and category.");
      return;
    }

    if (trimmedName.length < 2) {
      setEditMessage("Asset name must be at least 2 characters long.");
      return;
    }

    setIsUpdatingAsset(true);
    setEditMessage("");

    try {
      const response = await updateAsset(id, {
        name: trimmedName,
        categoryId: selectedCategory.id,
        description: editDescription,
        brand: editBrand,
        model: editModel,
        serialNumber: editSerialNumber,
        notes: editNotes,
      });

      setEditMessage(response.message || "Asset updated successfully.");
      await loadAsset();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 403) {
        setEditMessage("You do not have permission to update this asset.");
      } else {
        setEditMessage(
          axiosError.response?.data?.message ||
            "Unable to update asset. Please check the form and try again.",
        );
      }
    } finally {
      setIsUpdatingAsset(false);
    }
  }

  async function handleStatusUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id || !selectedStatus) {
      setStatusMessage("Please select a status.");
      return;
    }

    setIsUpdatingStatus(true);
    setStatusMessage("");

    try {
      const response = await updateAssetStatus(id, {
        status: selectedStatus,
        note: statusNote,
      });

      setStatusMessage(response.message || "Asset status updated successfully.");
      setStatusNote("");
      await loadAsset();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 403) {
        setStatusMessage("You do not have permission to update this asset status.");
      } else {
        setStatusMessage(
          axiosError.response?.data?.message ||
            "Unable to update asset status. Please try again.",
        );
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  return (
    <section className="page-section">
      <Link className="secondary-link" to="/assets">
        Back to assets
      </Link>

      <p className="eyebrow">Asset detail</p>
      <h1>{asset ? asset.name : `Asset ${id ?? ""}`}</h1>

      {isLoading ? <p className="state-message">Loading asset...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && !asset ? (
        <p className="state-message">Asset is unavailable.</p>
      ) : null}

      {!isLoading && !errorMessage && asset ? (
        <div className="detail-stack">
          <article className="detail-panel">
            <div className="ticket-meta">
              <span className={getAssetStatusBadgeClass(asset.status)}>
                {asset.status}
              </span>
              <span className="badge badge-category">
                {asset.category?.name ?? "Uncategorized"}
              </span>
              <span>{asset.assetCode || "No asset code"}</span>
            </div>

            {asset.description ? <p>{asset.description}</p> : null}
          </article>

          <article className="detail-panel">
            <h2>Asset information</h2>
            <dl className="detail-grid">
              <div>
                <dt>Asset code</dt>
                <dd>{formatOptional(asset.assetCode)}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{asset.category?.name ?? "Uncategorized"}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{formatOptional(asset.brand)}</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>{formatOptional(asset.model)}</dd>
              </div>
              <div>
                <dt>Serial number</dt>
                <dd>{formatOptional(asset.serialNumber)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{asset.status}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-panel">
            <h2>Update asset</h2>
            <form className="status-update-form" onSubmit={handleAssetUpdate}>
              <div className="form-grid">
                <label className="form-field" htmlFor="edit-asset-name">
                  <span>Name</span>
                  <input
                    id="edit-asset-name"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                </label>

                <label className="form-field" htmlFor="edit-asset-category">
                  <span>Category</span>
                  <select
                    id="edit-asset-category"
                    value={editCategoryId}
                    onChange={(event) => setEditCategoryId(event.target.value)}
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
              </div>

              <label className="form-field" htmlFor="edit-asset-description">
                <span>Description</span>
                <textarea
                  id="edit-asset-description"
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  rows={3}
                />
              </label>

              <div className="form-grid">
                <label className="form-field" htmlFor="edit-asset-brand">
                  <span>Brand</span>
                  <input
                    id="edit-asset-brand"
                    value={editBrand}
                    onChange={(event) => setEditBrand(event.target.value)}
                  />
                </label>

                <label className="form-field" htmlFor="edit-asset-model">
                  <span>Model</span>
                  <input
                    id="edit-asset-model"
                    value={editModel}
                    onChange={(event) => setEditModel(event.target.value)}
                  />
                </label>
              </div>

              <label className="form-field" htmlFor="edit-asset-serial-number">
                <span>Serial number</span>
                <input
                  id="edit-asset-serial-number"
                  value={editSerialNumber}
                  onChange={(event) => setEditSerialNumber(event.target.value)}
                />
              </label>

              <label className="form-field" htmlFor="edit-asset-notes">
                <span>Notes</span>
                <textarea
                  id="edit-asset-notes"
                  value={editNotes}
                  onChange={(event) => setEditNotes(event.target.value)}
                  rows={3}
                />
              </label>

              <button
                className="primary-button"
                type="submit"
                disabled={isUpdatingAsset || isLoadingCategories}
              >
                {isUpdatingAsset ? "Saving..." : "Save asset"}
              </button>
            </form>

            {editMessage ? <p className="form-message">{editMessage}</p> : null}
          </article>

          <article className="detail-panel">
            <h2>Update status</h2>
            <form className="status-update-form" onSubmit={handleStatusUpdate}>
              <label className="form-field" htmlFor="asset-status">
                <span>Current status: {asset.status}</span>
                <select
                  id="asset-status"
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value as AssetStatus)
                  }
                >
                  {assetStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field" htmlFor="asset-status-note">
                <span>Note</span>
                <textarea
                  id="asset-status-note"
                  value={statusNote}
                  onChange={(event) => setStatusNote(event.target.value)}
                  placeholder="Optional status change note"
                  rows={3}
                />
              </label>

              <button
                className="primary-button"
                type="submit"
                disabled={isUpdatingStatus}
              >
                {isUpdatingStatus ? "Updating..." : "Update status"}
              </button>
            </form>

            {statusMessage ? <p className="form-message">{statusMessage}</p> : null}
          </article>

          <article className="detail-panel">
            <h2>Campus placement</h2>
            <dl className="detail-grid">
              <div>
                <dt>Location</dt>
                <dd>{formatLocation(asset)}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{asset.department?.name ?? "No department"}</dd>
              </div>
              <div>
                <dt>Organization</dt>
                <dd>{asset.organization?.name ?? "No organization"}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(asset.createdAt)}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(asset.updatedAt)}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-panel">
            <h2>Notes</h2>
            <p>{formatOptional(asset.notes)}</p>
          </article>

          <article className="detail-panel">
            <h2>Status history</h2>
            {asset.statusLogs && asset.statusLogs.length > 0 ? (
              <div className="activity-list">
                {asset.statusLogs.map((log) => (
                  <div className="activity-item" key={log.id}>
                    <strong>
                      {log.fromStatus ?? "New"} to {log.toStatus}
                    </strong>
                    <span>
                      {log.changedBy.name} - {formatDate(log.createdAt)}
                    </span>
                    {log.note ? <p>{log.note}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p>No status history yet.</p>
            )}
          </article>
        </div>
      ) : null}
    </section>
  );
}
