import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthToken } from "../lib/auth";
import { getCurrentUser, type CurrentUser } from "../lib/authApi";

export default function AppLayout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  function handleLogout() {
    clearAuthToken();
    navigate("/login");
  }

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        const user = await getCurrentUser();

        if (isMounted) {
          setCurrentUser(user);
        }
      } catch {
        clearAuthToken();

        if (isMounted) {
          navigate("/login", { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

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
          <NavLink to="/assets">Assets</NavLink>
        </nav>

        <div className="user-summary">
          {isLoadingUser ? (
            <span>Loading account...</span>
          ) : currentUser ? (
            <>
              <strong>{currentUser.name || "CampusFlow User"}</strong>
              <span>{currentUser.email}</span>
              <span>{currentUser.role}</span>
            </>
          ) : null}
        </div>

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
