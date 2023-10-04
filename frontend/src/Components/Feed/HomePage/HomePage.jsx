import FeedLayout from "../Layout/FeedLayout";
import "./homepage.css";
import "../../Posts/post.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/apiRequests";
import Popup from "../Popup/Popup";
import Posts from "../../Posts/Post";
import FullPost from "../../Posts/FullPost/FullPost";
import { useCallback } from "react";

const HomePage = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const createPost = useSelector((state) => state.post.createPost);
  const fullPost = useSelector((state) => state.nav.fullPost);
  const allComments = useSelector((state) => state.comment.addComments);
  const deleteComment = useSelector((state) => state.comment.deleteComments);
  const interactPost = useSelector((state) => state.post.interactPost)
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const [deletedPostId, setDeletedId] = useState([]);
  const isDelete = useSelector((state) => state.nav.deleteState);
  const deletePost = useSelector((state) => state.post.deletePost);
  const [filter, setFilters] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const loading = useSelector((state) => state.post.allPosts?.pending);
  const observer = useRef();
  const filteredPost = allPosts?.filter(
    (post) => !deletedPostId.includes(post._id)
  );
  const dispatch = useDispatch();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    getAllPosts(dispatch, user?.accessToken, filter, pageNumber, setHasMore);
    console.log("rendered");
  }, [user, filter, createPost, allComments, dispatch, deleteComment, interactPost, pageNumber,]);

  const handleFilters = (e) => {
    setFilters(e.target.value);
  };

  return (
    <FeedLayout>
      <section className="homepage-container">
        {!isDelete.open && (
          <select className="filter-posts" onChange={handleFilters}>
            <option disabled value="">
              SORT POSTS BY
            </option>
            <option value=""> 🤩 NEW</option>
            <option value="hot"> 🔥 HOT</option>
          </select>
        )}
        <div className="popup">
          {isDelete.open && (
            <Popup
              deletedPostId={deletedPostId}
              setDeletedPostId={setDeletedId}
              h1="Are you sure?"
              h2="You cannot restore posts that have been deleted"
              button1="Go Back"
              button2="Delete"
            />
          )}
        </div>
        <div className="homepage-post">
          {fullPost.open && <FullPost />}
          {filteredPost?.map((post, idx) => {
            if (filteredPost.length === idx + 1) {
              return <Posts ref={lastPostRef} post={post} />;
            }
            return <Posts post={post} />
          })}
        </div>
      </section>
    </FeedLayout>
  );
};

export default HomePage;