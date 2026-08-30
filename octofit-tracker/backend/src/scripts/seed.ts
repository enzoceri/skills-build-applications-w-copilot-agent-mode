import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing collections
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Seed Users
    const users = await User.insertMany([
      {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        password: 'hashed_password_1',
        points: 1250,
      },
      {
        email: 'bob@example.com',
        name: 'Bob Smith',
        password: 'hashed_password_2',
        points: 980,
      },
      {
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        password: 'hashed_password_3',
        points: 1120,
      },
      {
        email: 'diana@example.com',
        name: 'Diana Prince',
        password: 'hashed_password_4',
        points: 1450,
      },
      {
        email: 'eve@example.com',
        name: 'Eve Wilson',
        password: 'hashed_password_5',
        points: 850,
      },
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Seed Teams
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness excellence',
        points: 3250,
        members: [users[0]._id.toString(), users[1]._id.toString()],
      },
      {
        name: 'Health Heroes',
        description: 'Champions of health and wellness',
        points: 2570,
        members: [users[2]._id.toString(), users[3]._id.toString()],
      },
      {
        name: 'Active Achievers',
        description: 'Always pushing for more',
        points: 850,
        members: [users[4]._id.toString()],
      },
    ]);

    console.log(`✓ Created ${teams.length} teams`);

    // Update users with team IDs
    await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { teamId: teams[1]._id });
    await User.updateOne({ _id: users[4]._id }, { teamId: teams[2]._id });

    // Seed Activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 520,
        points: 300,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id.toString(),
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 650,
        points: 400,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id.toString(),
        type: 'swimming',
        duration: 30,
        distance: 1.5,
        calories: 350,
        points: 250,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id.toString(),
        type: 'running',
        duration: 50,
        distance: 9,
        calories: 580,
        points: 350,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id.toString(),
        type: 'strength',
        duration: 75,
        calories: 450,
        points: 400,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id.toString(),
        type: 'yoga',
        duration: 40,
        calories: 200,
        points: 150,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log(`✓ Created ${activities.length} activities`);

    // Seed Leaderboard
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[3]._id.toString(),
        userName: 'Diana Prince',
        points: 1450,
        rank: 1,
        activities: 4,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id.toString(),
        userName: 'Alice Johnson',
        points: 1250,
        rank: 2,
        activities: 5,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id.toString(),
        userName: 'Charlie Brown',
        points: 1120,
        rank: 3,
        activities: 3,
        lastActivityDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id.toString(),
        userName: 'Bob Smith',
        points: 980,
        rank: 4,
        activities: 2,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id.toString(),
        userName: 'Eve Wilson',
        points: 850,
        rank: 5,
        activities: 1,
        lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log(`✓ Created ${leaderboard.length} leaderboard entries`);

    // Seed Workouts
    const workouts = await Workout.insertMany([
      {
        type: 'cardio',
        difficulty: 'beginner',
        duration: 30,
        description: 'Light jogging for beginners',
        points: 150,
      },
      {
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 45,
        description: 'Moderate intensity running',
        points: 300,
      },
      {
        type: 'cardio',
        difficulty: 'advanced',
        duration: 60,
        description: 'High-intensity interval training',
        points: 500,
      },
      {
        type: 'strength',
        difficulty: 'beginner',
        duration: 40,
        description: 'Bodyweight exercises for beginners',
        points: 200,
      },
      {
        type: 'strength',
        difficulty: 'intermediate',
        duration: 50,
        description: 'Dumbbell and resistance training',
        points: 350,
      },
      {
        type: 'strength',
        difficulty: 'advanced',
        duration: 75,
        description: 'Advanced weightlifting program',
        points: 550,
      },
      {
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 30,
        description: 'Beginner yoga session',
        points: 100,
      },
      {
        type: 'flexibility',
        difficulty: 'intermediate',
        duration: 45,
        description: 'Intermediate yoga and stretching',
        points: 200,
      },
    ]);

    console.log(`✓ Created ${workouts.length} workout templates`);

    console.log('\n✅ Database seeding complete!');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Leaderboard entries: ${leaderboard.length}`);
    console.log(`   - Workout templates: ${workouts.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
