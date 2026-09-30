import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Details</h1>

      <p>Event ID: {id}</p>

      <Link to="/events">
        <button>Back to Events</button>
      </Link>
    </div>
  );
}

export default EventDetails;