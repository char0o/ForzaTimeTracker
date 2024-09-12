import { Button } from "@chakra-ui/react";
import { Logout } from "../util/SessionManager";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {       
        Logout();
        navigate("/");
    };
  return (
    <Button mx="3" colorScheme="red" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;