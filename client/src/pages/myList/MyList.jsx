import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import {
    PlayArrow,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    FiberManualRecord,
    KeyboardArrowDown,
    CheckOutlined
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import "./myList.scss";
import ReactPlayer from 'react-player/lazy';
const MyList = ( ) => {
    const movies = JSON.parse(localStorage.getItem("my-list"));
    const [myList, setMyList] = useState(movies);
    const saveToLocalStorage = (items) => {
        localStorage.setItem('my-list', JSON.stringify(items));
    };
    const removeMyList = (movie) => {
        const newMyList = myList.filter(
            (list) => list._id !== movie._id
        );
        setMyList(newMyList);
        saveToLocalStorage(newMyList);
    };
    console.log(myList);
    return (
        <>
            <Navbar />
            <h1 className="title-list">My List</h1>
            <div className="my-list">
                {movies.map((movie) => (
                    <div className="show-list" >
                        <Link to={{pathname: "/info", movie: movie}}>
                            <img src={movie.imgSm} alt={movie.title} className="poster" />
                        </Link>
                        <div className="itemInfo">
                            <div className="icons">
                                <Link to={{ pathname: "/watch", movie: movie }}>
                                    <PlayArrow className="icon play" />
                                </Link>
                                <CheckOutlined className="icon add" onClick={() => removeMyList(movie)} />
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
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyList
