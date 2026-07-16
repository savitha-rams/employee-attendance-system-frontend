import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <button
        className="btn btn-primary me-2"
        onClick={() => navigate("/employees")}
      >
        Employees
      </button>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
