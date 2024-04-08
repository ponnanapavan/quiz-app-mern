import express from 'express';
import data from './data.js';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware for parsing URL-encoded bodies
app.use(bodyParser.json()); // Use body-parser middleware for parsing JSON bodies

app.get('/quizdata', (req, res) => {
    res.json({ data });
});

app.post('/quizsubmit', (req, res) => {
    try {
        const answers = req.body;
        let score = 0;
        const finalFeedback = [];

        data.forEach((item) => {
            const correctAnswer = item.correctAnswer;
            const userAnswer = answers[`answers[${item.id}]`];

            if (userAnswer === correctAnswer) {
                score++;
                finalFeedback.push({ id: item.id, result: 'correct' });
            } else {
                finalFeedback.push({ id: item.id, result: 'incorrect', correctAnswer });
            }
        });

        res.json({ score, finalFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
