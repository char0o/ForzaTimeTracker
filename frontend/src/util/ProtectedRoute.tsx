import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import{ jwtDecode} from 'jwt-decode';

interface DecodedToken{
    id: string;
    email: string;
    displayName?: string;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/");
            return;
          }

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
            console.log("Tabrnar");
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