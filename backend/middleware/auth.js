require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get the token
  let token = req.headers.authorization;
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(403).json({ message: "No token found" });
  }

  try {
    const decodedInfo = jwt.verify(token, process.env.SECRET);
    console.log("This info was hidden in the token", decodedInfo);
    req.user = decodedInfo.user;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = auth;
