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
        throw new Error(data.message || "Failed to fetch moderator statistics");
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
    return <h2>Loading Moderator Dashboard...</h2>;
  }

  return (
    <div>
      <h1>Moderator Dashboard</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div>
        <h3>Pending Members</h3>
        <p>{stats.pendingMembers}</p>
      </div>

      <div>
        <h3>Reported Posts</h3>
        <p>{stats.reportedPosts}</p>
      </div>

      <div>
        <h3>Reported Comments</h3>
        <p>{stats.reportedComments}</p>
      </div>

      <div>
        <h3>Upcoming Events</h3>
        <p>{stats.upcomingEvents}</p>
      </div>
    </div>
  );
}

export default ModeratorDashboard;