import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("register/", form);
      localStorage.setItem("token", res.data.access);
localStorage.setItem("username", form.username);
navigate("/");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div  className="container" style={{ padding: "40px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        /><br /><br />

        <button className="primary" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
