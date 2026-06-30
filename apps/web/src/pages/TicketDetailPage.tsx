import { useParams } from "react-router-dom";

export default function TicketDetailPage() {
  const { id } = useParams();

  return (
    <section className="page-section">
      <p className="eyebrow">Ticket detail</p>
      <h1>Ticket {id}</h1>
      <p>This placeholder page will show ticket details, comments, and status history later.</p>
    </section>
  );
}
