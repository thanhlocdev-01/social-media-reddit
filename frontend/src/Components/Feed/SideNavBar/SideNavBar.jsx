import { Link } from "react-router-dom";

import "./navbar.css";
const SideNavBar = (props) => {
  const { id } = props;
  return (
    <nav className="navbar-container">
      <div className="navbar-profile">
        <Link to={`/user/${id}`}>
          My profile 
        </Link>
      </div>
      <div className="navbar-saved">
        <Link to={`/user/${id}/saved`}>
          Saved{" "}
        </Link>
      </div>
      <div className="navbar-logout">
        <Link to={`/logout`}>
          Log out{" "}
        </Link>
      </div>
    </nav>
  );
};

export default SideNavBar;