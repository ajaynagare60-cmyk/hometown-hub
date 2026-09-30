import React, { useEffect, useState } from "react";

function ModeratorDashboard() {
  const [stats, setStats] = useState({
    pendingMembers: 0,
    reportedPosts: 0,
    reportedComments: 0,
    upcomingEvents: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No login token found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/moderator/stats",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch moderator statistics"
        );
      }

      setStats(data);
    } catch (error) {
      console.error("Moderator dashboard error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Moderator Dashboard...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h1>Moderator Dashboard</h1>

      <p>
        Manage community members, reported content, comments,
        and announcements.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* STATISTICS */}

      <h2>Dashboard Statistics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Pending Members</h3>
          <h1>{stats.pendingMembers}</h1>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Reported Posts</h3>
          <h1>{stats.reportedPosts}</h1>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Reported Comments</h3>
          <h1>{stats.reportedComments}</h1>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Upcoming Events</h3>
          <h1>{stats.upcomingEvents}</h1>
        </div>
      </div>

      {/* PENDING MEMBERS */}

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Pending Members</h2>

        <p>
          Members waiting for moderator approval will appear here.
        </p>

        <div>
          <strong>Rahul</strong>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                marginRight: "10px",
                padding: "8px 15px",
              }}
            >
              Approve
            </button>

            <button
              style={{
                padding: "8px 15px",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* REPORTED POSTS */}

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Reported Posts</h2>

        <p>
          Reported posts will appear here.
        </p>

        <div>
          <strong>Post #123</strong>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                padding: "8px 15px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* REPORTED COMMENTS */}

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Reported Comments</h2>

        <p>
          Reported comments will appear here.
        </p>

        <div>
          <strong>Comment #45</strong>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                padding: "8px 15px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENTS */}

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Announcements</h2>

        <p>
          Ganesh Festival Meeting
        </p>

        <button
          style={{
            padding: "8px 15px",
          }}
        >
          Pin Announcement
        </button>
      </div>
    </div>
  );
}

export default ModeratorDashboard;