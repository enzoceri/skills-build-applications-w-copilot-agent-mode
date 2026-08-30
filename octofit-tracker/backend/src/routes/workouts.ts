import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workouts' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${req.params.id}`,
      data: workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workout' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      message: 'Create new workout suggestion',
      data: workout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json({
      message: `Get personalized workout suggestions for user ${req.params.userId}`,
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workout suggestions' });
  }
});

export default router;
