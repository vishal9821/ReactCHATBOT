import express from "express";
import cors  from "cors";
import pg from "pg";
import 'dotenv/config';
import bodyParser from "body-parser";
import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const password = process.env.PASSWORD;

// database Configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "chatbot",
  password: password,
  port: 5432,
});

db.connect();

(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS chat_history (
        id SERIAL PRIMARY KEY,
        user_message TEXT NOT NULL,
        bot_response TEXT NOT NULL
      )
    `);
    console.log("Chat history table is ready.");
  } catch (err) {
    console.error("Error setting up the database:", err);
  }
})();



app.post("/gemini", async (req, res) => {
  try {
    const userMessage = req.body.data;
    console.log(req.body.data);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const msg = userMessage;
    const result = await model.generateContent(msg);
    console.log(result.response.text());

    const botResponse = result.response.text();

    // Save chat data to PostgreSQL
    await db.query(
      "INSERT INTO chat_history (user_message, bot_response) VALUES ($1, $2)",
      [userMessage, botResponse]
    );

    // Send back the response
    res.json({ responseServer: botResponse });
  } catch (error) {
    console.error("Error communicating with Gemini API or database:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});