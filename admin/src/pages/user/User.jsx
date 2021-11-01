import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";
import { useContext, useState, useEffect } from "react";
import axios from "../../axios";

export default function User() {
  const [user, setUser] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/find/" + params.userId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  },[params])
  const {dispatch} = useContext(UserContext);
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({...user, [e.target.name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user._id, dispatch, user);
    alert("Edit successfully");
    window.location.reload(false);
  }
   return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user._id}r</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{new Date(user.createdAt).toLocaleDateString("en-US")}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  className="userUpdateInput"
                  onChange = {handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  className="userUpdateInput"
                  onChange = {handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <input
                  type="text"
                  name="isAdmin"
                  value={user.isAdmin}
                  className="userUpdateInput"
                  onChange = {handleChange}
                />
            </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={handleSubmit} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
