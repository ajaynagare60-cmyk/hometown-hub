import React from "react";

function Dashboard() {
  // Get logged-in user details
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "User";
  const hometown = user?.hometown || "Your Hometown";

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Hometown Hub</h1>

        <nav style={styles.nav}>
          <a href="#">Dashboard</a>
          <a href="#">Communities</a>
          <a href="#">Events</a>
          <a href="#">Profile</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.container}>
        <h2>Welcome, {userName} 👋</h2>

        {/* Hometown */}
        <section style={styles.section}>
          <h3>Your Hometown</h3>
          <p style={styles.hometown}>{hometown}</p>
        </section>

        {/* Communities */}
        <section style={styles.section}>
          <h3>Your Communities</h3>

          <div style={styles.communityCard}>
            <h4>Pune</h4>
            <p>1,250 Members</p>
          </div>
        </section>

        {/* Recent Posts */}
        <section style={styles.section}>
          <h3>Recent Posts</h3>

          <div style={styles.postCard}>
            <h4>Rahul</h4>
            <p style={styles.postTitle}>
              Community Announcement
            </p>

            <p>Ganesh festival meeting...</p>

            <div style={styles.postActions}>
              <span>👍 25</span>
              <span>💬 8</span>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section style={styles.section}>
          <h3>Upcoming Events</h3>

          <div style={styles.eventCard}>
            <h4>Community Cultural Event</h4>
            <p>15 September 2026</p>
            <p>Pune</p>

            <button style={styles.button}>
              Join Event
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    backgroundColor: "#ffffff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },

  logo: {
    margin: 0,
    color: "#2563eb",
  },

  nav: {
    display: "flex",
    gap: "25px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  section: {
    marginTop: "30px",
  },

  hometown: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  communityCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  postCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  postTitle: {
    fontWeight: "bold",
  },

  postActions: {
    display: "flex",
    gap: "20px",
    marginTop: "15px",
  },

  eventCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  button: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Dashboard;