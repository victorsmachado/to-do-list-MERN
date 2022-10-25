require("dotenv").config();
const tasks = require("./routes/tasks");

const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();
const users = require('./routes/users')
const auth = require('./routes/auth')

//conexão com o database
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

