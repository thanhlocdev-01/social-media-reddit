import { useDispatch, useSelector } from "react-redux";
import EditPage from "../Edit/EditPage";
import Footer from "../Footer/Footer";
import Header from "../Feed/Header/Header";
import MakePost from "../Posts/MakePost";
import Posts from "../Posts/Post";
import "../../App.css";
import Popup from "../Feed/Popup/Popup";
import { useEffect } from "react";
import { getUserPost } from "../redux/apiRequests";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  const { isEdit, setEdit } = props;
  const { id } = useParams();
  const post = useSelector((state) => state.post.userPost?.posts);
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const isDelete = useSelector((state) => state.nav.deleteState);
  const interactPost = useSelector((state) => state.post.interactPost);
  const user = useSelector((state) => state.user.user?.currentUser);
  const deletePost = useSelector((state) => state.post.deletePost);
  const createPost = useSelector((state) => state.post.createPost);
  const pending = useSelector((state) => state.user.user.pending);
  const error = useSelector((state) => state.user.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPost(dispatch, user?.accessToken, id);
  }, [dispatch, user, id, deletePost, createPost, interactPost]);

  return (
    <section className="userProfile-container">
      {isEdit ? (
        <EditPage setEdit={setEdit} data-testid="editPage" />
      ) : !isEdit && !isOpenPost ? (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />
          <div className="popup">
            {isDelete?.open && (
              <Popup
                h1="Are you sure?"
                h2="You cannot restore posts that have been deleted"
                button1="Go Back"
                button2="Delete"
              />
            )}
          </div>
          {post?.map((post) => {
            return <Posts post={post} />;
          })}
          <Footer />
        </>
      ) : (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />
          <MakePost />
          <Footer />
        </>
      )}
      {pending && <p className="loading"> Loading... </p>}
      {!isEdit && error && (
        <p className="error"> Errors when fetching data from server </p>
      )}
    </section>
  );
};

export default UserProfile;