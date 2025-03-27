/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { MyContext } from "../context/Context"
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {

  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate()
  if (!user) return <div>Loading user data...</div>;
  /* if (!movies || movies.length === 0) return <div>Loading movies...</div>; */

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {user.firstName}!</h1>
        <button style={styles.button}>Upload Image</button>
        <p style={styles.para}><strong>Email:</strong> {user.email} </p>
        <button style={styles.button} onClick={() => navigate("/login")} >Log Out</button>



      </header>
    </div>
  );

};

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
    color: "#FFCC00", // Yellow for header
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFCC00", // Yellow for buttons
    color: "black",
    fontSize: "16px",
    cursor: "pointer",

  },
  link: {
    textDecoration: "none",
    color: "#007BFF", // Blue for links
    margin: "0 10px",
  },
  navTabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333", // Darker color for subheaders
  },
  para: {
    padding: "10px",
    color: "white"
  }

};

export default ProfilePage;