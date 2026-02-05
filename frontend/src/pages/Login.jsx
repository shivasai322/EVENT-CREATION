import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", form);
      localStorage.setItem("token", res.data.access);
localStorage.setItem("username", form.username);
navigate("/");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container"  style={{ padding: "40px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        /><br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        /><br /><br />

        <button className="primary" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

