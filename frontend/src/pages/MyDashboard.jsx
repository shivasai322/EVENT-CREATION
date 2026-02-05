import { useEffect, useState } from "react";
import API from "../api/axios";

function MyDashboard() {
  const [data, setData] = useState({
    created_events: [],
    joined_events: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("dashboard/");
        setData(res.data);
      } catch (err) {
        console.log("Error loading dashboard");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Dashboard</h2>

      <h3>Events I Created</h3>
      {data.created_events.length === 0 ? (
        <p>No created events</p>
      ) : (
        data.created_events.map((event) => (
          <div key={event.id} style={{ marginBottom: "10px" }}>
            <strong>{event.title}</strong>
          </div>
        ))
      )}

      <h3>Events I Joined</h3>
      {data.joined_events.length === 0 ? (
        <p>No joined events</p>
      ) : (
        data.joined_events.map((event) => (
          <div key={event.id} style={{ marginBottom: "10px" }}>
            <strong>{event.title}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default MyDashboard;

