
import React, { useEffect, useState } from 'react'
import { MyContext } from './Context'

export default function Provider({ children }) {
    const [user, setUser] = useState(null)
    const [movies, setMovies] = useState([])
    const [cart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState("") // 🔹 Add search term state

    // Fetch movies from backend
    useEffect(() => {
        fetch("/movies")
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setMovies(result.data)
                } else {
                    console.error("Error:", result.message)
                }
            })
            .catch(error => console.error("Fetch error:", error));

        const querydata = new URLSearchParams(window.location.search)
        if (querydata.get("success")) alert("Order placed successfully")
        if (querydata.get("canceled")) alert("Order canceled")
    }, [])

    // Check user authentication token
    useEffect(() => {
        //check the token in localstorage
        const token = localStorage.getItem("token")
        if (token) {
            fetch("/user/verifytoken",
                {
                    method: "GET",
                    headers: { token: token }
                })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        setUser(result.data)
                        console.log(result.data)
                    } else {
                        alert(result.message)
                    }
                })
        }
    }, [])
    return (
        <MyContext.Provider value={{
            user, setUser,
            movies, setMovies,
            cart, setCart,
            searchTerm, setSearchTerm // 🔹 Provide searchTerm to context
        }}>
            {children}
        </MyContext.Provider>
    )
}






