import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import {
  createTicket,
  getTicketCategories,
  getTickets,
  type TicketCategory,
  type TicketListItem,
  type TicketPriority,
} from "../lib/ticketsApi";

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

function getTicketStatusBadgeClass(status: TicketListItem["status"]) {
  return `badge badge-ticket-status badge-ticket-status-${status.toLowerCase().replace(/_/g, "-")}`;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");

  const loadTickets = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getTickets();

      setTickets(data.items);
      setErrorMessage("");
    } catch {
      setErrorMessage("Unable to load tickets. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [ticketData, categoryData] = await Promise.all([
          getTickets(),
          getTicketCategories(),
        ]);

        if (isMounted) {
          setTickets(ticketData.items);
          setCategories(categoryData);
          setCategoryId(categoryData[0]?.id ?? "");
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load tickets. Please try again later.");
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

  async function handleCreateTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const selectedCategory = categories.find((category) => category.id === categoryId);

    if (!trimmedTitle || !trimmedDescription || !selectedCategory) {
      setFormMessage("Please enter a title, description, and category.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setFormMessage("Title must be at least 3 characters long.");
      return;
    }

    if (trimmedDescription.length < 5) {
      setFormMessage("Description must be at least 5 characters long.");
      return;
    }

    setIsCreating(true);
    setFormMessage("");

    try {
      const response = await createTicket({
        title: trimmedTitle,
        description: trimmedDescription,
        categoryId: selectedCategory.id,
        priority,
      });

      setFormMessage(response.message || "Ticket created successfully.");
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setCategoryId(categories[0]?.id ?? "");
      await loadTickets();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setFormMessage(
        axiosError.response?.data?.message ||
          "Unable to create ticket. Please check the form and try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="page-section">
      <p className="eyebrow">Repair workflow</p>
      <h1>Tickets</h1>
      <p>Review repair requests visible to your current role.</p>

      <form className="create-ticket-form" onSubmit={handleCreateTicket}>
        <h2>Create ticket</h2>

        <label className="form-field" htmlFor="ticket-title">
          <span>Title</span>
          <input
            id="ticket-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Briefly describe the issue"
          />
        </label>

        <label className="form-field" htmlFor="ticket-description">
          <span>Description</span>
          <textarea
            id="ticket-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add details about the problem"
            rows={4}
          />
        </label>

        <div className="form-grid">
          <label className="form-field" htmlFor="ticket-category">
            <span>Category</span>
            <select
              id="ticket-category"
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

          <label className="form-field" htmlFor="ticket-priority">
            <span>Priority</span>
            <select
              id="ticket-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value as TicketPriority)}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </label>
        </div>

        <button
          className="primary-button"
          type="submit"
          disabled={isCreating || isLoadingCategories}
        >
          {isCreating ? "Creating..." : "Create ticket"}
        </button>

        {formMessage ? <p className="form-message">{formMessage}</p> : null}
      </form>

      {isLoading ? <p className="state-message">Loading tickets...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && tickets.length === 0 ? (
        <p className="state-message">
          No tickets found. Create a ticket above to start tracking a repair
          request.
        </p>
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
                <span className={getTicketStatusBadgeClass(ticket.status)}>
                  {ticket.status}
                </span>
                <span className="badge badge-priority">{ticket.priority}</span>
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
