const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const diaries = require('./routes/api/diaries');
const auth = require('./routes/api/auth');

const db = mongoose.connect("mongodb://localhost:27017/myday", { useNewUrlParser: true });

mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

//Use Route
app.use('/api/diaries', diaries);
app.use('/api/auth/', auth);

app.use("/", (req, res) => {
    res.send("My Day");
});

const PORT = process.env.SERVER_PORT || 8085;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
