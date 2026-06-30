import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTicketById, type TicketDetail } from "../lib/ticketsApi";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatLocation(ticket: TicketDetail) {
  if (!ticket.location) {
    return "No location";
  }

  const parts = [
    ticket.location.name,
    ticket.location.building,
    ticket.location.floor ? `Floor ${ticket.location.floor}` : null,
    ticket.location.room ? `Room ${ticket.location.room}` : null,
  ].filter(Boolean);

  return parts.join(" - ");
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTicket() {
      if (!id) {
        setErrorMessage("Ticket ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getTicketById(id);

        if (isMounted) {
          setTicket(data);
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load this ticket. It may not exist or you may not have access.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTicket();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="page-section">
      <Link className="secondary-link" to="/tickets">
        Back to tickets
      </Link>

      <p className="eyebrow">Ticket detail</p>
      <h1>{ticket ? ticket.title : `Ticket ${id ?? ""}`}</h1>

      {isLoading ? <p className="state-message">Loading ticket...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && !ticket ? (
        <p className="state-message">Ticket is unavailable.</p>
      ) : null}

      {!isLoading && !errorMessage && ticket ? (
        <div className="detail-stack">
          <article className="detail-panel">
            <div className="ticket-meta">
              <span>{ticket.status}</span>
              <span>{ticket.priority}</span>
              <span>{ticket.category.name}</span>
            </div>

            <p>{ticket.description}</p>
          </article>

          <article className="detail-panel">
            <h2>Ticket information</h2>
            <dl className="detail-grid">
              <div>
                <dt>Location</dt>
                <dd>{formatLocation(ticket)}</dd>
              </div>
              <div>
                <dt>Requester</dt>
                <dd>{ticket.createdBy.name}</dd>
              </div>
              <div>
                <dt>Assigned technician</dt>
                <dd>{ticket.assignedTo?.name ?? "Unassigned"}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(ticket.createdAt)}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(ticket.updatedAt)}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-panel">
            <h2>Comments</h2>
            {ticket.comments.length > 0 ? (
              <div className="activity-list">
                {ticket.comments.map((comment) => (
                  <div className="activity-item" key={comment.id}>
                    <strong>{comment.user.name}</strong>
                    <span>{formatDate(comment.createdAt)}</span>
                    <p>{comment.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments yet.</p>
            )}
          </article>

          <article className="detail-panel">
            <h2>Status history</h2>
            {ticket.statusLogs.length > 0 ? (
              <div className="activity-list">
                {ticket.statusLogs.map((log) => (
                  <div className="activity-item" key={log.id}>
                    <strong>
                      {log.oldStatus ?? "New"} to {log.newStatus}
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
