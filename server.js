const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Path to mcqs.json
const mcqsPath = path.join(__dirname, 'public/mcqs.json');

// ✅ GET MCQs
app.get('/mcqs', (req, res) => {
  const data = fs.readFileSync(mcqsPath, 'utf8');
  res.json(JSON.parse(data));
});

// ✅ POST MCQs
app.post('/mcqs', (req, res) => {
  const newMcq = req.body;
  const data = JSON.parse(fs.readFileSync(mcqsPath, 'utf8'));
  data.push(newMcq);
  fs.writeFileSync(mcqsPath, JSON.stringify(data, null, 2));
  res.json({ success: true, message: 'MCQ added' });
});

// ✅ Optional root route
app.get('/', (req, res) => res.send('MCQs Backend is Live'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
