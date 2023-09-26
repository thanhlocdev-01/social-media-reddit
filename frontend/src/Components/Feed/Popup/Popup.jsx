import { useEffect } from "react";
import "./popup.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/apiRequests";
import {setDelete} from "../../redux/navigateSlice";

const Popup = (props) => {
  const { h1, h2, button2 } = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const isDelete = useSelector((state) => state.nav.deleteState)
  const handleDelete = () => {
    dispatch(
      setDelete({
        status: false,
        open: false,
      })
    );
  };
  const closePopup = () => {
    dispatch(
      setDelete({
        status: false,
        open: false,
      })
    );
  };
  useEffect(() => {
    console.log(isDelete);
  }, [isDelete]);
  return (
    <section className="popups-overlay">
      <div className="popups-container">
        <div className="popups-close" onClick={closePopup}>
          X
        </div>
        <div className="popups-h1">{h1}</div>
        <div className="popups-h2">{h2}</div>
        <button className="delete" onClick={handleDelete}>
          {" "}
          {button2}{" "}
        </button>
      </div>
    </section>
  );
};

export default Popup;