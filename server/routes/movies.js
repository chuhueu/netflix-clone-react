const router = require("express").Router();
const Movie = require("../models/Movie");

//CREATE
router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const sendMovie = await newMovie.save();
    res.status(201).json(sendMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE COMMENT
router.put("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateComment = await Movie.findByIdAndUpdate(
      id,
      // {$push: {
      //   "comments": req.body.comments
      // }},
      {$push: {
        "comments": {
          username: req.body.comments.username,
          comment: req.body.comments.comment,
          image: req.body.comments.image
        }
      }},
      {new: true,}
    );
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("the movie has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ALL
router.get("/", async (req, res) => {
  try {
    const getMovies = await Movie.find();
    res.status(200).json(getMovies.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET FIND ID
router.get("/find/:id", async (req, res) => {
  try {
    const getMovie = await Movie.findById(req.params.id);
    res.status(200).json(getMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET FIND BY NAME
//req.query chứa các tham số truy vấn URL (sau phần ?trong URL).
router.get("/search", async (req, res) => {
  try {
    const searchFiled = req.query.title;
    const searchMovie = await Movie.find({
      title: { $regex: searchFiled, $options: "$i" },
    });
    res.status(200).json(searchMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RANDOM
router.get("/random", async (req, res) => {
  //const type = req.query.type;
  let movie;
  try {
    // if (type === "series") {
    //   movie = await Movie.aggregate([   //$match : chọn document mong muốn truy vấn.
    //     { $match: { isSeries: false } },
    //     { $sample: { size: 1 } },
    //   ]);
    // }else{
    //   movie = await Movie.aggregate([
    //     { $match: { isSeries: true } },
    //     { $sample: { size: 1 } },
    //   ]);
    // }
    movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
