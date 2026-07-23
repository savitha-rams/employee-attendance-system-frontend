import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import DashboardButton from "../components/DashboardButton";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    try {
      setError("");
      const data = await EmployeeService.getAllEmployees();

      setEmployees(data);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading employees...</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(id);
      await EmployeeService.deleteEmployee(id);

      setEmployees((currentEmployees) =>
        currentEmployees.filter((employee) => employee.employeeId !== id),
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete employee. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container mt-4">
      <DashboardButton className="mb-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Employees</h2>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {!error && employees.length === 0 && (
        <div className="alert alert-info">No employees found.</div>
      )}

      {!error && employees.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>

              <th>First Name</th>

              <th>Last Name</th>

              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>

                <td>{employee.firstName}</td>

                <td>{employee.lastName}</td>

                <td>{employee.email}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() =>
                      navigate(`/employees/edit/${employee.employeeId}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(employee.employeeId)}
                    disabled={deletingId === employee.employeeId}
                  >
                    {deletingId === employee.employeeId
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeListPage;
