// import upVoteIcon from "../../assets/icons/upvote.svg";
// import upVotedIcon from "../../assets/icons/upvoted.svg";
// import downVoteIcon from "../../assets/icons/downvote.svg";
// import downVotedIcon from "../../assets/icons/downvoted.svg";
// import commentIcon from "../../assets/icons/comments.svg";
// import trashIcon from "../../assets/icons/trash.svg";
// import editIcon from "../../assets/icons/edit.svg";
// import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './post.css';
import "../Feed/HomePage/hompage.css";
import { fullPostToggle, setDelete } from "../../redux/navigateSlice";
import { addComment, downvotePost, upvotePost } from "../../redux/apiRequests";
import Comments from "../Comments/Comments";
import InputField from "../InputFields/Input";
import { useState } from "react";

const Post = (props) => {
    const { post, comments } = props;
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const user = useSelector((state) => state.user.user?.currentUser);
    const fullPost = useSelector((state) => state.nav.fullPost);
    const tags = ['None', 'NSFW', 'Mood', 'Quotes', 'Shitpost'];
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(
        setDelete({
            status: false,
            open: true,
            id: id,
        })
        );
  };

  const handleReadmore = (id) => {
    const setFullPost = {
      open: true,
      postId: id,
    };
    dispatch(fullPostToggle(setFullPost));
  };
  const closeFullPost = () => {
    const closePost = {
      open: false,
    };
    dispatch(fullPostToggle(closePost));
  };
  const handleUpVote = (id) => {
    const userId = {
      userId: user?._id,
    };
    upvotePost(dispatch, user?.accessToken, id, userId);
  };
  const handleDownVote = (id) => {
    const userId = {
      userId: user?._id,
    };
    downvotePost(dispatch, user?.accessToken, id, userId);
  };
  const handleComment = (event, id) => {
    event.preventDefault();
    const newComment = {
      content: comment,
      ownerId: user?._id,
    };
    setComment("");
    addComment(dispatch, user?.accessToken, id, newComment);
  };
    return ( 
      <div key={post?._id} className="post-container">
        {fullPost?.postId === post?._id && (
          <div className="close-post" onClick={closeFullPost}>
            Close
          </div>
        )};
      <div className="post-info">
        <div
          className="post-ava-container"
          style={{ backgroundColor: `${post?.theme}` }}
        >
          <img
            className="post-ava"
            src={post?.avaUrl}
            onClick={() => navigate(`/user/${post?.userId}`)}
            alt="post user img"
          />
        </div>
        <div className="post-author">
          u/{post?.username}
          <div className="post-time">{format(post?.createdAt)}</div>
        </div>
        {user?._id === post?.userId && (
          <div className="post-edit-delete">
            <img
              src={trashIcon}
              alt="delete"
              onClick={() => handleDelete(post?._id)}
            />
            <img src={editIcon} alt="delete" />
          </div>
        )}
      </div>
      <div className="post-context">
        <button className={`posts-tags-${tags[post?.tags]}`}>
          {" "}
          {tags[post?.tags]}
        </button>
        <div className="post-title">{post?.title}</div>
        {fullPost?.postId === post?._id ? (
          <></>
        ) : (
          post?.description?.length > 200 && (
            <span
              className="post-desc-readmore"
              onClick={() => handleReadmore(post?._id)}
            >
              Click to read more
            </span>
          )
        )}
        <div
          className={`${
            fullPost?.postId === post?._id ? "post-desc-full" : "post-desc"
          }`}
        >
          {post?.description}
        </div>
      </div>
      <div className="post-interactions">
        <div className="post-vote">
          <div className="upvote">
          {post?.upvotes.includes(user?._id) &&
            !post?.downvotes.includes(user?._id) ? (
              <img
                src={upVotedIcon}
                alt="upvoted icon"
                onClick={() => handleUpVote(post?._id)}
              />
            ) : (
              <img
                src={upVoteIcon}
                alt="upvote icon"
                onClick={() => handleUpVote(post?._id)}
              />
            )}
          </div>
          <div className="votes">
            {post?.upvotes?.length - post?.downvotes?.length}
          </div>
          <div className="downvote">
          {post?.downvotes.includes(user._id) &&
            !post?.upvotes.includes(user?._id) ? (
              <img
                src={downVotedIcon}
                alt="downvoted icon"
                onClick={() => handleDownVote(post?._id)}
              />
            ) : (
              <img
                src={downVoteIcon}
                alt="downvote icon"
                onClick={() => handleDownVote(post?._id)}
              />
            )}
          </div>
          <div className="comments">
          <img
              src={commentIcon}
              alt="comment icon"
              onClick={() => handleReadmore(post?._id)}
            />
          </div>
          <div className="comment-no"> {post?.comments} </div>
        </div>
        {fullPost?.postId === post?._id && (
          <div className="comments-opened">
            <div className="comments-title">All comments</div>
            {comments?.map((comment) => {
              return (
                <Comments
                  _id={comment._id}
                  postId={comment.postId}
                  ownerId={comment.ownerId}
                  username={comment.username}
                  avaUrl={comment.avaUrl}
                  theme={comment.theme}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  content={comment.content}
                />
              );
            })}
            <form
              className="comments-interact"
              onSubmit={(e) => handleComment(e, post?._id)}
            >
              <img
                src={user?.profilePicture}
                className="user-avatar"
                style={{ backgroundColor: `${user?.theme}` }}
                alt="user avatar"
              />
              <InputField
                data={comment}
                setData={setComment}
                type="text"
                placeholder="Add a comment"
                classStyle="comment-input"
              />
            </form>
          </div>
        )}
      </div>
    </div>
       
     );
}
 
export default Post;