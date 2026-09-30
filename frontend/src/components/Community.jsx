import Posts from "./Posts.jsx";

function Community() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Pune Community</h1>
      <p>1,250 Members</p>

      <button>Join Community</button>

      <h2>About</h2>
      <p>
        People from Pune and surrounding areas can connect
        and share updates.
      </p>

      <h2>Rules</h2>
      <ol>
        <li>Respect everyone.</li>
        <li>No spam.</li>
        <li>Keep discussions relevant.</li>
      </ol>

      <h2>Community Posts</h2>

      <Posts />
    </div>
  );
}

export default Community;