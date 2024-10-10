const express = require('express');
const app = express();
const cors  = require('cors')
const generateContent = require('./gemini')
const dotenv = require('dotenv');
dotenv.config()
const port = 5000;

// Use Express's built-in body parser for JSON
app.use(cors({

}))
app.use(express.json());

app.post('/get-response', async (req, res) => {
  const { userMessage } = req.body;

  // Simulating basic emotional analysis with case-insensitive check
  const botResponse = await generateContent(userMessage);

  res.json({ botMessage: botResponse });
});


app.get('/', (req, res) => {
  res.send("Hello, I am Amit");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
