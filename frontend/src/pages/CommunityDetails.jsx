import { Link, useParams } from "react-router-dom";

function CommunityDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Community Details</h1>

      <p>Community ID: {id}</p>

      <Link to="/communities">
        <button>Back to Communities</button>
      </Link>
    </div>
  );
}

export default CommunityDetails;