/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Login() {
const{user, setUser}= useContext(MyContext)
const navigate=useNavigate()
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      // Make the fetch request to the backend for login
      const response = await fetch("http://localhost:6002/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // Check if the response is not OK (i.e., not 2xx)
      if (!response.ok) {
        throw new Error(`Incorrect Email or Password: ${response.status}`);
      }
      const token= response.headers.get("token")
      localStorage.setItem("token",token)
      const data = await response.json();
      // Check if the response contains a success message
      if (data.success) {
        alert("Login successful!");
        setUser(data.data)
        navigate("/profile")
        // Redirect to another page or save user session/token here
        // For example, you might want to redirect to the dashboard:
        // window.location.href = "/dashboard";
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      // Show an error alert if any issue occurs during the request
      console.error("Error logging in:", error);
      alert("An error occurred: " + error.message);
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          style={styles.input}
        />
        <label htmlFor="password" style={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
          style={styles.input}
        />
        <button type="submit" style={styles.button} >
          Login
        </button>
        <p style={styles.link}>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p style={styles.link}>
          Don&apos;t have an account?&quot;<a href="/register"></a>
          <button style={styles.registerButton}>
            <a
              href="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </a>
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color:"#FFCC00",

  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFCC00",
    color: "black",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight:"bold"
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  link: {
    textAlign: "center",
    marginTop: "10px",
  },
  registerButton: {
    backgroundColor: "#28A745", // Green button background
    color: "white", // White text color
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
    fontSize: "16px",
  },
  
};
