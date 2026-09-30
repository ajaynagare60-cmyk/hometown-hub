
import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  // ==============================
  // GET EVENTS
  // ==============================

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);


  // ==============================
  // FORM INPUT
  // ==============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ==============================
  // CREATE EVENT
  // ==============================

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create event");
        return;
      }

      setEvents([data, ...events]);

      setForm({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });

      alert("Event created successfully!");

    } catch (error) {
      console.error("Create event error:", error);
      alert("Server error");
    }
  };


  // ==============================
  // JOIN EVENT
  // ==============================

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/join`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to join event");
        return;
      }

      setEvents(
        events.map((event) =>
          event._id === data._id ? data : event
        )
      );

    } catch (error) {
      console.error("Join event error:", error);
    }
  };


  return (
    <div className="events-page">

      <h1>Events</h1>


      {/* CREATE EVENT */}

      <div className="create-event">

        <h2>Create Event</h2>

        <form onSubmit={handleCreateEvent}>

          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Event
          </button>

        </form>

      </div>


      {/* EVENTS */}

      <div className="events-list">

        <h2>Upcoming Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((event) => (

            <div className="event-card" key={event._id}>

              <h3>{event.name}</h3>

              <p>{event.description}</p>

              <p>
                📅{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p>
                ⏰ {event.time}
              </p>

              <p>
                📍 {event.location}
              </p>

              <p>
                Hosted by:{" "}
                {event.community?.name ||
                  event.createdBy?.name ||
                  "Community"}
              </p>

              <p>
                {event.interestedUsers?.length || 0}
                {" "}
                people interested
              </p>

              <button
                onClick={() =>
                  handleJoinEvent(event._id)
                }
              >
                Join Event
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Events;

