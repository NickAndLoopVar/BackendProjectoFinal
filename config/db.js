const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const ConectarBD = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Estamos conectados con mongoDB"))
    .catch((err) => console.log(err));
};

module.exports = ConectarBD;
