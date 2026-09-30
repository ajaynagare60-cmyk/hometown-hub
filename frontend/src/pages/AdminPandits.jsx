
import { useEffect, useState } from "react";

function AdminPandits() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/pandits",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to fetch applications");
        return;
      }

      setApplications(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchApplications();
  }, []);


  const updateStatus = async (id, action) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/pandits/${id}/${action}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Action failed");
        return;
      }

      setApplications(
        applications.map((application) =>
          application._id === id
            ? data.application
            : application
        )
      );

    } catch (error) {
      console.error(error);
    }
  };


  if (loading) {
    return <p>Loading applications...</p>;
  }


  return (
    <div className="admin-pandits">

      <h1>Pandit Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (

          <div
            className="pandit-application"
            key={application._id}
          >

            <h3>{application.name}</h3>

            <p>
              Location: {application.city}
            </p>

            <p>
              Village: {application.village}
            </p>

            <p>
              Status: {application.status}
            </p>

            {application.status === "Pending" && (
              <div>

                <button
                  onClick={() =>
                    updateStatus(
                      application._id,
                      "approve"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      application._id,
                      "reject"
                    )
                  }
                >
                  Reject
                </button>

              </div>
            )}

          </div>

        ))
      )}

    </div>
  );
}

export default AdminPandits;

