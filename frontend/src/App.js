import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Auth/login";
import Register from "./Components/Auth/Register";
import HomePage from "./Components/Feed/HomePage/HomePage";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import News from "./Components/Feed/News/News";

function App() {
  const [isEdit, setEdit] = useState(false);
  const [isOpenPost, setOpen] =  useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/news"
            element={
              <RequireAuth>
                <News />
              </RequireAuth>
            }
          />
          <Route
            path="/user/:id"
            element={
              <RequireAuth>
                <UserProfile
                  isEdit={isEdit}
                  setEdit={setEdit}
                  isOpenPost={isOpenPost}
                  setOpen={setOpen}
                />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
