import jwt from "jsonwebtoken";
const verify = async (req, res, next) => {
  const authHeader = req.headers.access_token;
  if (!authHeader) {
    res.status(401).json("Access denied");
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.verification_token, (err, user) => {
      if (err) {
        res
          .status(403)
          .json(
            "Authentication Error: Your session has expired. Please log in again to continue."
          );
      } else {
        req.user = user;
        next();
      }
    });
  }
};

export default verify;
