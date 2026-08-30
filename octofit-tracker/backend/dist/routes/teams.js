import { Router } from 'express';
import { Team } from '../models/Team.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find();
        res.json({
            message: 'Get all teams',
            count: teams.length,
            data: teams,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teams' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `Get team ${req.params.id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team' });
    }
});
router.post('/', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json({
            message: 'Create new team',
            data: team,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `Update team ${req.params.id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `Delete team ${req.params.id}`,
            data: { deleted: true },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;
