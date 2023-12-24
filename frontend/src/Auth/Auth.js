import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

const AuthenticationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/inventory");
  };

  return (
    <div className="auth">
      <link
        href="https://fonts.googleapis.com/css2?family=Dosis&family=Fuggles&family=Mooli&family=Pacifico&family=Poppins&display=swap"
        rel="stylesheet"
      />
      <div className="auth-header">
        <h2>Login</h2>
      </div>

      <div className="auth-form">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={redirect}
              disabled={!username || !password}
              className="auth-button"
            >
              Login
            </button>
          </div>
          <div className="form-group">
            <button type="button" onClick={redirect} className="auth-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
