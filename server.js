const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Path to your mcqs.json file
const mcqsPath = path.join(__dirname, 'public', 'mcqs.json');

// ✅ GET route: Fetch MCQs
app.get('/mcqs', (req, res) => {
    fs.readFile(mcqsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading mcqs.json:', err);
            return res.status(500).json({ error: 'Unable to read MCQs file' });
        }
        res.json(JSON.parse(data));
    });
});

// ✅ POST route: Add new MCQ
app.post('/mcqs', (req, res) => {
    const newMcq = req.body;

    fs.readFile(mcqsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading mcqs.json:', err);
            return res.status(500).json({ error: 'Unable to read MCQs file' });
        }

        let mcqs = [];
        try {
            mcqs = JSON.parse(data);
        } catch (parseErr) {
            console.error('❌ Error parsing mcqs.json:', parseErr);
            return res.status(500).json({ error: 'Corrupted MCQs file' });
        }

        mcqs.push(newMcq);

        fs.writeFile(mcqsPath, JSON.stringify(mcqs, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('❌ Error writing to mcqs.json:', writeErr);
                return res.status(500).json({ error: 'Unable to write new MCQ' });
            }
            res.json({ success: true, message: 'MCQ added successfully ✅' });
        });
    });
});

// ✅ Optional: Root route
app.get('/', (req, res) => {
    res.send('✅ MCQs backend is live and running!');
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
