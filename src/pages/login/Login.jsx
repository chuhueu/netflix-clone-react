import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import "./login.scss";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail, isEmpty } from 'validator';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, error } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    if (error) {
      const element = <p>Wrong password or username</p>
      ReactDOM.render(element, document.getElementById('error'));
    }
  };
  const required = (value) => {
    if (isEmpty(value)) {
      return <small className="form-text text-danger">This field is required</small>;
    }
  }

  const emaill = (value) => {
    if (!isEmail(value)) {
      return <small className="form-text text-danger">Invalid email format</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 6) {
      return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
    }
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/register">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>

        </div>
      </div>
      <div className="container">
        <Form >
          <h1>Sign In</h1>
          <Input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            validations={[required, emaill]}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            validations={[required, minLength]}
          />
          <button className="btn btn-info btn-block loginButton" onClick={handleLogin}>
            Sign In
          </button>
          {/* <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} /> */}
          <span>
            New to Netflix? <Link to="/register" style={{ textDecoration: "none" }}><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a href="https://www.google.com/recaptcha/about/" target="_blank" rel="noopener noreferrer" className="learn_more"><b>Learn more</b></a>
          </small>
        </Form>
        <div id="error"></div>
      </div>
    </div>
  );
}