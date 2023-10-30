import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listContainer } from "../../utils/listContainer";
import "./edit.css";
import InputField from "../InputFields/Input";
import { updateUser } from "../../redux/apiRequests";

const EditPage = (props) => {
  const { setEdit } = props;
  const { id } = useParams();
  const avaUrl = listContainer.avaUrl;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.currentUser);
  const [name, setName] = useState(user?.displayName);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [theme, setTheme] = useState(user?.theme);
  const [url, setUrl] = useState(user.avaUrl);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    const updatedUser = {
      displayName: name,
      age: age,
      about: about,
      profilePicture: url,
      theme: theme,
    };
    updateUser(dispatch, updatedUser, id, user?.accessToken);
  };
  const changeAvatar = (e, idx) => {
    setUrl(e.target.src);
    setSelectedIdx(idx);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="edit-form"
        data-testid="editForm">
        <section className="edit-container">
          <div className="close-container">
            <p className="close-x" onClick={() => setEdit(false)}>
              X
            </p>
            <button type="submit" className="close">
              SAVE
            </button>
          </div>
          <div className="edit-profile">Edit Profile</div>
          <div className="input-container">
            <InputField
              label="Display name"
              type="text"
              data={user.name}
              setData={setName}
            />
            <InputField
              label="Age"
              type="text"
              data={user.age}
              setData={setAge}
            />
            <InputField
              inputType="textarea"
              data={user.about}
              setData={setAbout}
              classStyle="input-about"
              label="About"
            />
            <label>Profile Picture</label>
            <div className="input-image-container">
              {avaUrl.map((url, idx) => {
                return (
                  <>
                    <img
                      onClick={(e) => changeAvatar(e, idx)}
                      className={`${
                        selectedIdx === idx
                          ? `input-image-selected`
                          : `input-image`
                      }`}
                      src={url}
                      alt=""
                    />
                  </>
                );
              })}
            </div>
            <div className="theme-container">
              <label>Theme</label>
              <input
                type="color"
                className="theme-color"
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default EditPage;
