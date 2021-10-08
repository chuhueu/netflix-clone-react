const router = require("express").Router();
const Transaction = require("../models/Transaction");

//CREATE
router.post("/", async (req, res) => {
  const newTransaction = new Transaction(req.body);

  try {
    const sendTransaction = await newTransaction.save();
    res.status(201).json(sendTransaction);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateTransaction);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json("the Transaction has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ALL
router.get("/", async (req, res) =>{
  try {
    const getTransactions = await Transaction.find();
    res.status(200).json(getTransactions.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
})

//GET FIND ID
router.get("/find/:id", async (req, res) => {
  try {
    const getTransaction = await Transaction.findById(req.params.id);
    res.status(200).json(getTransaction);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
