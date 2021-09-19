import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ReactPlayer from 'react-player/lazy';
import './info.css';
const Info = () => {
    const [readMore, setReadMore] = useState(false);
    const location = useLocation();
    const movie = location.movie;
    console.log(movie);
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    return (
        <>
            <Navbar />
            <div className="coverWrapper">
                <div className="cover" style={{
                    backgroundImage: `url(${movie.imgBanner})`
                }}>
                    <div className="singleColumn">
                        <div className="posterWrapper">
                            <div className="poster-info">
                                <img
                                    src={movie.imgPoster}
                                    alt={movie.title}
                                />
                            </div>
                        </div>
                        <div className="detailWrapper">
                            <div className="detail">
                                <div className="title-info">
                                    <h2 className="">
                                        <p> {movie.title} ({movie.year}) </p>
                                    </h2>
                                    <div className="fact">
                                        <span className="certification">{movie.limit}</span>
                                        <span className="genre-info">
                                            <p>{movie.genre}, Romance</p>
                                        </span>
                                        <span className="runtime">{movie.duration}</span>
                                    </div>
                                </div>
                                <div className="action">
                                    <div className="playFilm">
                                        <Link to={{pathname: "/watch", movie: movie}}>
                                            <button className="info-btn btn-play">Play</button>
                                        </Link>
                                        <button className="info-btn btn-myList">
                                            Add to My List
                                        </button>
                                    </div>
                                    <div className="myList"></div>
                                </div>
                                <div className="headerInfo">
                                    <h3 className="tagLine">One question changes everything</h3>
                                    <h3 className="overview">Overview</h3>
                                    <p className="des">
                                        {truncate(movie.description, 50)}
                                    </p>
                                    <p className="responsive">
                                        {readMore ? movie.description : truncate(movie.description, 150)}
                                        <button onClick={() => setReadMore(!readMore)}>
                                            {readMore ? "show less" : "read more"}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trailer">
                <ReactPlayer
                    controls playing={true} loop={true}
                    url={movie.video}
                    className="video"
                    width='100%'
                    height='100%'
                />
            </div>
            <Footer />
        </>
    )
}

export default Info
