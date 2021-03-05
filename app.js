const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 5000;
const authRouter = require("./routes/auth");
const booksPrivateRouter = require("./routes/books");
const pdfsPrivateRouter = require("./routes/pdf");

dotenv.config();
app.use(cors());

//Connect to DB
mongoose
  .connect('mongodb+srv://akanshsaxena:Mongo%40723@covid19.neusj.mongodb.net/booknary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
//process.env.DB_CONNECT
app.use(express.json());

app.use("/api/account/user", authRouter);

app.use("/api/books", booksPrivateRouter);

app.use("/api/pdfs", pdfsPrivateRouter);

app.listen(port, () => console.log(`Server is Up and Running at port: ${port}`));