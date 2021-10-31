const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String },
    imgBanner: { type: String },
    imgPoster: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    duration: { type: String },
    rate: { type: String },
    star: { type: Number },
    cast: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    //comments: { type: [String], default: [], required: true },
    comments: {
      username: { type: String, required:true },
      comment: { type: String, required: true },
      image: {type: String}
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
