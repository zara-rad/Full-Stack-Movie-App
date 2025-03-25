import React from "react";
export default function Login() {
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic for authentication here, such as API calls
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
                <button type="submit" style={styles.button}>
                    Log In
                </button>
                <p style={styles.link}>
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p style={styles.link}>Don&apos;t have an account?&quot;<a href="/register">Register</a>
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
        backgroundColor: "#28A745",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
    link: {
        textAlign: "center",
        marginTop: "10px",
    },
};






