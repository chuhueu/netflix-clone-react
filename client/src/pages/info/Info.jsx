import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "../../axios";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ReactPlayer from 'react-player/lazy';
import Rating from '../../components/rating/Rating';
import Comment from '../../components/comment/Comment';
import Circle from 'react-circle';
import './info.css';
import { FavouriteContext } from "../../favouriteContext/FavouriteContext";
const Info = () => {
    const [movie, setMovie] = useState({});
    const { addMovieToWatchList, watchList } = useContext(FavouriteContext);
    const [readMore, setReadMore] = useState(false);
    const params = useParams();
     useEffect(() => {
         const getMovie = async () => {
             try {
                 const res = await axios.get("movies/find/" + params.infoID, {
                     headers: {
                         token:
                             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                     },
                 });
                 setMovie(res.data);
             } catch (error) {
                 console.log(error);
             }
         }
         getMovie();
     },[params.infoID]);
    //const rate = movie.rate.split("%");
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    let storedMovie = watchList.find((o) => o._id === movie._id);
    const watchListDisable = storedMovie ? true : false;

    return (
        <>
        {console.log(parseInt(movie.rate))}
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
                                        <Link to={{ pathname: "/watch/" + movie._id, movie: movie }}>
                                            <button className="info-btn btn-play">Play</button>
                                        </Link>
                                        <button
                                            className="info-btn btn-myList"
                                            onClick={() => addMovieToWatchList(movie)}
                                            disabled={watchListDisable}
                                        >
                                            Add to My List
                                        </button>
                                    </div>
                                    <div className="ratingSection">
                                        <h2>Rate this film</h2>
                                        <Rating movieID={movie._id} star={movie.star} />
                                    </div>
                                    <div className="averageSection">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="1s" //String: Length of animation
                                            responsive={false} // Boolean: Make SVG adapt to parent size
                                            size={68} // Number: Defines the size of the circle.
                                            lineWidth={28} // Number: Defines the thickness of the circle's stroke.
                                            progress={parseInt(movie.rate)} // Number: Update to change the progress and percentage.
                                            progressColor="#20c073"  // String: Color of "progress" portion of circle.
                                            bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                                            textColor="#20c073" // String: Color of percentage text color.
                                            textStyle={{
                                                font: 'bold 7rem Arial' // CSSProperties: Custom styling for percentage.
                                            }}
                                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                            roundedStroke={false} // Boolean: Rounded/Flat line ends
                                            showPercentage={true} // Boolean: Show/hide percentage.
                                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                        />
                                        <div className='averageTitles'>
                                            <h2>Average Rating</h2>
                                        </div>
                                    </div>
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
                    url={movie.trailer}
                    className="video"
                    width='100%'
                    height='100%'
                />
            </div>
            <Comment movieID = {movie._id}/>
            <Footer />
        </>
    )
}

export default Info
