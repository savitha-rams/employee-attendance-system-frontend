import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <EmployeeFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EmployeeFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
