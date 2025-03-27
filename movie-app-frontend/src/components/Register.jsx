import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Register() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6002/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
/*       console.log("Server response:", data); // Debugging response
 */
      if (data.success) {
        alert("User registered successfully!");
        setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Reset form
        navigate("/login"); // Redirect to login page

      } else {
        // Handle error messages properly
        let errorMessage =
          typeof data.message === "string"
            ? data.message
            : Array.isArray(data.message)
            ? data.message.map((err) => err.msg).join("\n")
            : "Registration failed";

        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please check your connection and try again.");
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
