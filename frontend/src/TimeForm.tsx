import React, { useState } from "react";

interface TimeData {
  map: string;
  time: string;
}

const TimeForm: React.FC = () => {
  const [formData, setFormData] = useState<TimeData>({ map: "", time: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      console.log(response.text());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Map:
        <input 
            type="text" 
            name="map" 
            value={formData.map} 
            onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Time:
        <input 
            type="text" 
            name="time" 
            value={formData.time} 
            onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeForm;