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

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

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
