const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Definição do schema das tarefas
//a estrutura possui a task, se ela foi completada e o usuario que a criou

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
