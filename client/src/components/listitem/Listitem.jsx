import "./listitem.scss";
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    FiberManualRecord,
    KeyboardArrowDown,
    CheckOutlined
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import axios from '../../axios';
import { Link } from 'react-router-dom';
const Listitem = ({ index, item, addMyListClick, removeMyListClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState([]);
    //const [delayHandler, setDelayHandler] = useState(null);
    const [check, setCheck] = useState(false);
    const handleMouseEnter = () => {
        // setDelayHandler(setTimeout(() => {
        //     setIsHovered(true);
        // }, 100))
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
        //clearTimeout(delayHandler);
    }


    useEffect(() => {
        setTimeout(() => {
            const getMovie = async () => {
                try {
                    const res = await axios.get("movies/find/" + item, {
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
        }, 1000);
    }, [item]);

    return (
        // <Link to={{ pathname: "/info", movie: movie }}>
        <div
            className="listItem"
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={movie?.imgSm} alt={movie?.title} className="poster" />
            {isHovered && (
                <>
                    <ReactPlayer
                        controls playing={true} loop={true}
                        //url={movie.trailer}
                        className="trailer"
                        width='100%'
                        height='60%'
                    />
                    <div className="itemInfo">
                        <div className="icons">
                            <Link to={{ pathname: "/watch", movie: movie }}>
                                <PlayArrow className="icon play" />
                            </Link>
                            {/* <Add className="icon add" /> */}
                            {check ?
                                <CheckOutlined
                                    className="icon"
                                    onClick={() => removeMyListClick(movie, setCheck(!check))}
                                /> :
                                <Add
                                    className="icon add"
                                    onClick={() => addMyListClick(movie, setCheck(!check))}
                                />
                            }
                            <ThumbUpAltOutlined className="icon like" />
                            <ThumbDownOutlined className="icon dislike" />
                            <Link to={{ pathname: "/info", movie: movie }} className="link">
                                <KeyboardArrowDown className="icon moreInfo" />
                            </Link>
                        </div>
                        <div className="itemInfoTop">
                            <span className="rate">{movie.rate}</span>
                            <span className="duration">{movie.duration}</span>
                            <div className="limit">{movie.limit}</div>
                            <span>{movie.year}</span>
                        </div>
                        <div className="itemInfoDown">
                            <h4 className="title">{movie.title}</h4>
                            <FiberManualRecord className="dot" />
                            <span className="genre">{movie.genre}</span>
                        </div>
                    </div>
                </>
            )}

        </div>
        //</Link>

    )
}

export default Listitem
