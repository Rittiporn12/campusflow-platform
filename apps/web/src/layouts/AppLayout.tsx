import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthToken } from "../lib/auth";
import { getCurrentUser, type CurrentUser } from "../lib/authApi";
import { formatUserRole } from "../lib/displayLabels";

function getUserInitials(name: string | null | undefined, email: string | null | undefined) {
  const displayName = name?.trim();

  if (displayName) {
    const nameParts = displayName.split(/\s+/).filter(Boolean);
    const initials = nameParts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials || "CF";
  }

  return email?.charAt(0).toUpperCase() || "CF";
}

export default function AppLayout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    clearAuthToken();
    setIsMobileMenuOpen(false);
    navigate("/login");
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
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

  const accountSummary = isLoadingUser ? (
    <div className="profile-card profile-card-loading">
      <span className="profile-avatar" aria-hidden="true">
        CF
      </span>
      <div className="profile-copy">
        <strong>Loading account</strong>
        <span>Preparing your workspace...</span>
      </div>
    </div>
  ) : currentUser ? (
    <div className="profile-card">
      <span className="profile-avatar" aria-hidden="true">
        {getUserInitials(currentUser.name, currentUser.email)}
      </span>
      <div className="profile-copy">
        <strong>{currentUser.name || "CampusFlow User"}</strong>
        <span title={currentUser.email}>{currentUser.email}</span>
        <span className="profile-role">{formatUserRole(currentUser.role)}</span>
      </div>
    </div>
  ) : null;

  return (
    <div className="app-shell">
      <header className="mobile-topbar">
        <div className="brand">
          <span className="brand-mark">CF</span>
          <span>CampusFlow</span>
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </header>

      {isMobileMenuOpen ? (
        <button
          className="drawer-backdrop"
          type="button"
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
        />
      ) : null}

      <aside className={`sidebar ${isMobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="mobile-drawer-header">
          <span>Menu</span>
          <button
            className="modal-close-button"
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <div className="brand">
          <span className="brand-mark">CF</span>
          <span>CampusFlow</span>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          <NavLink to="/dashboard" onClick={closeMobileMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/tickets" onClick={closeMobileMenu}>
            Tickets
          </NavLink>
          <NavLink to="/assets" onClick={closeMobileMenu}>
            Assets
          </NavLink>
        </nav>

        <div className="user-summary">
          {accountSummary}
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
