import apiClient from "./apiClient";

const getAllAttendances = async () => {
  const response = await apiClient.get("/attendance");
  return response.data;
};

const getAttendanceById = async (id) => {
  const response = await apiClient.get(`/attendance/${id}`);
  return response.data;
};

const checkIn = async (employeeId) => {
  const response = await apiClient.post("/attendance/check-in", {
    employeeId: Number(employeeId),
  });

  return response.data;
};

const checkOut = async (employeeId) => {
  const response = await apiClient.post(`/attendance/check-out/${employeeId}`);

  return response.data;
};

const AttendanceService = {
  getAllAttendances,
  getAttendanceById,
  checkIn,
  checkOut,
};

export default AttendanceService;
