import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LeaveService from "../services/LeaveService";

function LeaveListPage() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaves = async () => {
    try {
      const data = await LeaveService.getAllLeaves();
      setLeaves(data);
    } catch (error) {
      setError("Unable to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leave request?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await LeaveService.deleteLeave(id);

      setLeaves((currentLeaves) =>
        currentLeaves.filter((leave) => leave.leaveId !== id),
      );
    } catch (error) {
      setError("Unable to delete leave request.");
    }
  };

  if (loading) {
    return <h4>Loading leave requests...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Leave Requests</h2>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/leaves/apply")}
        >
          Apply Leave
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.leaveId}>
              <td>{leave.leaveId}</td>
              <td>{leave.employeeId}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(leave.leaveId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveListPage;
