import apiClient from "./apiClient";

const getAllLeaves = async () => {
  const response = await apiClient.get("/leaves");
  return response.data;
};

const getLeaveById = async (id) => {
  const response = await apiClient.get(`/leaves/${id}`);
  return response.data;
};

const applyLeave = async (leaveRequest) => {
  const response = await apiClient.post("/leaves", leaveRequest);
  return response.data;
};

const deleteLeave = async (id) => {
  await apiClient.delete(`/leaves/${id}`);
};

const LeaveService = {
  getAllLeaves,
  getLeaveById,
  applyLeave,
  deleteLeave,
};

export default LeaveService;
