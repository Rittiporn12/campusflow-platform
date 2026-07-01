import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAssets, type AssetListItem } from "../lib/assetsApi";

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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAssets() {
      try {
        const data = await getAssets();

        if (isMounted) {
          setAssets(data);
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load assets. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page-section">
      <p className="eyebrow">Asset management</p>
      <h1>Assets</h1>
      <p>Review campus assets visible to your current role.</p>

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
