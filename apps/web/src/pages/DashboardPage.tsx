import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAssets,
  type AssetListItem,
} from "../lib/assetsApi";
import {
  getTickets,
  type TicketListItem,
  type TicketStatus,
} from "../lib/ticketsApi";
import {
  formatAssetStatus,
  formatTicketPriority,
  formatTicketStatus,
} from "../lib/displayLabels";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function isOpenStatus(status: TicketStatus) {
  return status === "PENDING" || status === "ASSIGNED";
}

function isResolvedStatus(status: TicketStatus) {
  return status === "COMPLETED" || status === "CANCELLED";
}

function getTicketStatusBadgeClass(status: TicketStatus) {
  return `badge badge-ticket-status badge-ticket-status-${status.toLowerCase().replace(/_/g, "-")}`;
}

function getTicketPriorityBadgeClass(priority: TicketListItem["priority"]) {
  return `badge badge-priority badge-priority-${priority.toLowerCase()}`;
}

function getAssetStatusBadgeClass(status: AssetListItem["status"]) {
  return `badge badge-status badge-status-${status.toLowerCase().replace(/_/g, "-")}`;
}

export default function DashboardPage() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [assets, setAssets] = useState<AssetListItem[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const [ticketData, assetData] = await Promise.all([
          getTickets(),
          getAssets(),
        ]);

        if (isMounted) {
          setTickets(ticketData.items);
          setTotalTickets(ticketData.meta.total);
          setAssets(assetData);
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load dashboard overview. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    return {
      open: tickets.filter((ticket) => isOpenStatus(ticket.status)).length,
      inProgress: tickets.filter((ticket) => ticket.status === "IN_PROGRESS").length,
      resolved: tickets.filter((ticket) => isResolvedStatus(ticket.status)).length,
    };
  }, [tickets]);

  const assetSummary = useMemo(() => {
    return {
      total: assets.length,
      available: assets.filter((asset) => asset.status === "AVAILABLE").length,
      inUse: assets.filter((asset) => asset.status === "IN_USE").length,
      underMaintenance: assets.filter(
        (asset) => asset.status === "UNDER_MAINTENANCE",
      ).length,
    };
  }, [assets]);

  const recentTickets = tickets.slice(0, 5);
  const recentAssets = assets.slice(0, 5);

  return (
    <section className="page-section">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
          <p>
            Monitor visible campus repair work and asset readiness from one
            operations view.
          </p>
        </div>

        <div className="dashboard-actions" aria-label="Dashboard quick actions">
          <Link className="primary-button" to="/tickets">
            Manage tickets
          </Link>
          <Link className="outline-button" to="/assets">
            Manage assets
          </Link>
        </div>
      </div>

      {isLoading ? <p className="state-message">Loading dashboard...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <div className="dashboard-section dashboard-overview-card">
            <div className="section-heading">
              <h2>Ticket overview</h2>
              <Link className="ghost-button compact-button" to="/tickets">
                View tickets
              </Link>
            </div>

            <div className="summary-grid">
              <article className="summary-card summary-card-primary">
                <span>Total tickets</span>
                <strong>{totalTickets}</strong>
                <small>Visible repair requests</small>
              </article>

              <article className="summary-card">
                <span>Open tickets</span>
                <strong>{summary.open}</strong>
                <small>Pending or assigned</small>
              </article>

              <article className="summary-card">
                <span>In progress</span>
                <strong>{summary.inProgress}</strong>
                <small>Active repair work</small>
              </article>

              <article className="summary-card">
                <span>Resolved or closed</span>
                <strong>{summary.resolved}</strong>
                <small>Completed outcomes</small>
              </article>
            </div>
          </div>

          <div className="dashboard-section dashboard-overview-card">
            <div className="section-heading">
              <h2>Asset overview</h2>
              <Link className="ghost-button compact-button" to="/assets">
                View assets
              </Link>
            </div>

            <div className="summary-grid">
              <article className="summary-card summary-card-primary">
                <span>Total assets</span>
                <strong>{assetSummary.total}</strong>
                <small>Tracked campus resources</small>
              </article>

              <article className="summary-card">
                <span>Available</span>
                <strong>{assetSummary.available}</strong>
                <small>Ready for use</small>
              </article>

              <article className="summary-card">
                <span>In use</span>
                <strong>{assetSummary.inUse}</strong>
                <small>Currently assigned</small>
              </article>

              <article className="summary-card">
                <span>Under maintenance</span>
                <strong>{assetSummary.underMaintenance}</strong>
                <small>Needs attention</small>
              </article>
            </div>
          </div>

          <div className="dashboard-content-grid">
            <article className="detail-panel dashboard-panel">
              <div className="section-heading">
                <h2>Recent tickets</h2>
                <Link className="ghost-button compact-button" to="/tickets">
                  Manage tickets
                </Link>
              </div>

              {recentTickets.length > 0 ? (
                <div className="activity-list">
                  {recentTickets.map((ticket) => (
                    <div className="activity-item dashboard-ticket" key={ticket.id}>
                      <div>
                        <strong className="truncate" title={ticket.title}>
                          {ticket.title}
                        </strong>
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>

                      <div className="ticket-meta">
                        <span className={getTicketStatusBadgeClass(ticket.status)}>
                          {formatTicketStatus(ticket.status)}
                        </span>
                        <span className={getTicketPriorityBadgeClass(ticket.priority)}>
                          {formatTicketPriority(ticket.priority)}
                        </span>
                      </div>

                      <Link className="outline-button compact-button" to={`/tickets/${ticket.id}`}>
                        View detail
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No ticket activity yet. New repair requests will appear here.</p>
              )}
            </article>

            <article className="detail-panel dashboard-panel">
              <div className="section-heading">
                <h2>Recent assets</h2>
                <Link className="ghost-button compact-button" to="/assets">
                  Manage assets
                </Link>
              </div>

              {recentAssets.length > 0 ? (
                <div className="activity-list">
                  {recentAssets.map((asset) => (
                    <div className="activity-item dashboard-ticket" key={asset.id}>
                      <div>
                        <strong className="truncate" title={asset.name}>
                          {asset.name}
                        </strong>
                        <span>{asset.assetCode || "No asset code"}</span>
                      </div>

                      <div className="ticket-meta">
                        <span className={getAssetStatusBadgeClass(asset.status)}>
                          {formatAssetStatus(asset.status)}
                        </span>
                        <span className="badge badge-category">
                          {asset.category?.name ?? "Uncategorized"}
                        </span>
                      </div>

                      <Link className="outline-button compact-button" to={`/assets/${asset.id}`}>
                        View detail
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assets found yet. Created asset records will appear here.</p>
              )}
            </article>
          </div>
        </>
      ) : null}
    </section>
  );
}
