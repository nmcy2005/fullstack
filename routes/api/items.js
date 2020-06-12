const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc get all Items
//@access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route POST api/items
//@desc create an Item
//@access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items
//@desc delete an Item
//@access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item
        .remove()
        .then(() =>
          res.json({ success: true, message: "Successfully removed an item" })
        )
    )
    .catch((err) => res.status(404).json({ success: false, message: "404" }));
});

module.exports = router;
