import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-container">
      <div className="content-card">
        <h2>404 — Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>

        <Link to="/">
          <button type="button">Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
