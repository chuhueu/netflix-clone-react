const router = require('express').Router();
const List = require('../models/List');
//CRUD
//CREATE
router.post('/', async (req, res) =>{
    const newList = new List(req.body);
    try {
       const saveList =  await newList.save();
       res.status(200).json(saveList);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
})

//DELETE
router.delete('/:id', async (req, res) =>{
    try {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json("the list has been deleted...!");
    } catch (error) {
        res.status(409).json({message: error.message});
    }
})
//GET ALL
/**
req.paramschứa các tham số tuyến đường (trong phần đường dẫn của URL) và req.query chứa các tham số truy vấn URL (sau phần ?trong URL). */
router.get('/', async (req, res) =>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    console.log(typeQuery ," ", genreQuery);
    let list =[];
    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                  { $sample: { size: 10 } },
                  { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            }else{
                list = await List.aggregate([
                  { $sample: { size: 10 } },
                  { $match: { type: typeQuery } },
                ]);
            }
        }else{
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
//GET LIST BY ID
router.get("/:id", async (req,res) =>{
    try {
        const getList = await List.findById(req.params.id);
        res.status(200).json(getList);
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE LIST
router.put("/:id", async (req,res) =>{
    try {
        const updateList = await List.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updateList)
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;