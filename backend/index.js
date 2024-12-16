const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Root Route: Handle "/"
app.get('/', (req, res) => {
  res.send("Welcome to the Backend!");
});

// API Route: Handle "/api/message"
app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from the Backend!" });
});

// Allow parsing of incoming JSON requests
app.use(express.json());

// Define POST /api/echo route
app.post('/api/echo', (req, res) => {
  const userMessage = req.body.message;  // Extract the message from the request
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }
  res.json({ response: `Backend says: ${userMessage}` });
});

// 404 Catch-All for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



