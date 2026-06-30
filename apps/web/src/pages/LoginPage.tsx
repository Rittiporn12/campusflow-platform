import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password.");
      return;
    }

    setMessage("Login API integration will be added in the next step.");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Authentication</p>
          <h1>CampusFlow</h1>
          <p>Smart Campus Operations Platform</p>
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

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        {message ? <p className="form-message">{message}</p> : null}

        <div className="demo-hint">
          <span>Demo account</span>
          <strong>admin@campusflow.dev / Password123!</strong>
        </div>
      </section>
    </main>
  );
}
