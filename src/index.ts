import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv-safe';
import api from './routes';

const app = express();

// Access Environment variables
dotenv.config();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Typegoose Example 🤟" });
});

// Routes which Should handle the requests
app.use('/api/v1', api);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(
     process.env.MONGODB_CONNECTION_STRING as string,
    );
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


void start();