import React from "react";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Featured = ({ type, setGenre }) => {
    const [movie, setMovie] = useState([]);
    const [readMore, setReadMore] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(!user);
    useEffect(() => {
        const getRandomMovie = async () => {
            try {
                const res = await axios.get(`movies/random?type=${type}`);
                setMovie(res.data[0]);
            } catch (error) {
                console.log(error);
            };
        };
        getRandomMovie();
    }, [type]);
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
    return (
        <>
            <header className="featured" style={{
                backgroundSize: "cover",
                backgroundImage: `url("${movie.imgBanner}")`,
                backgroundPosition: "center center",
            }}>
                {type && (
                    <div className="category">
                        <span>{type === "movie" ? "Movies" : "Series"}</span>
                        <select
                            name="genre"
                            id="genre"
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )}
                {/* <img src={movie.imgBanner} alt="" /> */}
                <div className="info">
                    <h1 className="banner_title">{movie.title}</h1>
                    <span className="desc">
                        {readMore ? movie.description : truncate(movie.description, 150)}
                        <button onClick={() => setReadMore(!readMore)}>
                            {readMore ? "show less" : "read more"}
                        </button>
                    </span>
                    <div className="buttons">
                        {!user ? (
                            <Popup
                                trigger={
                                    <button className="play">
                                        <PlayArrow />
                                        <span>Play</span>
                                    </button>}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header">Notification</div>
                                        <div className="content">
                                            Please register or sign in to use this function
                                        </div>
                                        <div className="actions">
                                            <Link to="/register"
                                                className="button"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        ) : (
                            <>
                                <Link to={{ pathname: "/watch/" + movie._id, movie: movie }} className="link">
                                    <button className="play">
                                        <PlayArrow />
                                        <span>Play</span>
                                    </button>
                                </Link>
                            </>
                        )}
                        {!user ? (
                            <Popup
                                trigger={
                                    <button className="more">
                                        <InfoOutlined />
                                        <span>Info</span>
                                    </button>}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header">Notification</div>
                                        <div className="content">
                                            Please register or sign in to use this function
                                        </div>
                                        <div className="actions">
                                            <Link to="/register"
                                                className="button"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        ) : (
                            <Link to={{ pathname: "/info/" + movie._id, movie: movie }} className="link">
                                <button className="more">
                                    <InfoOutlined />
                                    <span>Info</span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                {/* <div className="banner--fadeBottom"></div> */}
            </header>
        </>
    )
}

export default Featured
