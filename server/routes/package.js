const router = require("express").Router();
const Package = require("../models/Package");

router.post("/", async (req, res) => {
  const newPackage = new Package(req.body);

  try {
    const sendPackage = await newPackage.save();
    res.status(201).json(sendPackage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const getPackage = await Package.find();
    res.status(200).json(getPackage.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
