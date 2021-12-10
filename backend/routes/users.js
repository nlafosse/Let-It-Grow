var express = require("express");
var router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

require("dotenv").config();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up", function (req, res, next) {
  console.log("BODY", req.body);

  //OPTIONAL destructure the object

  const { username, password } = req.body;

  //1. check for username and password
  //2. encrypt password
  //3. save user
  //4. create JWT

  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  //Encrypt password
  //Create salt

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userToCreate = new User({
    username: username,
    password: hashedPassword,
  });

  User.create(userToCreate)
    .then((newlyCreatedUser) => {
      //create and sign our JSON web Token, then pass it to the front end

      //These two things are functionally identical
      console.log(newlyCreatedUser._id);
      console.log(newlyCreatedUser.id);

      const payload = {
        user: {
          id: newlyCreatedUser.id,
        },
      };

      jwt.sign(
        payload, //payload
        process.env.SECRET, //secret to help encrypt jwt
        { expiresIn: 3600000 }, //how long the token lasts
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token, id: newlyCreatedUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });

  // res.json({ message: 'SUCCESS', user: userToCreate });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      //Send back if user doesn't exist
      if (!foundUser) {
        res.json({ message: "Username not found" });
      }

      //Check for proper password

      const passMatch = bcrypt.compareSync(password, foundUser.password);

      if (!passMatch) {
        res.json({ message: "Improper password" });
      }

      //Sign JWT

      const payload = {
        user: {
          id: foundUser.id,
        },
      };

      jwt.sign(
        payload, //payload
        process.env.SECRET, //secret to help encrypt jwt
        { expiresIn: 3600000 }, //how long the token lasts
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token, id: foundUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/login-test", auth, (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post("/update-user/:userid", auth, (req, res) => {
//   Plant.findByIdAndUpdate(req.params.userid, { username: req.body.username })
//     .then((updateddata) => {
//       console.log("Update successful: ", updateddata);
//       res.json(updateddata);
//     })
//     .catch((err) => {
//       console.log("ERROR: ", err);
//     });
// });

// router.delete("/delete-user/:userid", auth, (req, res) => {
//   Plant.findByIdAndRemove(req.params.userid)
//     .then((updateddata) => {
//       console.log("User was deleted", updateddata);
//       res.json({ message: "user has been deleted" });
//     })
//     .catch((err) => {
//       console.log("ERROR", err);
//     });
// });

module.exports = router;
