import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AttendanceService from "../services/AttendanceService";

function AttendanceListPage() {
  const navigate = useNavigate();

  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendances = async () => {
    setError("");

    try {
      const data = await AttendanceService.getAllAttendances();
      setAttendances(data);
    } catch (error) {
      setError("Unable to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendances();
  }, []);

  if (loading) {
    return <h4>Loading attendance records...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Attendance Records</h2>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/attendance/action")}
        >
          Check In / Check Out
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {attendances.length === 0 ? (
        <div className="alert alert-info">
          No attendance records are available.
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance.attendanceId}>
                <td>{attendance.attendanceId}</td>
                <td>{attendance.employeeId}</td>
                <td>{attendance.attendanceDate || "-"}</td>
                <td>{attendance.checkInTime || "-"}</td>
                <td>{attendance.checkOutTime || "-"}</td>
                <td>{attendance.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceListPage;
