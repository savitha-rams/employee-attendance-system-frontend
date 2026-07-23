import { useNavigate } from "react-router-dom";

function DashboardButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary mb-3"
      onClick={() => navigate("/dashboard")}
    >
      ← Dashboard
    </button>
  );
}

export default DashboardButton;
