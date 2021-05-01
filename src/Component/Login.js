import React, { useState } from "react";
import { useHistory } from "react-router";
import "../CSS/login.css";
import { useDispatch } from "react-redux";
import { actionTypes } from "../_redux/rootReducer";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const generate_token = (length) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
      ""
    );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  };

  const signIn = (event) => {
    event.preventDefault();
    let token = generate_token(32);
    let userDetails = {
      name,
      email,
    };

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("authToken", token);
      let data = {
        userDetails,
        token,
      };
      dispatch({
        type: actionTypes.SET_USER,
        data: data,
      });

      history.push("/");
    }, 500);
  };
  return (
    <div className="login">
      <div className="login__container">
        <h2>Sign-in</h2>

        <form onSubmit={signIn}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login__signInButton">
            {loading ? <div className="spinner-border"></div> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
