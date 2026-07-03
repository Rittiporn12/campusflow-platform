import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { login, setAuthToken } from "../lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const data = await login({
        email,
        password,
      });

      if (data.data.accessToken) {
        setAuthToken(data.data.accessToken);
      }

      setMessage(data.message || "Login successful.");
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Login failed. Please check your email and password.";

      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label="CampusFlow login">
        <div className="auth-brand-panel">
          <div className="brand">
            <span className="brand-mark">CF</span>
            <span>CampusFlow</span>
          </div>

          <div>
            <p className="eyebrow">Smart campus operations</p>
            <h1>Run campus work from one internal console.</h1>
            <p>
              Track repair tickets, manage assets, and keep operations work
              visible for campus teams.
            </p>
          </div>
        </div>

        <section className="auth-card">
          <div className="auth-header">
            <p className="eyebrow">Authentication</p>
            <h2>Sign in</h2>
            <p>Use the demo admin account to review the current workflow.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field" htmlFor="email">
              <span>Email</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@campusflow.dev"
              />
            </label>

            <label className="form-field" htmlFor="password">
              <span>Password</span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password123!"
              />
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {message ? <p className="form-message">{message}</p> : null}

          <div className="demo-hint">
            <span>Demo account</span>
            <strong>admin@campusflow.dev</strong>
            <strong>Password123!</strong>
          </div>
        </section>
      </section>
    </main>
  );
}
