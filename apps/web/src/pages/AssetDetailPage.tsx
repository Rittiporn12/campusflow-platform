import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAssetById, type AssetDetail } from "../lib/assetsApi";

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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
              <span>{asset.status}</span>
              <span>{asset.category?.name ?? "Uncategorized"}</span>
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
