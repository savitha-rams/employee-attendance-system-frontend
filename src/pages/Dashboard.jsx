import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="container mt-5">
      <div className="p-4 mb-4 bg-light rounded-3 border shadow-sm">
        <h1 className="display-5 fw-bold mb-2">Employee Management System</h1>

        <p className="text-primary fs-5 mb-2">
          Enterprise Attendance & Leave Management
        </p>

        <p className="text-muted mb-0">
          Welcome! Use the dashboard below to manage employees, leave requests
          and attendance.
        </p>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">👥 Employees</h5>

              <p className="card-text">
                Add, update and manage employee records.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/employees")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🍃 Leaves</h5>

              <p className="card-text">Add and manage leave requests.</p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/leaves")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">📊 Attendance</h5>

              <p className="card-text">Manage employee attendance records.</p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/attendance")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
