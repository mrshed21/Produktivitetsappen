import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Guest = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    setChecking(false);
  }, [currentUser, navigate]);

  if (checking || currentUser) return null;

  return (
    <>
      <Outlet />
    </>
  );
};

export default Guest;
