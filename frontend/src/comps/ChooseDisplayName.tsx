import { useState } from "react";
import { FormControl, Button, Input } from "@chakra-ui/react";
import ErrorBox from "./ErrorBox";
import {GetSession} from "../util/SessionManager";
interface ChooseDisplayNameData {
  displayName: string;
}

interface ChooseDisplayNameProps {
    onChange: () => void;
}

const ChooseDisplayName: React.FC<ChooseDisplayNameProps> = ( {onChange} ) => {
  const [displayName, setDisplayName] = useState<ChooseDisplayNameData>({
    displayName: "",
  });
  const [error , setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "displayName") {
      setDisplayName({ displayName: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log(displayName);
    try {
        const session = GetSession();
        if (!session || !session.token) {
            return;
        }
        const response = await fetch("http://localhost:5000/api/choosedisplayname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(displayName),
        });
        if (!response.ok) {
            setError("Name already taken");
            return;
        }
        session.displayName = displayName.displayName;
        localStorage.setItem("sessionInfo", JSON.stringify(session));
        onChange();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
    <form onSubmit={handleSubmit}>
        {error && <ErrorBox message={error} />}
      <FormControl>
        <Input type="text" my="4" bg="white" name="displayName" onChange={handleChange}/>
        <Button type="submit" width="100%" my="2" colorScheme="blue">
          Choose name
        </Button>
      </FormControl>
    </form>
  );
};

export default ChooseDisplayName;
