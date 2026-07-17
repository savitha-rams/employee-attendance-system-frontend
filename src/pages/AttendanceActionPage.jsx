import { useState } from "react";

import AttendanceService from "../services/AttendanceService";

function AttendanceActionPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
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
    setMessage("");

    try {
      await AttendanceService.checkIn(employeeId);
      setMessage("Checked in successfully.");
      setEmployeeId("");
    } catch (error) {
      setError("Unable to check in.");
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
    setMessage("");

    try {
      await AttendanceService.checkOut(employeeId);
      setMessage("Checked out successfully.");
      setEmployeeId("");
    } catch (error) {
      setError("Unable to check out.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Attendance Action</h2>

      <div className="mb-3">
        <label htmlFor="employeeId" className="form-label">
          Employee ID
        </label>

        <input
          type="number"
          className="form-control"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          min="1"
        />
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
