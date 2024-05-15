const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Se va a leer el token del header
  const token = req.header("x-auth-token");
  //Revisamos si tenemos un token
  if (!token) {
    return res
      .status(400)
      .json({ msg: "Permiso no valido, no tiene un token" });
  }
  //validar el token
  try {
    const cifrado = jwt.verify(token.process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token no valido" });
  }
};
