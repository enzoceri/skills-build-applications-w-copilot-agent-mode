import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const hi = 'hi';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API URL support
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    port: PORT,
    database: 'octofit_db',
    apiUrl: getApiUrl(),
  });
});

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`OctoFit Tracker API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
