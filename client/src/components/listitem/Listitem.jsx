import "./listitem.scss";
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    FiberManualRecord
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
import debounce from 'debounce';
import { Link } from 'react-router-dom'
const Listitem = ({ index, item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + item,{
                    headers: {
                      token:
                      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  });
                setMovie(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    }, [item])

    return (
        <Link to={{pathname: "/watch", movie: movie}}>
            <div
                className="listItem"
                style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie?.imgSm} alt="" className="poster" />
                {isHovered && (
                    <>
                        <ReactPlayer
                            controls playing={true} loop={true}
                            url={movie.trailer}
                            className="trailer"
                            width='100%'
                            height='60%'
                        />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon play" />
                                <Add className="icon add" />
                                <ThumbUpAltOutlined className="icon like" />
                                <ThumbDownOutlined className="icon dislike" />
                                <p>Add to My List</p>
                                <p>I like this</p>
                                <p>Not for me</p>
                            </div>
                            <div className="itemInfoTop">
                                <span className="rate">{movie.rate}</span>
                                <span className="duration">{movie.duration}</span>
                                <div className="limit">{movie.limit}</div>
                                <span>{movie.year}</span>
                            </div>
                            <div className="itemInfoDown">
                                <h4 className="title">{movie.title}</h4>
                                <FiberManualRecord className="dot"/>
                                <span className="genre">{movie.genre}</span>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </Link>

    )
}

export default Listitem
