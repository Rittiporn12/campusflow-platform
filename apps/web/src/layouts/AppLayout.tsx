import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthToken } from "../lib/auth";

export default function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthToken();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">CF</span>
          <span>CampusFlow</span>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/tickets">Tickets</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>

        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
