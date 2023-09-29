import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../redux/apiRequests";
import InputField from "../InputFields/Input";
import "./login.css";

const Login = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const {state} = useLocation();
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate, state);
  };

  useEffect(() => {
    if (user){
      navigate(state?.path ||"/");
    }
  }, []);
  return (
    <section className="login-container">
      <div className="login-title"> Log in </div>
      <div className="login-input">
        <form onSubmit={handleLogin}>
          <InputField
            data={username}
            type="text"
            placeholder="Enter username"
            setData={setUsername}
            label="USERNAME"
            classStyle="login-username"
          />
          <InputField
            data={password}
            type="password"
            placeholder="Enter password"
            setData={setPassword}
            label="PASSWORD"
            classStyle="login-password"
          />
          <button type="submit"> Continue </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register one for free
        </Link>
      </div>
    </section>
  );
};

export default Login;