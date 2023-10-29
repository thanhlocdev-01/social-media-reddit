import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FiStar } from "react-icons/fi";
import {BiExit} from "react-icons/bi";
import { logOutUser } from "../../../redux/apiRequests";
import "./navbar.css";

const SideNavBar = (props) => {
  const { id } = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    logOutUser(dispatch, user?.accessToken, user?._id, navigate);
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-profile">
        <Link to={`/user/${id}`}>
          <CgProfile size="24px" color="grey" className="navbar-profile-icon" />
          My profile 
        </Link>
      </div>
      <div className="navbar-saved">
        <Link to={`/user/${id}/favorites`}>
          <FiStar color="grey" size="24px" className="navbar-saved-icon"/>
          Favorites
        </Link>
      </div>
      <div className="navbar-logout" onClick={logOut}>
        <BiExit color="grey" size="24px" className="navbar-logout-icon"/>
        Log out{" "}
      </div>
    </nav>
  );
};

export default SideNavBar;