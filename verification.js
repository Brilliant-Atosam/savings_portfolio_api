import jwt from "jsonwebtoken";
const verify = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json("Access denied");
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.verification_token, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json(
            "Your access token has expired! Please log in again to continue."
          );
      } else {
        req.user = user;
        next();
      }
    });
  }
};

export default verify;
