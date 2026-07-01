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

  return (
    <section className="page-section">
      <p className="eyebrow">Overview</p>
      <h1>Dashboard</h1>
      <p>Welcome back. Here is a quick overview of visible ticket activity.</p>

      {isLoading ? <p className="state-message">Loading dashboard...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <div className="summary-grid">
            <article className="summary-card">
              <span>Total tickets</span>
              <strong>{totalTickets}</strong>
            </article>

            <article className="summary-card">
              <span>Open tickets</span>
              <strong>{summary.open}</strong>
            </article>

            <article className="summary-card">
              <span>In progress</span>
              <strong>{summary.inProgress}</strong>
            </article>

            <article className="summary-card">
              <span>Resolved or closed</span>
              <strong>{summary.resolved}</strong>
            </article>

            <article className="summary-card">
              <span>Total assets</span>
              <strong>{assetSummary.total}</strong>
            </article>

            <article className="summary-card">
              <span>Available</span>
              <strong>{assetSummary.available}</strong>
            </article>

            <article className="summary-card">
              <span>In use</span>
              <strong>{assetSummary.inUse}</strong>
            </article>

            <article className="summary-card">
              <span>Under maintenance</span>
              <strong>{assetSummary.underMaintenance}</strong>
            </article>
          </div>

          <article className="detail-panel dashboard-panel">
            <h2>Recent tickets</h2>

            {recentTickets.length > 0 ? (
              <div className="activity-list">
                {recentTickets.map((ticket) => (
                  <div className="activity-item dashboard-ticket" key={ticket.id}>
                    <div>
                      <strong>{ticket.title}</strong>
                      <span>{formatDate(ticket.createdAt)}</span>
                    </div>

                    <div className="ticket-meta">
                      <span>{ticket.status}</span>
                      <span>{ticket.priority}</span>
                    </div>

                    <Link className="secondary-link" to={`/tickets/${ticket.id}`}>
                      View detail
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No tickets found yet.</p>
            )}
          </article>
        </>
      ) : null}
    </section>
  );
}
