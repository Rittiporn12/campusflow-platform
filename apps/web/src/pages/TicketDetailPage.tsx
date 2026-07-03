import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import {
  addTicketComment,
  assignTicket,
  getTicketById,
  updateTicketStatus,
  type TicketDetail,
  type TicketStatus,
} from "../lib/ticketsApi";
import { formatTicketPriority, formatTicketStatus } from "../lib/displayLabels";

const ticketStatuses: TicketStatus[] = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "WAITING_PARTS",
  "COMPLETED",
  "CANCELLED",
];

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

function getTicketStatusBadgeClass(status: TicketStatus) {
  return `badge badge-ticket-status badge-ticket-status-${status.toLowerCase().replace(/_/g, "-")}`;
}

function getTicketPriorityBadgeClass(priority: TicketDetail["priority"]) {
  return `badge badge-priority badge-priority-${priority.toLowerCase()}`;
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAssigningTicket, setIsAssigningTicket] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [assignmentMessage, setAssignmentMessage] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>("PENDING");
  const [technicianId, setTechnicianId] = useState("");

  const loadTicket = useCallback(async () => {
    if (!id) {
      setErrorMessage("Ticket ID is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await getTicketById(id);

      setTicket(data);
      setSelectedStatus(data.status);
      setErrorMessage("");
    } catch {
      setErrorMessage(
        "Unable to load this ticket. It may not exist or you may not have access.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  async function handleStatusUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id || !selectedStatus) {
      setStatusMessage("Please select a status.");
      return;
    }

    setIsUpdatingStatus(true);
    setStatusMessage("");

    try {
      const response = await updateTicketStatus(id, {
        status: selectedStatus,
      });

      setStatusMessage(response.message || "Ticket status updated successfully.");
      await loadTicket();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 403) {
        setStatusMessage("You do not have permission to update this ticket status.");
      } else {
        setStatusMessage(
          axiosError.response?.data?.message ||
            "Unable to update ticket status. Please try again.",
        );
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleAssignTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTechnicianId = technicianId.trim();

    if (!id || !trimmedTechnicianId) {
      setAssignmentMessage("Please enter a technician reference.");
      return;
    }

    setIsAssigningTicket(true);
    setAssignmentMessage("");

    try {
      const response = await assignTicket(id, {
        technicianId: trimmedTechnicianId,
      });

      setAssignmentMessage(response.message || "Ticket assigned successfully.");
      setTechnicianId("");
      await loadTicket();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 403) {
        setAssignmentMessage("You do not have permission to assign this ticket.");
      } else {
        setAssignmentMessage(
          axiosError.response?.data?.message ||
            "Unable to assign ticket. Please check the technician reference and try again.",
        );
      }
    } finally {
      setIsAssigningTicket(false);
    }
  }

  async function handleAddComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedComment = commentText.trim();

    if (!id || !trimmedComment) {
      setCommentMessage("Please enter a comment.");
      return;
    }

    setIsAddingComment(true);
    setCommentMessage("");

    try {
      const response = await addTicketComment(id, {
        message: trimmedComment,
      });

      setCommentMessage(response.message || "Comment added successfully.");
      setCommentText("");
      await loadTicket();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 403) {
        setCommentMessage(
          "You do not have permission to add a comment to this ticket.",
        );
      } else {
        setCommentMessage(
          axiosError.response?.data?.message ||
            "Unable to add comment. Please try again.",
        );
      }
    } finally {
      setIsAddingComment(false);
    }
  }

  return (
    <section className="page-section">
      <div className="detail-page-header">
        <Link className="secondary-link" to="/tickets">
          Back to tickets
        </Link>

        <div>
          <p className="eyebrow">Ticket detail</p>
          <h1>{ticket ? ticket.title : `Ticket ${id ?? ""}`}</h1>
          {ticket ? (
            <p>
              Repair request opened by {ticket.createdBy.name} on{" "}
              {formatDate(ticket.createdAt)}.
            </p>
          ) : null}
        </div>
      </div>

      {isLoading ? <p className="state-message">Loading ticket...</p> : null}

      {!isLoading && errorMessage ? (
        <p className="state-message state-message-error">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && !ticket ? (
        <p className="state-message">Ticket is unavailable.</p>
      ) : null}

      {!isLoading && !errorMessage && ticket ? (
        <div className="detail-layout">
          <div className="detail-main">
            <article className="detail-panel detail-overview-card">
              <div className="detail-overview-header">
                <div>
                  <p className="eyebrow">Ticket overview</p>
                  <h2>{ticket.title}</h2>
                </div>

                <div className="ticket-meta">
                  <span className={getTicketStatusBadgeClass(ticket.status)}>
                    {formatTicketStatus(ticket.status)}
                  </span>
                  <span className={getTicketPriorityBadgeClass(ticket.priority)}>
                    {formatTicketPriority(ticket.priority)}
                  </span>
                </div>
              </div>

              <div className="detail-highlight-grid">
                <div>
                  <span>Category</span>
                  <strong>{ticket.category.name}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{formatLocation(ticket)}</strong>
                </div>
                <div>
                  <span>Requester</span>
                  <strong>{ticket.createdBy.name}</strong>
                </div>
                <div>
                  <span>Created</span>
                  <strong>{formatDate(ticket.createdAt)}</strong>
                </div>
              </div>
            </article>

            <article className="detail-panel">
              <div className="section-heading">
                <h2>Issue details</h2>
              </div>
              <p>{ticket.description}</p>

              <dl className="detail-grid">
                <div>
                  <dt>Assigned technician</dt>
                  <dd>{ticket.assignedTo?.name ?? "Unassigned"}</dd>
                </div>
                <div>
                  <dt>Updated</dt>
                  <dd>{formatDate(ticket.updatedAt)}</dd>
                </div>
              </dl>
            </article>

            <article className="detail-panel">
              <div className="section-heading">
                <h2>Comments</h2>
              </div>

              <form className="status-update-form comment-form" onSubmit={handleAddComment}>
                <label className="form-field" htmlFor="ticket-comment">
                  <span>Add comment</span>
                  <textarea
                    id="ticket-comment"
                    rows={4}
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write a ticket comment"
                  />
                </label>

                <button
                  className="primary-button"
                  type="submit"
                  disabled={isAddingComment}
                >
                  {isAddingComment ? "Adding..." : "Add comment"}
                </button>
              </form>

              {commentMessage ? (
                <p className="form-message">{commentMessage}</p>
              ) : null}

              {ticket.comments.length > 0 ? (
                <div className="activity-list comment-list">
                  {ticket.comments.map((comment) => (
                    <div className="activity-item comment-item" key={comment.id}>
                      <div className="activity-item-header">
                        <strong>{comment.user.name}</strong>
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      <p>{comment.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-copy">No comments yet.</p>
              )}
            </article>

            <article className="detail-panel">
              <div className="section-heading">
                <h2>Status history</h2>
              </div>
              {ticket.statusLogs.length > 0 ? (
                <div className="activity-list">
                  {ticket.statusLogs.map((log) => (
                    <div className="activity-item" key={log.id}>
                      <strong>
                        {log.oldStatus ? formatTicketStatus(log.oldStatus) : "New"} to{" "}
                        {formatTicketStatus(log.newStatus)}
                      </strong>
                      <span>
                        {log.changedBy.name} - {formatDate(log.createdAt)}
                      </span>
                      {log.note ? <p>{log.note}</p> : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-copy">No status history yet.</p>
              )}
            </article>
          </div>

          <aside className="detail-sidebar">
            <article className="detail-panel action-panel">
              <h2>Status workflow</h2>
              <p className="helper-text">
                Move this repair request to the next visible workflow state.
              </p>
              <form className="status-update-form" onSubmit={handleStatusUpdate}>
                <label className="form-field" htmlFor="ticket-status">
                  <span>Current status: {formatTicketStatus(ticket.status)}</span>
                  <select
                    id="ticket-status"
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(event.target.value as TicketStatus)
                    }
                  >
                    {ticketStatuses.map((status) => (
                      <option key={status} value={status}>
                        {formatTicketStatus(status)}
                      </option>
                    ))}
                  </select>
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

            <article className="detail-panel action-panel">
              <h2>Assignment</h2>
              <p>
                Current assigned technician:{" "}
                <strong>{ticket.assignedTo?.name ?? "Unassigned"}</strong>
              </p>

              <form className="status-update-form" onSubmit={handleAssignTicket}>
                <label className="form-field" htmlFor="technician-id">
                  <span>Technician reference</span>
                  <input
                    id="technician-id"
                    value={technicianId}
                    onChange={(event) => setTechnicianId(event.target.value)}
                    placeholder="Enter technician reference"
                  />
                </label>

                <p className="helper-text">
                  Use the technician reference from seed data, testing records, or
                  the Postman environment until technician search is available.
                </p>

                <button
                  className="primary-button"
                  type="submit"
                  disabled={isAssigningTicket}
                >
                  {isAssigningTicket ? "Assigning..." : "Assign ticket"}
                </button>
              </form>

              {assignmentMessage ? (
                <p className="form-message">{assignmentMessage}</p>
              ) : null}
            </article>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
