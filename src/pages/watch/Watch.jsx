import React, {useState, useEffect} from 'react'
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import axios from '../../axios';
import ReactPlayer from 'react-player/lazy';
import "./watch.scss";

const Watch = () => {
    const [movie, setMovie] = useState({});
    const params = useParams();
    console.log(params.watchID);
     useEffect(() => {
         const getMovie = async () => {
             try {
                 const res = await axios.get("movies/find/" + params.watchID, {
                     headers: {
                         token:
                             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                     },
                 });
                 setMovie(res.data);
                 console.log(res.data);
             } catch (error) {
                 console.log(error);
             }
         }
         getMovie();
     },[params.watchID]);
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
                width='100%'
                height='100%'
            />
        </div>
    )
}

export default Watch
