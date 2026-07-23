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
  const [validationErrors, setValidationErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLeaveRequest((currentLeaveRequest) => ({
      ...currentLeaveRequest,
      [name]: value,
    }));

    setValidationErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setValidationErrors({});
    setSaving(true);

    try {
      await LeaveService.applyLeave({
        ...leaveRequest,
        employeeId: Number(leaveRequest.employeeId),
      });

      navigate("/leaves");
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.validationErrors) {
        setValidationErrors(responseData.validationErrors);

        setError(
          responseData.message || "Please correct the highlighted fields.",
        );
      } else {
        setValidationErrors({});

        setError(
          responseData?.message || responseData || "Unable to apply for leave.",
        );
      }
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
              className={`form-control ${
                validationErrors.startDate ? "is-invalid" : ""
              }`}
              value={leaveRequest.startDate}
              onChange={handleChange}
              required
            />
            {validationErrors.startDate && (
              <div className="invalid-feedback">
                {validationErrors.startDate}
              </div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>

            <input
              id="endDate"
              name="endDate"
              type="date"
              className={`form-control ${
                validationErrors.endDate ? "is-invalid" : ""
              }`}
              value={leaveRequest.endDate}
              onChange={handleChange}
              required
            />
            {validationErrors.endDate && (
              <div className="invalid-feedback">{validationErrors.endDate}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="leaveType" className="form-label">
            Leave Type
          </label>

          <select
            id="leaveType"
            name="leaveType"
            className={`form-select ${
              validationErrors.leaveType ? "is-invalid" : ""
            }`}
            value={leaveRequest.leaveType}
            onChange={handleChange}
            required
          >
            <option value="ANNUAL">Annual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
          </select>
          {validationErrors.leaveType && (
            <div className="invalid-feedback">{validationErrors.leaveType}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>

          <textarea
            id="reason"
            name="reason"
            className={`form-control ${
              validationErrors.reason ? "is-invalid" : ""
            }`}
            rows="3"
            value={leaveRequest.reason}
            onChange={handleChange}
            required
          />
          {validationErrors.reason && (
            <div className="invalid-feedback">{validationErrors.reason}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="employeeId" className="form-label">
            Employee ID
          </label>

          <input
            id="employeeId"
            name="employeeId"
            type="number"
            className={`form-control ${
              validationErrors.employeeId ? "is-invalid" : ""
            }`}
            value={leaveRequest.employeeId}
            onChange={handleChange}
            required
          />
          {validationErrors.employeeId && (
            <div className="invalid-feedback">
              {validationErrors.employeeId}
            </div>
          )}
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
