import apiClient from "./apiClient";

const getAllEmployees = async () => {
  const response = await apiClient.get("/employees");
  return response.data;
};

const getEmployeeById = async (id) => {
  const response = await apiClient.get(`/employees/${id}`);
  return response.data;
};

const addEmployee = async (employee) => {
  const response = await apiClient.post("/employees", employee);
  return response.data;
};

const updateEmployee = async (id, employee) => {
  const response = await apiClient.put(`/employees/${id}`, employee);
  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await apiClient.delete(`/employees/${id}`);
  return response.data;
};

const EmployeeService = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeService;
