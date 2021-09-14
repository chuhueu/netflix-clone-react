import React, { useState, useEffect, useContext } from 'react';
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import './navbar.scss';
import { logout } from '../../authContext/AuthActions';

const Navbar = () => {
    //const { user } = useContext(AuthContext);
    const [kid, setKid] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const kidClick = () => {
        // if(user.isAdmin === false){
        //     setKid(true);
        // }
        // console.log(kid);
        setKid(!kid);
    }
    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            //làm mờ khi kéo xuống
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, [])

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    </Link>
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarmainLinks">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarmainLinks">Movies</span>
                    </Link>
                    <span >New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">

                    <div className="form-control">
                        <Link to="/search" className="link">
                            <Search className="icon" />
                        </Link>
                    </div>

                    <span className="kid" onClick={kidClick}>DVD
                    </span>
                    {kid && (
                        <p className="kid_access">You have to be User</p>
                    )}
                    <Notifications className="icon" />
                    <Link to="/edit">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt=""
                        />
                    </Link>
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={() => dispatch(logout())}>Logout</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
