import React from 'react'
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player/lazy';
import "./watch.scss";

const Watch = () => {
    const location = useLocation();
    const movie = location.movie;
    console.log(location);
    return (
        <div className="watch">
           <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                   Home
                </div>
            </Link>
            <ReactPlayer
                controls playing={true} loop={true}
                url = {movie.video}
                className="video"
                width='70%'
                height='70%'
            />
        </div>
    )
}

export default Watch
