/* import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/admin/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h3>Add New Movie</h3>
            <form action="">
                <label htmlFor="">Title: <input type="text" name="title" /></label>
                <label htmlFor="">Year: <input type="text" name="year" /></label>
                <label htmlFor="">Price: <input type="text" name="price" /></label>
                <button>Add movie</button>
            </form>


        </div>
    );
}
