import React, { useContext } from 'react';
import PlansScreen from './PlansScreen';
import './profileScreen.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';
function ProfileScreen() {
    const {user} = useContext(AuthContext);
    const {dispatch} = useContext(AuthContext);
    return (
        <div className="profileScreen">
            <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
            </Link>

            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img
                        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                        alt=""
                    />

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans (Current Plan: premium)</h3>
                            < PlansScreen />
                            <Link to="/login">
                                <button className="profileScreen__signOut" onClick={() => dispatch(logout())}>Sign Out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileScreen
