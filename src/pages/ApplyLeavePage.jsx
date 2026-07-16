import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LeaveService from "../services/LeaveService";

function ApplyLeavePage() {
  const navigate = useNavigate();

  const [leaveRequest, setLeaveRequest] = useState({
    startDate: "",
    endDate: "",
    leaveType: "ANNUAL",
    reason: "",
    employeeId: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLeaveRequest((currentLeaveRequest) => ({
      ...currentLeaveRequest,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await LeaveService.applyLeave({
        ...leaveRequest,
        employeeId: Number(leaveRequest.employeeId),
      });

      navigate("/leaves");
    } catch (error) {
      setError("Unable to apply for leave. Please check the entered values.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Apply Leave</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card shadow-sm p-4 mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              className="form-control"
              value={leaveRequest.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>

            <input
              id="endDate"
              name="endDate"
              type="date"
              className="form-control"
              value={leaveRequest.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="leaveType" className="form-label">
            Leave Type
          </label>

          <select
            id="leaveType"
            name="leaveType"
            className="form-select"
            value={leaveRequest.leaveType}
            onChange={handleChange}
          >
            <option value="ANNUAL">Annual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>

          <textarea
            id="reason"
            name="reason"
            className="form-control"
            rows="3"
            value={leaveRequest.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="employeeId" className="form-label">
            Employee ID
          </label>

          <input
            id="employeeId"
            name="employeeId"
            type="number"
            className="form-control"
            value={leaveRequest.employeeId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={saving}
          >
            {saving ? "Submitting..." : "Apply Leave"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/leaves")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplyLeavePage;
