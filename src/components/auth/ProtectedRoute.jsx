import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
