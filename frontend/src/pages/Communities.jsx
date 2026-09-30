import { Link } from "react-router-dom";

function Communities() {
  return (
    <div>
      <h1>Communities</h1>

      <p>Explore hometown communities.</p>

      <Link to="/communities/1">
        <button>View Pune Community</button>
      </Link>

      <Link to="/communities/2">
        <button>View Mumbai Community</button>
      </Link>
    </div>
  );
}

export default Communities;