import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Rating.css';
import axios from "../../axios";
const Rating = ({movieID, star}) => {
    const [rating, setRating] = useState(star);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        const putStar = async () => {
            try {
                const res = await axios.put("movies/"+movieID, {
                    headers: {
                        token:
                        "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                      },
                    star: rating
                })
                setRating(res.data.star);
            } catch (error) {
                console.log(error);
            }
        }
        putStar();
    },[movieID,rating])

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return <label>
                    <input type="radio" name="rating" value={ratingValue}
                        onClick={() => setRating(ratingValue)} />
                    <FaStar
                        className='star'
                        size={38}
                        color={ratingValue <= (hover || rating) ? "#20c073" : "#e4e5e9"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>

            })}
        </div>
    )
}

export default Rating
