// import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from '../../axios';
import ReactDOM from 'react-dom'
import "./register.scss";

export default function Register() {
  const [listUser, setListUser] = useState([]);
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    const getListUser = async () => {
      try {
        const res = await axios.get("users");
        setListUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getListUser();
  },[])

  const handleStart = () => {
    setEmail(emailRef.current.value);
    let str = "";
    listUser.map((list) => {
      str += list.email;
    })
    let checkEmail= str.includes(emailRef.current.value);
    if(checkEmail === true){
      const element = <p>Email already registered! Please, try again</p>
      ReactDOM.render(element, document.getElementById('errorEmail'));
    }else{
      setCheck(false);
      ReactDOM.render(<p></p>, document.getElementById('errorEmail'));
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    let str = "";
    listUser.map((list) => {
      str += list.username;
    })
    let checkUsername= str.includes(usernameRef.current.value);
    if(checkUsername === true){
      setCheck(false);
      const element = <p>Username already registered! Please, try again</p>
      ReactDOM.render(element, document.getElementById('errorUsername'));
    }
    try {
      await axios.post("auth/register", { email: email, username: usernameRef.current.value, password: passwordRef.current.value });
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            onClick={() => setCheck(true)}
          />
          <Link to="/login"><button className="loginButton">Sign In</button></Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {(check) ? (
          <>
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
          <div id="errorEmail"></div>
          </>
        ) : (
          <>
          <form className="input">
            <input type="username" placeholder="Username" ref={usernameRef} style={{marginRight: "3px"}}/>
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
          <div id="errorUsername"></div>
          </>
        )}
      </div>
    </div>
  );
}
