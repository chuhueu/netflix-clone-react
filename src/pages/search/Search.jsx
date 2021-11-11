import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from '../../axios';
import { Link } from 'react-router-dom';
import './search.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Search = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
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
        if (movies === []) {
            setShowSearch(false);
        }
    }, [movies])

    return (
        <>
            <div>
                <Navbar />
                <form className="search-form"
                    onSubmit={(e) => e.preventDefault()}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                    <input type="search" className="search" placeholder="Titles, People, Genre ..." />
                </form>
            </div>
            <div className="listitem">
                {!showSearch ? <h1>Not Found</h1> :
                    movies.map((movie) => {
                        return (
                            <>
                                {!user ? (
                                    <Popup
                                        trigger={
                                            <img src={movie.imgSm} alt={movie.title} key={movie._id} className="poster" />
                                        }
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
                                    <Link to={{ pathname: '/info/' + movie._id, movie: movie }}>
                                        <img src={movie.imgSm} alt={movie.title} key={movie._id} className="poster" />
                                    </Link>
                                )}
                            </>
                        )

                    })
                }
            </div>
        </>
    )
}

export default Search
