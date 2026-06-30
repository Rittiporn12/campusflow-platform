import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets, type TicketListItem } from "../lib/ticketsApi";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatLocation(ticket: TicketListItem) {
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

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTickets() {
      try {
        const data = await getTickets();

        if (isMounted) {
          setTickets(data.items);
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load tickets. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page-section">
      <p className="eyebrow">Repair workflow</p>
      <h1>Tickets</h1>
      <p>Review repair requests visible to your current role.</p>

      {isLoading ? <p className="state-message">Loading tickets...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && tickets.length === 0 ? (
        <p className="state-message">No tickets found.</p>
      ) : null}

      {!isLoading && !errorMessage && tickets.length > 0 ? (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article className="ticket-card" key={ticket.id}>
              <div>
                <h2>{ticket.title}</h2>
                <p>{formatLocation(ticket)}</p>
              </div>

              <div className="ticket-meta">
                <span>{ticket.status}</span>
                <span>{ticket.priority}</span>
                <span>{formatDate(ticket.createdAt)}</span>
              </div>

              <Link className="secondary-link" to={`/tickets/${ticket.id}`}>
                View detail
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
