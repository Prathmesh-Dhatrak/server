const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers);

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("Firebase User in Auth Check", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or Expired Token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email: email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Access Denied",
    });
  } else {
    next();
  }
};
