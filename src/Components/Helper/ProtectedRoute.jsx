import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { data } = useSelector((state) => state.token);
  return data ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
