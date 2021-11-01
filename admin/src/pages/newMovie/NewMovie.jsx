import "./newMovie.css";
import { useState, useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCalls";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      createMovie(movie, dispatch);
      alert("Add successfully!")
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} />
          </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="description" placeholder="Description" onChange={handleChange}/>
        </div>
          <label>Image Banner</label>
          <input
            type="text"
            name="imgBanner"
            placeholder="imgBanner"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image Sm</label>
          <input
            type="text"
            name="imgSm"
            placeholder="imageSm"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image Poster</label>
          <input
            type="text"
            name="imgPoster"
            placeholder="imgPoster"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
            <label>Trailer</label>
            <input type="text" name="trailer" placeholder="Trailer" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Video</label>
            <input type="text" name="video" placeholder="Video" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Year</label>
            <input type="text" name="year" placeholder="Year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Limit</label>
            <input type="text" name="limit" placeholder="Limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Genre</label>
            <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Cast</label>
            <input type="text" name="cast" placeholder="Cast" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Duration</label>
            <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Rate</label>
            <input type="text" name="rate" placeholder="Rate" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
