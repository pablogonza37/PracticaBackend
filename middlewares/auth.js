const jwt = require("jsonwebtoken");

module.exports = () => (req, res) => {
  try {
    const token = req.header("auth");
    if (!token) {
      return res.status(400).json({ msg: "Token incorrecto" });
    }

    const verify = jwt.verify(token, process.env.JET_SECRET);

    if (rol === verify.rol) {
      req.idUsuario = verify._id
      return next();
    } else {
      return res.status(401).json({ msg: "No tienes acceso" });
    }
  } catch (error) {
    console.log(error);
  }
};
