import { Router } from 'express';
import { Activity } from '../models/Activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity.find().sort({ timestamp: -1 });
        res.json({
            message: 'Get all activities',
            count: activities.length,
            data: activities,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activities' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({
            message: `Get activity ${req.params.id}`,
            data: activity,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activity' });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json({
            message: 'Log new activity',
            data: activity,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to log activity' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({
            message: `Update activity ${req.params.id}`,
            data: activity,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({
            message: `Delete activity ${req.params.id}`,
            data: { deleted: true },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
export default router;
