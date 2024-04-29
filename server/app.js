import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "POST",
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const port = process.env.PORT;

// Creating schema

const schema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", schema);

app.get("/", (req, res) => {
  res.send("Hello");
});

// API for posting note
app.post("/note", async (req, res) => {
  try {
    const { note } = req.body;

    if (!note) {
      res.status(400).json({ message: "Note is required" });
    }

    const newNote = new Note({ note });
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", data: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API for fetching note
app.get("/note", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
});

const db_connection = mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

if (db_connection) {
  app.listen(port, () => console.log(`App listening at port ${port}`));
}
