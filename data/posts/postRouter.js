const express = "express";
const db = require("./postDb.js");

const router = express.Router();

//express router endpoints

router.get("/", (req, res) => {
  db.get()
    .then(post => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

// get by ID

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

//Delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(id => {
      if (id) {
        res.status(200).json(id);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The post could not be removed." });
    });
});

//put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  if (!text) {
    res
      .status(400)
      .send({ message: "Please provide text and user_id for the post." });
  }

  db.update(id, { text })
    .then(update => {
      if (update) {
        res.status(201).json(update);
      } else {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "The post information could not be modified." });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  return (req, res, next) => {
    console.log("req.body");
    console.group("validatePostId");
    next();
  };
}
Server.use(validatePostId());

module.exports = router;
