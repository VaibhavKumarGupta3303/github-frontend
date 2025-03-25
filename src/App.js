import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch all users
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter both name and email!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/insert", { name, email });
      alert(response.data.message);
      setUsers([...users, { id: response.data.userId, name, email }]); // Update UI
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>MySQL Users Management</h1>
 <h1>noshabjnsjkankjadajkakjsnement</h1>
      
      {/* User Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Add User</button>
      </form>

      {/* User List */}
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
