import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadEmployees = async () => {
    try {
      const data = await EmployeeService.getAllEmployees();

      setEmployees(data);
    } catch (error) {
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return <h4>Loading employees...</h4>;
  }

  if (error) {
    return <h4>{error}</h4>;
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await EmployeeService.deleteEmployee(id);

      setEmployees((currentEmployees) =>
        currentEmployees.filter((employee) => employee.employeeId !== id),
      );
    } catch (error) {
      setError("Unable to delete employee. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
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

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Actions</th>
            <th>ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
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
                >
                  Delete
                </button>
              </td>
              <td>{employee.employeeId}</td>

              <td>{employee.firstName}</td>

              <td>{employee.lastName}</td>

              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeListPage;
