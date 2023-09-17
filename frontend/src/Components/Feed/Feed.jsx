import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./FeedSidebar"
import FeedHeader from "./Header/FeedHeader";
import "./feed.css";

const Feed = (props) => {
  const {isOpenSide, setOpenSide} = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user && (
        <>
          <div className={`${isOpenSide ? "feed-sidebar-opened" : "feed-sidebar"}`}>
            <SideBar setOpen={setOpenSide} />
          </div>
          <section className={`${isOpenSide ? "feed-container-opened" : "feed-container"}`}>
            <FeedHeader setOpen={setOpenSide} isOpen={isOpenSide} />
          </section>
        </>
      )}
    </>
  );
};

export default Feed;