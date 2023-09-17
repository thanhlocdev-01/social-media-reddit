import { updateStart, updateError, updateSuccess } from "./userSlice";
import axios from 'axios';
import { 
  loginFailed, 
  loginStart, 
  loginSuccess, 
  registerFailed, 
  registerStart, 
  registerSuccess 
} from "./authSlice";
import {
  getAllPostFailed,
  getAllPostStart,
  getAllPostSuccess,
} from "./postSlice";

export const updateUser = async (user, dispatch) => {
    dispatch(updateStart());
    try {
        const res = await axios.post("/v1/update", user);
        dispatch(updateSuccess(res.data));
    } catch (error) {
        dispatch(updateError());
    }
};
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("/v1/auth/login", user);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch {
      dispatch(loginFailed());
    }
  };
  
  export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
      await axios.post("/v1/auth/register", user);
      dispatch(registerSuccess());
      navigate("/login");
    } catch (err) {
      console.log(err);
      dispatch(registerFailed("Something is wrong"));
    }
  };

  export const getAllPosts = async (dispatch, token) => {
    dispatch(getAllPostStart());
    try {
      const res = await axios.get("/v1/post/", {
        headers: {token: `Bearer ${token}`},
      });
      dispatch(getAllPostSuccess(res.data));
    } catch (err) {
      dispatch(getAllPostFailed());
    }
  };