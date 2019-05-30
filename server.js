const express = "express";

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

//logger
function logger(req, res, next) {
  return (req, res, next) => {
    console.log("req.body");
    console.group("logger");
    next();
  };
}
server.use(logger());

//validateUserID

function validateUserID(req, res, next) {
  return (req, res, next) => {
    console.log("req.body");
    console.group("validateUserId");
    next();
  };
}
server.use(validateUserID());

//validateUser

function validateUser(req, res, next) {
  return (req, res, next) => {
    console.log("req.body");
    console.group("validateUser");
    next();
  };
}
server.use(validateUser());

//validatePost

function validatePost(req, res, next) {
  return (req, res, next) => {
    console.log("req.body");
    console.group("validatePost");
    next();
  };
}
server.us(validatePost());

//export
module.exports = server;
