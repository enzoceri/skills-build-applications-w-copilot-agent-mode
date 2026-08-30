import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ rank: 1 });
        res.json({
            message: 'Get leaderboard',
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teamLeaderboard = await Leaderboard.find().sort({ points: -1 }).limit(10);
        res.json({
            message: 'Get team leaderboard',
            count: teamLeaderboard.length,
            data: teamLeaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team leaderboard' });
    }
});
router.get('/users', async (_req, res) => {
    try {
        const userLeaderboard = await Leaderboard.find().sort({ rank: 1 });
        res.json({
            message: 'Get user leaderboard',
            count: userLeaderboard.length,
            data: userLeaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user leaderboard' });
    }
});
export default router;
