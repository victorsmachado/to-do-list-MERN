const mongoose = require("mongoose");

//Conexão com o banco de dados, estou usando nesse caso um banco de dados local
module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost/todo-app", connectionParams);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};
