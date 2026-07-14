import { useState } from "react";
import AuthService from "../services/AuthService";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        const loginRequest = {
             email,
            password,
        };

  try {
    const response = await AuthService.login(loginRequest);

    console.log("Login response:", response.data);

    localStorage.setItem("token", response.data.token);

    alert("Login successful");
  } catch (error) {
    console.error("Login failed:", error);

    setError(
      error.response?.data?.error ||
      "Login failed. Please check your email and password."
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
          <div className="card login-card shadow">
            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <h3 className="fw-bold mb-2">
                  Attendance Portal
                </h3>

                <p className="text-muted mb-0">
                  Sign in to continue
                </p>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary w-100 py-2"
                onClick={handleLogin}
                disabled={loading}
             >
                {loading ? "Signing in..." : "Login"}
             </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}



export default LoginPage;