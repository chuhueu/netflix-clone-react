import React, { useEffect, useState } from 'react'
import './comment.scss'
import { FaArrowUp } from 'react-icons/fa';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
const Comment = () => {
    const [comment, setComment] = useState([]);
    const [displayComment, setDisplayComment] = useState([]);
    const params = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleChange = (e) => {
        const value = e.target.value;
        setComment(value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("/movies/comment/" + params.infoID, {
                headers: {
                    token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
                comments: {
                    username: user.username,
                    comment: comment,
                    image: user.profilePic
                }
            })
            console.log(res.data.comments);
            setDisplayComment(res.data.comments)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get("/movies/find/" + params.infoID, {
                    headers: {
                        token:
                            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                })
                setDisplayComment(res.data.comments);
            } catch (error) {
                console.log(error);
            }
        }
        getComments();
    }, [params]);
    return (
        <div className="comment">
            <h2 className="tittle">Comments </h2>
            {displayComment && displayComment.map((item) => {
                return <div className='commentList' key={item._id} >
                    <div className='avatar'>
                        <img className='image' src={item.image} alt={item.username} />
                    </div>
                    <div className='commentSection'>
                        <h4 className="name">
                            {item.username}
                        </h4>
                        <p className='comments'> {item.comment}</p>
                    </div>
                </div>
            })}
            <div className="userCard">
                <div className="userAvatar">
                    <img className='image' src={user.profilePic} alt="" />
                </div>
                <form className="commentSection" autocomplete="off">
                    <input
                        autocomplete="false"
                        type="text"
                        name="comment"
                        id="userComment"
                        placeholder='Submit a comment here...'
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} className="submitSection">
                        <FaArrowUp />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Comment

