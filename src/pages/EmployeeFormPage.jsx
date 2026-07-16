import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeService from "../services/EmployeeService";

function EmployeeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    role: "EMPLOYEE",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    console.log("Form submitted with employee data:", employee);
    event.preventDefault();
    setSaving(true);
    try {
      if (isEditMode) {
        await EmployeeService.updateEmployee(id, employee);
      } else {
        await EmployeeService.addEmployee(employee);
      }

      navigate("/employees");
    } catch (error) {
      setError("Unable to save employee. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      const data = await EmployeeService.getEmployeeById(id);

      setEmployee({
        ...data,
        password: "",
      });
    } catch (error) {
      setError("Unable to load employee details.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEmployee((currentEmployee) => ({
      ...currentEmployee,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2>{isEditMode ? "Edit Employee" : "Add Employee"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card shadow-sm p-4 mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={employee.password}
            onChange={handleChange}
            placeholder={
              isEditMode
                ? "Leave blank to keep existing password"
                : "Enter password"
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>

          <input
            id="department"
            name="department"
            className="form-control"
            value={employee.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="form-label">
            Role
          </label>

          <select
            id="role"
            name="role"
            className="form-select"
            value={employee.role}
            onChange={handleChange}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeFormPage;
