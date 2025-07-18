const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// GET MCQs
app.get('/mcqs', (req, res) => {
  const mcqsPath = path.join(__dirname, '../public/mcqs.json');
  const mcqs = JSON.parse(fs.readFileSync(mcqsPath, 'utf-8'));
  res.json(mcqs);
});

// POST new MCQ
app.post('/mcqs', (req, res) => {
  const mcqsPath = path.join(__dirname, '../public/mcqs.json');
  const mcqs = JSON.parse(fs.readFileSync(mcqsPath, 'utf-8'));
  mcqs.push(req.body);
  fs.writeFileSync(mcqsPath, JSON.stringify(mcqs, null, 2));
  res.json({ message: 'MCQ added successfully!' });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
