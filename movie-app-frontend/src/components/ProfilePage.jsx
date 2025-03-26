// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
/* import {MyContext} from "./" */
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch user data. Update the path to user data source.
    fetch("/")
      .then((response) => response.json())
      .then((data) => setUserData(data));

    // Fetch movie data to movie.json.
    fetch("/path to movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  if (!userData) return <div>Loading user data...</div>;
  if (movies.length === 0) return <div>Loading movies...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {userData.username}!</h1>
        <button style={styles.button}>Upload Profile Image</button>
        <button style={styles.button}>Log Out</button>
      </header>

      <nav style={styles.navTabs}>
        <a href="#overview" style={styles.link}>
          Profile Overview
        </a>
        <a href="#purchase-history" style={styles.link}>
          Purchase History
        </a>
      </nav>

      <section id="overview">
        <h2 style={styles.subHeader}>Profile Overview</h2>
        <p>Email: {userData.email}</p>
        <p>Join Date: {userData.joinDate}</p>
      </section>

      <section id="purchase-history">
        <h2 style={styles.subHeader}>Purchase History</h2>
        <ul style={styles.purchaseList}>
          {userData.purchaseHistory.map((purchase, index) => (
            <li key={index} style={styles.purchaseItem}>
              {purchase.title} - {purchase.date} - ${purchase.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>
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
    color: "#FFCC00",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FFCC00",
    color: "black",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "#007BFF",
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
    color: "#333",
  },
  purchaseList: {
    listStyleType: "none",
    padding: 0,
  },
  purchaseItem: {
    marginBottom: "10px",
    fontSize: "16px",
  },
};

export default ProfilePage;
