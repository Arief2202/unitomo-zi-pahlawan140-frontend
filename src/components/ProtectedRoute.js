import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("tokenUser") || localStorage.getItem("tokenUser");
    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
