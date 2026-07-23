import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const loginRequest = {
      email,
      password,
    };

    try {
      const response = await AuthService.login(loginRequest);

      AuthService.saveToken(response.data.token);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-6 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-3">Employee Management System</h3>
                  <p className="text-muted mb-0">Sign in to continue</p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-muted small mt-4 mb-0">
          Employee Management System v1.0
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
