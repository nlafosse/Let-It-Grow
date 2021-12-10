require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get the token
  let token = req.headers.authorization?.split(" ")[1]; //This will give us our token
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(403).json({ message: "No token found" });
  }

  //Check if token is valid

  try {
    //verify all the information is correct
    //1st arg: the token we grabbed from the header
    //2nd arg": the .env SECRET we added
    const decodedInfo = jwt.verify(token, process.env.SECRET);
    console.log("This info was hidden in the token", decodedInfo);
    req.user = decodedInfo.user;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = auth;
