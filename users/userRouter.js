const express = require("express");

const db = require("./userDb.js");
const router = express.Router();

const nameHandler = (req, res, next) => {
  const { name } = req.body;
  if (name[0] !== name[0].toUpperCase()) {
    res.status(400).send("Capitalize the first letter of your name.");
  } else {
    next();
  }
};

// Get
router.get("/", (req, res) => {
  db.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error fetching the users." });
    });
});

// Get -> user by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with this ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error fetching the specified user." });
    });
});

// Create/Post => User
router.post("/", nameHandler, (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Please provide a name." });
  }

  db.insert({ name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error adding the user." });
    });
});

// Delete -> User
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "This user does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleting the user." });
    });
});

// Update -> User
router.put("/:id", nameHandler, (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Please provide a name." });
  }

  db.update(id, { name })
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "This user does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error updating the user." });
    });
});

// Get -> All Posts by a Specific User
router.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  db.getUserPosts(id)
    .then(userPosts => {
      if (userPosts) {
        res.status(200).json(userPosts);
      } else {
        res.status(404).json({ message: "This user has no posts." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error fetching this user's posts." });
    });
});

module.exports = router;
