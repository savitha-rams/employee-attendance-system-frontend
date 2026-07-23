import { useState } from "react";

import AttendanceService from "../services/AttendanceService";

function AttendanceActionPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleCheckIn = async () => {
    if (!employeeId.trim()) {
      setError("Employee ID is required.");
      setMessage("");
      return;
    }

    setProcessing(true);
    setError("");
    setValidationErrors({});
    setMessage("");

    try {
      await AttendanceService.checkIn(employeeId);
      setMessage("Checked in successfully.");
      setEmployeeId("");
    } catch (error) {
      const responseData = error.response?.data;
      if (responseData?.validationErrors) {
        setValidationErrors(responseData.validationErrors);
        setError(
          responseData.message || "Please correct the highlighted fields.",
        );
      } else {
        setValidationErrors({});
        setError(responseData?.message || "Unable to check in.");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId.trim()) {
      setError("Employee ID is required.");
      setMessage("");
      return;
    }

    setProcessing(true);
    setError("");
    setValidationErrors({});
    setMessage("");

    try {
      await AttendanceService.checkOut(employeeId);
      setMessage("Checked out successfully.");
      setEmployeeId("");
    } catch (error) {
      const responseData = error.response?.data;
      if (responseData?.validationErrors) {
        setValidationErrors(responseData.validationErrors);
        setError(
          responseData.message || "Please correct the highlighted fields.",
        );
      } else {
        setValidationErrors({});
        setError(responseData?.message || "Unable to check out.");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);

    setValidationErrors((previous) => ({
      ...previous,
      employeeId: "",
    }));
  };

  return (
    <div className="container mt-5">
      <h2>Attendance</h2>

      <div className="mb-3">
        <label htmlFor="employeeId" className="form-label">
          Employee ID
        </label>

        <input
          type="number"
          className={`form-control ${validationErrors.employeeId ? "is-invalid" : ""}`}
          id="employeeId"
          value={employeeId}
          onChange={handleEmployeeIdChange}
          min="1"
        />
        {validationErrors.employeeId && (
          <div className="invalid-feedback">{validationErrors.employeeId}</div>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={handleCheckIn}
        disabled={processing}
      >
        Check In
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCheckOut}
        disabled={processing}
      >
        Check Out
      </button>
    </div>
  );
}

export default AttendanceActionPage;
