import { useEffect, useState } from "react";
import API from "../api/axios";




function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("events/");
        console.log("EVENT RESPONSE:", res.data);
        setEvents(res.data.results || res.data);
      } catch (err) {
        console.log("Error fetching events");
      }
    };

    fetchEvents();
  }, []);
  const handleRSVP = async (id) => {
    try {
      await API.post(`events/${id}/rsvp/`);
      alert("RSVP successful!");
    } catch (err) {
      alert(err.response?.data?.detail || "already already rsvp'd");
    }
  };
  const handleCancel = async (id) => {
    try {
      await API.delete(`events/${id}/cancel/`);
      alert("RSVP cancelled!");
    } catch (err) {
      alert(err.response?.data?.detail || "Cancel failed");
    }
  };
  const currentUser = localStorage.getItem("username");

  const handleDelete = async (id) => {
    try {
      await API.delete(`events/delete/${id}/`);
      alert("Event deleted");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed");
    }
  };





  return (
    <div className="container" style={{ padding: "40px" }}>
      <h2>All Events</h2>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        events.map((event) => (
          <div className="card" key={event.id}>

            {/* <p>Image value: {event.image}</p> */}

            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>

            <div className="event-info">


              <div className="info-box">
                <span>Location</span>
                <strong>{event.location}</strong>
              </div>

              <div className="info-box">
                <span>Date</span>
                <strong>
                  {new Date(event.date_time).toLocaleDateString()}
                </strong>
              </div>

              <div className="info-box">
                <span>Time</span>
                <strong>
                  {new Date(event.date_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </div>

              <div className="info-box">
                <span>Capacity</span>
                <strong>{event.capacity}</strong>
              </div>

              <div className="info-box">
                <span>Remaining</span>
                <strong>{event.remaining_seats}</strong>
              </div>
            </div>

            <div className="event-actions">
              <button className="primary" onClick={() => handleRSVP(event.id)}>
                RSVP
              </button>

              <button className="secondary" onClick={() => handleCancel(event.id)}>
                Cancel
              </button>


              {event.is_creator && (
                <button className="danger" onClick={() => handleDelete(event.id)}>
                  Delete
                </button>
              )}
            </div>
            {event.image && (
              <img
                src={event.image.startsWith("http")
                  ? event.image
                  : `http://localhost:8000${event.image}`}
                className="event-image"
              />

            )}


          </div>
        ))
      )}
    </div>

  );
}
export default Dashboard;

