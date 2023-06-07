const Data = require("../models/Data");
const router = require("express").Router();

router.get("/get", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    Data.find()
      .skip(skip)
      .limit(limit)
      .exec()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });

  router.get("/by_end_year", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const endYear = parseInt(req.query.endYear);
    
    Data.find({
      $expr: {
        $eq: ["$end_year", endYear]
      }
    })
      .skip(skip)
      .limit(limit)
      .exec()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
  
  
  
module.exports = router;
