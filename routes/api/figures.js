const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Figure = require("../../models/Figure");

// @route    POST api/figures
// @desc     Create new figure
// @access   Private
router.post("/", [auth], async (req, res) => {
  try {
    const newFigure = new Figure({
      user: req.user.id,
      figureJSON: JSON.stringify(req.body),
      name: req.body.name,
      private: true
    });

    const figure = await newFigure.save();

    res.json(figure);
  } catch {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/figures/:id
// @desc     Update figure by id
// @access   Private
router.post("/:id", [auth], async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = {
      figureJSON: JSON.stringify(req.body),
      name: req.body.name
    };
    const options = { new: true, upsert: true };

    let figure = await Figure.findOneAndUpdate(filter, update, options);

    // Check for ObjectId format and figure
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !figure) {
      return res.status(404).json({ msg: "Figure not found" });
    }
    res.json(figure);
  } catch {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/figures/:id
// @desc     Get figure by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const figure = await Figure.findById(req.params.id);
    // Check for ObjectId format and figure
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !figure) {
      return res.status(404).json({ msg: "Figure not found" });
    }
    // Check if this is the user's figure
    if (!req.user) {
      return res.status(401).json({ msg: "User not authorized" });
    } else if (figure.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    res.json(figure);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/figures/public/:id
// @desc     Get public figure by id
// @access   Public
router.get("/public/:id", async (req, res) => {
  try {
    const figure = await Figure.findById(req.params.id);
    // Check for ObjectId format and figure
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !figure) {
      return res.status(404).json({ msg: "Figure not found" });
    }
    // Check if figure is actually public
    if (figure.private) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    res.json(figure);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/figures
// @desc     Get all user's figures
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const figures = await Figure.find({ user: req.user.id }).sort({ date: -1 });
    res.json(figures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/figures/:id
// @desc     Delete figure by id
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const figure = await Figure.findById(req.params.id);

    // Check for ObjectId format and figure
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !figure) {
      return res.status(404).json({ msg: "Figure not found" });
    }

    // Check user
    if (figure.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await figure.remove();

    res.json({ msg: "Figure deleted" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
