import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './search.scss';

const Search = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const searchMovie = async () => {
                try {
                    const res = await axios.get(`/movies/search?title=${searchTerm}`);
                    setMovies(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
            searchMovie();
        } else {
            setMovies([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (movies) {
            setShowSearch(true);
        }
        if(movies === []){
            setShowSearch(false);
        }
    },[movies])

    return (
        <>
            <div>
                <Navbar />
                <form className="search-form"
                    onSubmit={(e) => e.preventDefault()}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                    <input type="search" className="search" placeholder="Titles, people, genre" />
                </form>
            </div>
            <div className="listitem">
                {!showSearch ? <h1>No Found</h1> :
                    movies.map((movie) => {
                        return (
                            <Link to={{ pathname: '/info', movie: movie }}>
                                <img src={movie.imgSm} alt={movie.title} className="poster" key={movie._id} />
                            </Link>
                        )
                    })
                }
                {/* {movies.map((movie) => {
                    return (
                        <Link to={{pathname: '/watch', movie: movie }}>
                            <img src={movie.imgSm} alt={movie.title} className="poster" key={movie._id}/>
                        </Link>
                    )
                })} */}
            </div>
        </>
    )
}

export default Search
