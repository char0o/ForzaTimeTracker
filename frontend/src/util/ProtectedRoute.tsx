import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const sessionStr = localStorage.getItem("sessionInfo");
        const sessionObj = sessionStr ? JSON.parse(sessionStr) : null;
        
        if (!sessionObj || !sessionObj.token) {
          navigate("/");
          return;
        }
        const token = sessionObj.token;
        //console.log(token);
        const response = await fetch("http://localhost:5000/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsAuth(true);
        } else {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [navigate]);
  if (loading) {
    return null;
  }
  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
