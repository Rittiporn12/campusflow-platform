import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import PaginationControls from "../components/PaginationControls";
import {
  createTicket,
  getTicketCategories,
  getTickets,
  type TicketCategory,
  type TicketListItem,
  type TicketPriority,
} from "../lib/ticketsApi";
import { formatTicketPriority, formatTicketStatus } from "../lib/displayLabels";

const PAGE_SIZE = 10;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getSortableDate(ticket: TicketListItem & { updatedAt?: string }) {
  return new Date(ticket.createdAt || ticket.updatedAt || 0).getTime();
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

function getTicketPriorityBadgeClass(priority: TicketPriority) {
  return `badge badge-priority badge-priority-${priority.toLowerCase()}`;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [pageMessage, setPageMessage] = useState("");
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
      setPageMessage(response.message || "Ticket created successfully.");
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setCategoryId(categories[0]?.id ?? "");
      await loadTickets();
      setCurrentPage(1);
      setIsCreateModalOpen(false);
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

  const sortedTickets = useMemo(() => {
    return [...tickets].sort((firstTicket, secondTicket) => {
      return getSortableDate(secondTicket) - getSortableDate(firstTicket);
    });
  }, [tickets]);

  const totalPages = Math.max(1, Math.ceil(sortedTickets.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedTickets = sortedTickets.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">Repair workflow</p>
          <h1>Tickets</h1>
          <p>Review repair requests visible to your current role.</p>
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
          Create ticket
        </button>
      </div>

      {pageMessage ? <p className="form-message">{pageMessage}</p> : null}

      <Modal
        title="Create ticket"
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
              form="create-ticket-form"
              disabled={isCreating || isLoadingCategories}
            >
              {isCreating ? "Creating..." : "Create ticket"}
            </button>
          </>
        }
      >
        <form
          id="create-ticket-form"
          className="modal-form"
          onSubmit={handleCreateTicket}
        >
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
                onChange={(event) =>
                  setPriority(event.target.value as TicketPriority)
                }
              >
                <option value="LOW">{formatTicketPriority("LOW")}</option>
                <option value="MEDIUM">{formatTicketPriority("MEDIUM")}</option>
                <option value="HIGH">{formatTicketPriority("HIGH")}</option>
                <option value="CRITICAL">{formatTicketPriority("CRITICAL")}</option>
              </select>
            </label>
          </div>

          {formMessage ? <p className="form-message">{formMessage}</p> : null}
        </form>
      </Modal>

      {isLoading ? <p className="state-message">Loading tickets...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && tickets.length === 0 ? (
        <p className="state-message">
          No tickets found. Create a ticket to start tracking a repair
          request.
        </p>
      ) : null}

      {!isLoading && !errorMessage && sortedTickets.length > 0 ? (
        <div className="ticket-list resource-list ticket-resource-list">
          <div className="resource-table-header ticket-table-header" aria-hidden="true">
            <span>Ticket</span>
            <span>Location</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Created</span>
            <span>Action</span>
          </div>

          {paginatedTickets.map((ticket) => (
            <article className="ticket-card" key={ticket.id}>
              <div className="resource-primary">
                <h2 className="truncate" title={ticket.title}>
                  {ticket.title}
                </h2>
                <p>Repair request</p>
              </div>

              <div className="resource-cell" data-label="Location">
                {formatLocation(ticket)}
              </div>

              <div className="resource-cell" data-label="Status">
                <span className={getTicketStatusBadgeClass(ticket.status)}>
                  {formatTicketStatus(ticket.status)}
                </span>
              </div>

              <div className="resource-cell" data-label="Priority">
                <span className={getTicketPriorityBadgeClass(ticket.priority)}>
                  {formatTicketPriority(ticket.priority)}
                </span>
              </div>

              <div className="resource-cell resource-date" data-label="Created">
                {formatDate(ticket.createdAt)}
              </div>

              <div className="resource-action">
                <Link className="outline-button compact-button" to={`/tickets/${ticket.id}`}>
                  View detail
                </Link>
              </div>
            </article>
          ))}

          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={sortedTickets.length}
            pageSize={PAGE_SIZE}
            itemLabel="tickets"
            onPageChange={setCurrentPage}
          />
        </div>
      ) : null}
    </section>
  );
}
