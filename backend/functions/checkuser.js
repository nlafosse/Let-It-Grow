const User = require("../models/User");

const checkUser = (userid, objid, callback) => {
  //CONDITIONAL FOR UPDATING/DELETING POSTS
  //   if (req.user.id !== req.owner) {
  //     console.log("token id:", req.user.id);
  //     console.log("plant owner id:", req.params.owner);
  //     return res
  //       .status(403)
  //       .json({ message: "FORBIDDEN - you cannot update this" });
  //   }

  return userid !== objid ? callback : true;
};

module.exports = checkUser;
