import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date_time: "",
    location: "",
    capacity: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("date_time", form.date_time);
  formData.append("location", form.location);
  formData.append("capacity", Number(form.capacity));

  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    const res = await API.post("events/create/", formData);
    console.log(res.data);
    alert("Event created successfully!");
    navigate("/");
  } catch (err) {
    console.log("ERROR RESPONSE:", err.response?.data);
    alert("Event creation failed");
  }
};


  return (
    <div className="container" style={{ padding: "40px" }}>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br /><br />

        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br /><br />

        <input type="datetime-local" name="date_time" onChange={handleChange} /><br /><br />

        <input name="location" placeholder="Location" onChange={handleChange} /><br /><br />

        <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} /><br /><br />

        <input type="file" name="image" onChange={handleChange} /><br /><br />

        <button  className="primary" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEvent;

