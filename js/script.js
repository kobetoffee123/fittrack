// Data storage
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
let cardioSessions = JSON.parse(localStorage.getItem('cardio')) || [];
let bodyWeights = JSON.parse(localStorage.getItem('bodyWeights')) || [];
let bodyMeasurements = JSON.parse(localStorage.getItem('bodyMeasurements')) || [];
let progressPhotos = JSON.parse(localStorage.getItem('progressPhotos')) || [];
let workoutTemplates = JSON.parse(localStorage.getItem('workoutTemplates')) || [];
let nutritionLogs = JSON.parse(localStorage.getItem('nutritionLogs')) || [];
let waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || [];
let sleepLogs = JSON.parse(localStorage.getItem('sleepLogs')) || [];
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];
let settings = JSON.parse(localStorage.getItem('settings')) || {
  darkMode: false,
  notifications: true,
  units: 'kg'
};

// Exercise library
const exerciseLibrary = {
  chest: [
    { name: 'Bench Press', description: 'Compound movement for overall chest development', sets: '3-4', reps: '6-10' },
    { name: 'Incline Dumbbell Press', description: 'Targets upper chest', sets: '3-4', reps: '8-12' },
    { name: 'Cable Flyes', description: 'Isolation exercise for chest definition', sets: '3', reps: '12-15' },
    { name: 'Push-ups', description: 'Bodyweight exercise for chest and triceps', sets: '3', reps: '15-20' }
  ],
  back: [
    { name: 'Deadlift', description: 'Full body compound movement, emphasizes back', sets: '3-4', reps: '5-8' },
    { name: 'Pull-ups', description: 'Bodyweight exercise for lats and upper back', sets: '3-4', reps: '6-10' },
    { name: 'Barbell Row', description: 'Compound movement for back thickness', sets: '3-4', reps: '8-12' },
    { name: 'Lat Pulldown', description: 'Machine exercise for lat development', sets: '3', reps: '10-12' }
  ],
  legs: [
    { name: 'Squat', description: 'King of leg exercises, full lower body', sets: '3-4', reps: '6-10' },
    { name: 'Romanian Deadlift', description: 'Targets hamstrings and glutes', sets: '3-4', reps: '8-12' },
    { name: 'Leg Press', description: 'Machine exercise for overall leg development', sets: '3', reps: '10-15' },
    { name: 'Lunges', description: 'Unilateral leg exercise for balance and strength', sets: '3', reps: '10-12 each' },
    { name: 'Leg Curls', description: 'Isolation for hamstrings', sets: '3', reps: '12-15' },
    { name: 'Calf Raises', description: 'Targets calf muscles', sets: '4', reps: '15-20' }
  ],
  shoulders: [
    { name: 'Overhead Press', description: 'Compound movement for shoulder development', sets: '3-4', reps: '6-10' },
    { name: 'Lateral Raises', description: 'Isolation for side delts', sets: '3-4', reps: '12-15' },
    { name: 'Face Pulls', description: 'Rear delt and upper back exercise', sets: '3', reps: '15-20' },
    { name: 'Arnold Press', description: 'Dumbbell variation hitting all delt heads', sets: '3', reps: '8-12' }
  ],
  arms: [
    { name: 'Barbell Curl', description: 'Classic bicep builder', sets: '3', reps: '8-12' },
    { name: 'Tricep Dips', description: 'Compound movement for triceps', sets: '3', reps: '8-12' },
    { name: 'Hammer Curls', description: 'Targets brachialis and forearms', sets: '3', reps: '10-12' },
    { name: 'Skull Crushers', description: 'Isolation exercise for triceps', sets: '3', reps: '10-12' },
    { name: 'Cable Curls', description: 'Constant tension bicep exercise', sets: '3', reps: '12-15' },
    { name: 'Tricep Pushdowns', description: 'Cable isolation for triceps', sets: '3', reps: '12-15' }
  ],
  core: [
    { name: 'Plank', description: 'Isometric core stability exercise', sets: '3', reps: '30-60s' },
    { name: 'Cable Crunches', description: 'Weighted ab exercise', sets: '3', reps: '15-20' },
    { name: 'Hanging Leg Raises', description: 'Advanced lower ab exercise', sets: '3', reps: '10-15' },
    { name: 'Russian Twists', description: 'Oblique targeting exercise', sets: '3', reps: '20-30' }
  ]
};

// Workout templates
const workoutTemplates = {
  push: {
    name: 'Push Day',
    description: 'Targets chest, shoulders, and triceps',
    exercises: [
      { ...exerciseLibrary.chest[0], muscle: 'Chest' },
      { ...exerciseLibrary.chest[1], muscle: 'Chest' },
      { ...exerciseLibrary.shoulders[0], muscle: 'Shoulders' },
      { ...exerciseLibrary.shoulders[1], muscle: 'Shoulders' },
      { ...exerciseLibrary.arms[3], muscle: 'Triceps' },
      { ...exerciseLibrary.arms[5], muscle: 'Triceps' }
    ]
  },
  pull: {
    name: 'Pull Day',
    description: 'Targets back and biceps',
    exercises: [
      { ...exerciseLibrary.back[0], muscle: 'Back' },
      { ...exerciseLibrary.back[1], muscle: 'Back' },
      { ...exerciseLibrary.back[2], muscle: 'Back' },
      { ...exerciseLibrary.shoulders[2], muscle: 'Rear Delts' },
      { ...exerciseLibrary.arms[0], muscle: 'Biceps' },
      { ...exerciseLibrary.arms[2], muscle: 'Biceps' }
    ]
  },
  legs: {
    name: 'Leg Day',
    description: 'Complete lower body workout',
    exercises: [
      { ...exerciseLibrary.legs[0], muscle: 'Quads' },
      { ...exerciseLibrary.legs[1], muscle: 'Hamstrings' },
      { ...exerciseLibrary.legs[2], muscle: 'Quads' },
      { ...exerciseLibrary.legs[3], muscle: 'Quads/Glutes' },
      { ...exerciseLibrary.legs[4], muscle: 'Hamstrings' },
      { ...exerciseLibrary.legs[5], muscle: 'Calves' }
    ]
  },
  upper: {
    name: 'Upper Body',
    description: 'Full upper body workout',
    exercises: [
      { ...exerciseLibrary.chest[0], muscle: 'Chest' },
      { ...exerciseLibrary.back[2], muscle: 'Back' },
      { ...exerciseLibrary.shoulders[0], muscle: 'Shoulders' },
      { ...exerciseLibrary.chest[2], muscle: 'Chest' },
      { ...exerciseLibrary.back[3], muscle: 'Back' },
      { ...exerciseLibrary.arms[0], muscle: 'Biceps' },
      { ...exerciseLibrary.arms[5], muscle: 'Triceps' }
    ]
  },
  lower: {
    name: 'Lower Body',
    description: 'Complete lower body focus',
    exercises: [
      { ...exerciseLibrary.legs[0], muscle: 'Quads' },
      { ...exerciseLibrary.legs[1], muscle: 'Hamstrings' },
      { ...exerciseLibrary.legs[3], muscle: 'Quads/Glutes' },
      { ...exerciseLibrary.legs[4], muscle: 'Hamstrings' },
      { ...exerciseLibrary.legs[5], muscle: 'Calves' },
      { ...exerciseLibrary.core[0], muscle: 'Core' }
    ]
  },
  fullbody: {
    name: 'Full Body',
    description: 'Balanced full body workout',
    exercises: [
      { ...exerciseLibrary.legs[0], muscle: 'Legs' },
      { ...exerciseLibrary.chest[0], muscle: 'Chest' },
      { ...exerciseLibrary.back[2], muscle: 'Back' },
      { ...exerciseLibrary.shoulders[0], muscle: 'Shoulders' },
      { ...exerciseLibrary.legs[1], muscle: 'Hamstrings' },
      { ...exerciseLibrary.arms[0], muscle: 'Biceps' },
      { ...exerciseLibrary.arms[5], muscle: 'Triceps' },
      { ...exerciseLibrary.core[1], muscle: 'Core' }
    ]
  }
};

// Curated workout programs
const workoutPrograms = {
  fullbody3x: {
    name: 'Full Body 3x/Week',
    description: 'Perfect for beginners or those with limited time. Train 3 days per week with rest days in between.',
    frequency: '3x per week (e.g., Mon/Wed/Fri)',
    sessions: [
      {
        name: 'Session 1 - Strength Focus',
        exercises: [
          { name: 'Bench Press', muscle: 'Chest', sets: '4', reps: '6-8', description: 'Compound movement for overall chest development' },
          { name: 'Deadlift', muscle: 'Back', sets: '4', reps: '5-8', description: 'Full body compound movement, emphasizes back' },
          { name: 'Overhead Press', muscle: 'Shoulders', sets: '3', reps: '8-10', description: 'Compound movement for shoulder development' },
          { name: 'Barbell Row', muscle: 'Back', sets: '3', reps: '8-10', description: 'Compound movement for back thickness' },
          { name: 'Barbell Curl', muscle: 'Biceps', sets: '3', reps: '10-12', description: 'Classic bicep builder' },
          { name: 'Plank', muscle: 'Core', sets: '3', reps: '45-60s', description: 'Isometric core stability exercise' }
        ]
      },
      {
        name: 'Session 2 - Lower Body Focus',
        exercises: [
          { name: 'Squat', muscle: 'Legs', sets: '4', reps: '6-10', description: 'King of leg exercises, full lower body' },
          { name: 'Incline Dumbbell Press', muscle: 'Chest', sets: '3', reps: '8-12', description: 'Targets upper chest' },
          { name: 'Pull-ups', muscle: 'Back', sets: '3', reps: '6-10', description: 'Bodyweight exercise for lats and upper back' },
          { name: 'Lateral Raises', muscle: 'Shoulders', sets: '3', reps: '12-15', description: 'Isolation for side delts' },
          { name: 'Tricep Dips', muscle: 'Triceps', sets: '3', reps: '8-12', description: 'Compound movement for triceps' },
          { name: 'Hanging Leg Raises', muscle: 'Core', sets: '3', reps: '10-15', description: 'Advanced lower ab exercise' }
        ]
      },
      {
        name: 'Session 3 - Hypertrophy Focus',
        exercises: [
          { name: 'Leg Press', muscle: 'Legs', sets: '4', reps: '10-15', description: 'Machine exercise for overall leg development' },
          { name: 'Romanian Deadlift', muscle: 'Hamstrings', sets: '3', reps: '10-12', description: 'Targets hamstrings and glutes' },
          { name: 'Cable Flyes', muscle: 'Chest', sets: '3', reps: '12-15', description: 'Isolation exercise for chest definition' },
          { name: 'Lat Pulldown', muscle: 'Back', sets: '3', reps: '10-12', description: 'Machine exercise for lat development' },
          { name: 'Arnold Press', muscle: 'Shoulders', sets: '3', reps: '10-12', description: 'Dumbbell variation hitting all delt heads' },
          { name: 'Cable Crunches', muscle: 'Core', sets: '3', reps: '15-20', description: 'Weighted ab exercise' }
        ]
      }
    ]
  },
  ppl: {
    name: 'Push/Pull/Legs 6x/Week',
    description: 'Advanced split for maximum muscle growth. Train 6 days per week, hitting each muscle group twice.',
    frequency: '6x per week (Push/Pull/Legs/Push/Pull/Legs/Rest)',
    sessions: [
      {
        name: 'Push Day 1',
        exercises: [
          { name: 'Bench Press', muscle: 'Chest', sets: '4', reps: '6-8', description: 'Compound movement for overall chest development' },
          { name: 'Overhead Press', muscle: 'Shoulders', sets: '4', reps: '6-8', description: 'Compound movement for shoulder development' },
          { name: 'Incline Dumbbell Press', muscle: 'Chest', sets: '3', reps: '8-12', description: 'Targets upper chest' },
          { name: 'Lateral Raises', muscle: 'Shoulders', sets: '3', reps: '12-15', description: 'Isolation for side delts' },
          { name: 'Tricep Dips', muscle: 'Triceps', sets: '3', reps: '8-12', description: 'Compound movement for triceps' },
          { name: 'Tricep Pushdowns', muscle: 'Triceps', sets: '3', reps: '12-15', description: 'Cable isolation for triceps' }
        ]
      },
      {
        name: 'Pull Day 1',
        exercises: [
          { name: 'Deadlift', muscle: 'Back', sets: '4', reps: '5-8', description: 'Full body compound movement, emphasizes back' },
          { name: 'Pull-ups', muscle: 'Back', sets: '4', reps: '6-10', description: 'Bodyweight exercise for lats and upper back' },
          { name: 'Barbell Row', muscle: 'Back', sets: '3', reps: '8-10', description: 'Compound movement for back thickness' },
          { name: 'Face Pulls', muscle: 'Rear Delts', sets: '3', reps: '15-20', description: 'Rear delt and upper back exercise' },
          { name: 'Barbell Curl', muscle: 'Biceps', sets: '3', reps: '8-12', description: 'Classic bicep builder' },
          { name: 'Hammer Curls', muscle: 'Biceps', sets: '3', reps: '10-12', description: 'Targets brachialis and forearms' }
        ]
      },
      {
        name: 'Leg Day 1',
        exercises: [
          { name: 'Squat', muscle: 'Quads', sets: '4', reps: '6-10', description: 'King of leg exercises, full lower body' },
          { name: 'Romanian Deadlift', muscle: 'Hamstrings', sets: '3', reps: '8-12', description: 'Targets hamstrings and glutes' },
          { name: 'Leg Press', muscle: 'Quads', sets: '3', reps: '10-15', description: 'Machine exercise for overall leg development' },
          { name: 'Leg Curls', muscle: 'Hamstrings', sets: '3', reps: '12-15', description: 'Isolation for hamstrings' },
          { name: 'Lunges', muscle: 'Quads/Glutes', sets: '3', reps: '10-12 each', description: 'Unilateral leg exercise for balance and strength' },
          { name: 'Calf Raises', muscle: 'Calves', sets: '4', reps: '15-20', description: 'Targets calf muscles' }
        ]
      }
    ]
  },
  upperlower: {
    name: 'Upper/Lower 4x/Week',
    description: 'Balanced approach for strength and size. Train 4 days per week alternating upper and lower body.',
    frequency: '4x per week (Upper/Lower/Rest/Upper/Lower/Rest/Rest)',
    sessions: [
      {
        name: 'Upper Body 1 - Strength',
        exercises: [
          { name: 'Bench Press', muscle: 'Chest', sets: '4', reps: '5-8', description: 'Compound movement for overall chest development' },
          { name: 'Barbell Row', muscle: 'Back', sets: '4', reps: '6-8', description: 'Compound movement for back thickness' },
          { name: 'Overhead Press', muscle: 'Shoulders', sets: '3', reps: '6-8', description: 'Compound movement for shoulder development' },
          { name: 'Pull-ups', muscle: 'Back', sets: '3', reps: '6-10', description: 'Bodyweight exercise for lats and upper back' },
          { name: 'Barbell Curl', muscle: 'Biceps', sets: '3', reps: '8-10', description: 'Classic bicep builder' },
          { name: 'Skull Crushers', muscle: 'Triceps', sets: '3', reps: '8-10', description: 'Isolation exercise for triceps' }
        ]
      },
      {
        name: 'Lower Body 1 - Strength',
        exercises: [
          { name: 'Squat', muscle: 'Quads', sets: '4', reps: '5-8', description: 'King of leg exercises, full lower body' },
          { name: 'Romanian Deadlift', muscle: 'Hamstrings', sets: '4', reps: '6-8', description: 'Targets hamstrings and glutes' },
          { name: 'Leg Press', muscle: 'Quads', sets: '3', reps: '10-12', description: 'Machine exercise for overall leg development' },
          { name: 'Leg Curls', muscle: 'Hamstrings', sets: '3', reps: '10-12', description: 'Isolation for hamstrings' },
          { name: 'Calf Raises', muscle: 'Calves', sets: '4', reps: '12-15', description: 'Targets calf muscles' },
          { name: 'Plank', muscle: 'Core', sets: '3', reps: '45-60s', description: 'Isometric core stability exercise' }
        ]
      },
      {
        name: 'Upper Body 2 - Hypertrophy',
        exercises: [
          { name: 'Incline Dumbbell Press', muscle: 'Chest', sets: '4', reps: '8-12', description: 'Targets upper chest' },
          { name: 'Lat Pulldown', muscle: 'Back', sets: '4', reps: '10-12', description: 'Machine exercise for lat development' },
          { name: 'Arnold Press', muscle: 'Shoulders', sets: '3', reps: '10-12', description: 'Dumbbell variation hitting all delt heads' },
          { name: 'Cable Flyes', muscle: 'Chest', sets: '3', reps: '12-15', description: 'Isolation exercise for chest definition' },
          { name: 'Hammer Curls', muscle: 'Biceps', sets: '3', reps: '10-12', description: 'Targets brachialis and forearms' },
          { name: 'Tricep Pushdowns', muscle: 'Triceps', sets: '3', reps: '12-15', description: 'Cable isolation for triceps' }
        ]
      },
      {
        name: 'Lower Body 2 - Hypertrophy',
        exercises: [
          { name: 'Deadlift', muscle: 'Back/Legs', sets: '3', reps: '6-8', description: 'Full body compound movement' },
          { name: 'Lunges', muscle: 'Quads/Glutes', sets: '3', reps: '10-12 each', description: 'Unilateral leg exercise for balance and strength' },
          { name: 'Leg Press', muscle: 'Quads', sets: '3', reps: '12-15', description: 'Machine exercise for overall leg development' },
          { name: 'Leg Curls', muscle: 'Hamstrings', sets: '3', reps: '12-15', description: 'Isolation for hamstrings' },
          { name: 'Calf Raises', muscle: 'Calves', sets: '4', reps: '15-20', description: 'Targets calf muscles' },
          { name: 'Cable Crunches', muscle: 'Core', sets: '3', reps: '15-20', description: 'Weighted ab exercise' }
        ]
      }
    ]
  },
  strength: {
    name: 'Strength Building 4x/Week',
    description: 'Focus on building maximum strength with compound movements. Lower reps, heavier weights.',
    frequency: '4x per week (Mon/Tue/Thu/Fri)',
    sessions: [
      {
        name: 'Day 1 - Squat Focus',
        exercises: [
          { name: 'Squat', muscle: 'Legs', sets: '5', reps: '3-5', description: 'Heavy squats for strength' },
          { name: 'Bench Press', muscle: 'Chest', sets: '4', reps: '5-8', description: 'Compound chest movement' },
          { name: 'Barbell Row', muscle: 'Back', sets: '4', reps: '6-8', description: 'Back thickness builder' },
          { name: 'Overhead Press', muscle: 'Shoulders', sets: '3', reps: '6-8', description: 'Shoulder strength' },
          { name: 'Plank', muscle: 'Core', sets: '3', reps: '60s', description: 'Core stability' }
        ]
      },
      {
        name: 'Day 2 - Bench Focus',
        exercises: [
          { name: 'Bench Press', muscle: 'Chest', sets: '5', reps: '3-5', description: 'Heavy bench for strength' },
          { name: 'Romanian Deadlift', muscle: 'Hamstrings', sets: '4', reps: '6-8', description: 'Hamstring and glute strength' },
          { name: 'Pull-ups', muscle: 'Back', sets: '4', reps: '5-8', description: 'Weighted if possible' },
          { name: 'Tricep Dips', muscle: 'Triceps', sets: '3', reps: '6-10', description: 'Tricep strength' },
          { name: 'Barbell Curl', muscle: 'Biceps', sets: '3', reps: '6-8', description: 'Bicep strength' }
        ]
      },
      {
        name: 'Day 3 - Deadlift Focus',
        exercises: [
          { name: 'Deadlift', muscle: 'Back/Legs', sets: '5', reps: '3-5', description: 'Heavy deadlifts for strength' },
          { name: 'Overhead Press', muscle: 'Shoulders', sets: '4', reps: '5-8', description: 'Shoulder strength' },
          { name: 'Leg Press', muscle: 'Legs', sets: '4', reps: '8-10', description: 'Leg volume work' },
          { name: 'Lat Pulldown', muscle: 'Back', sets: '3', reps: '8-10', description: 'Lat development' },
          { name: 'Hanging Leg Raises', muscle: 'Core', sets: '3', reps: '10-12', description: 'Core strength' }
        ]
      },
      {
        name: 'Day 4 - Volume Day',
        exercises: [
          { name: 'Squat', muscle: 'Legs', sets: '4', reps: '8-10', description: 'Volume squats' },
          { name: 'Incline Bench Press', muscle: 'Chest', sets: '4', reps: '8-10', description: 'Upper chest volume' },
          { name: 'Barbell Row', muscle: 'Back', sets: '4', reps: '8-10', description: 'Back volume' },
          { name: 'Lunges', muscle: 'Legs', sets: '3', reps: '10-12 each', description: 'Leg accessory' },
          { name: 'Face Pulls', muscle: 'Rear Delts', sets: '3', reps: '15-20', description: 'Shoulder health' }
        ]
      }
    ]
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  updateStats();
  renderWorkouts();
  renderCardio();
  renderExerciseLibrary();
  setupEventListeners();
  populateExerciseFilter();
});

function updateDate() {
  const dateElement = document.getElementById('current-date');
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = today.toLocaleDateString('en-US', options);
}

function updateStats() {
  const streak = calculateStreak();
  const weekWorkouts = getWeekWorkouts();
  document.getElementById('streak').textContent = `${streak} days`;
  document.getElementById('week-workouts').textContent = `${weekWorkouts} workouts`;
}

function calculateStreak() {
  if (workouts.length === 0 && cardioSessions.length === 0) return 0;
  
  const allDates = [...workouts, ...cardioSessions]
    .map(w => new Date(w.date).toDateString())
    .sort((a, b) => new Date(b) - new Date(a));
  
  const uniqueDates = [...new Set(allDates)];
  let streak = 0;
  const today = new Date().toDateString();
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - i);
    if (uniqueDates.includes(checkDate.toDateString())) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function getWeekWorkouts() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  return [...workouts, ...cardioSessions].filter(w => 
    new Date(w.date) >= weekAgo
  ).length;
}

function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${tab}-tab`).classList.add('active');
      
      if (tab === 'progress') {
        renderWeeklySummary();
      } else if (tab === 'bodyweight') {
        renderBodyWeights();
      }
    });
  });

  // Workout modal
  document.getElementById('new-workout-btn').addEventListener('click', openWorkoutModal);
  document.querySelectorAll('#workout-modal .close-btn, #cancel-workout-btn').forEach(btn => {
    btn.addEventListener('click', closeWorkoutModal);
  });
  document.getElementById('save-workout-btn').addEventListener('click', saveWorkout);
  document.getElementById('add-exercise-btn').addEventListener('click', addExerciseEntry);

  // Cardio modal
  document.getElementById('new-cardio-btn').addEventListener('click', openCardioModal);
  document.querySelectorAll('#cardio-modal .close-btn, #cancel-cardio-btn').forEach(btn => {
    btn.addEventListener('click', closeCardioModal);
  });
  document.getElementById('save-cardio-btn').addEventListener('click', saveCardio);

  // Body weight modal
  document.getElementById('log-weight-btn').addEventListener('click', openWeightModal);
  document.querySelectorAll('#weight-modal .close-btn, #cancel-weight-btn').forEach(btn => {
    btn.addEventListener('click', closeWeightModal);
  });
  document.getElementById('save-weight-btn').addEventListener('click', saveBodyWeight);

  // Exercise filter
  document.getElementById('muscle-filter').addEventListener('change', renderExerciseLibrary);
  document.getElementById('exercise-filter').addEventListener('change', renderProgressChart);
  document.getElementById('workout-type-filter').addEventListener('change', renderWorkoutRecommendations);
  document.getElementById('program-filter').addEventListener('change', renderProgramDetails);
}

function openWorkoutModal() {
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = '';
  document.getElementById('exercises-container').innerHTML = '';
  
  // Show workout suggestions
  showWorkoutSuggestions();
}

function showWorkoutSuggestions() {
  const container = document.getElementById('exercises-container');
  
  // Analyze recent workouts to suggest what to train
  const suggestion = getWorkoutSuggestion();
  
  container.innerHTML = `
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px; color: white;">
      <h3 style="margin-bottom: 10px; font-size: 1.2rem;">💡 Suggested for Today</h3>
      <p style="margin-bottom: 15px; opacity: 0.95; font-size: 0.95rem;">${suggestion.reason}</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        ${suggestion.workouts.map(workout => `
          <button 
            onclick="loadSuggestedWorkout('${workout.type}')" 
            style="background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.4); color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
            onmouseover="this.style.background='rgba(255,255,255,0.3)'"
            onmouseout="this.style.background='rgba(255,255,255,0.2)'"
          >
            ${workout.name}
          </button>
        `).join('')}
      </div>
      <button 
        onclick="document.getElementById('exercises-container').innerHTML=''; addExerciseEntry();" 
        style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 15px; font-size: 0.9rem;"
      >
        Or create custom workout
      </button>
    </div>
  `;
}

function getWorkoutSuggestion() {
  // Get workouts from last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);
  
  // Analyze what muscle groups were trained
  const trainedMuscles = {
    chest: 0,
    back: 0,
    legs: 0,
    shoulders: 0,
    arms: 0
  };
  
  recentWorkouts.forEach(workout => {
    workout.exercises.forEach(ex => {
      const name = ex.name.toLowerCase();
      if (name.includes('bench') || name.includes('chest') || name.includes('fly') || name.includes('press') && name.includes('incline')) {
        trainedMuscles.chest++;
      }
      if (name.includes('row') || name.includes('pull') || name.includes('deadlift') || name.includes('lat')) {
        trainedMuscles.back++;
      }
      if (name.includes('squat') || name.includes('leg') || name.includes('lunge') || name.includes('calf')) {
        trainedMuscles.legs++;
      }
      if (name.includes('shoulder') || name.includes('overhead') || name.includes('lateral') || name.includes('arnold')) {
        trainedMuscles.shoulders++;
      }
      if (name.includes('curl') || name.includes('tricep') || name.includes('dip')) {
        trainedMuscles.arms++;
      }
    });
  });
  
  // Check what was trained yesterday or today
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const veryRecentWorkouts = workouts.filter(w => new Date(w.date) >= yesterday);
  
  let recentFocus = '';
  if (veryRecentWorkouts.length > 0) {
    const lastWorkout = veryRecentWorkouts[0];
    const exercises = lastWorkout.exercises.map(e => e.name.toLowerCase()).join(' ');
    
    if (exercises.includes('chest') || exercises.includes('bench')) {
      recentFocus = 'chest';
    } else if (exercises.includes('back') || exercises.includes('pull') || exercises.includes('row')) {
      recentFocus = 'back';
    } else if (exercises.includes('leg') || exercises.includes('squat')) {
      recentFocus = 'legs';
    }
  }
  
  // Determine suggestion based on analysis
  if (recentWorkouts.length === 0) {
    return {
      reason: "Welcome! Start with a balanced full body workout to establish your baseline.",
      workouts: [
        { name: 'Full Body Workout', type: 'fullbody' },
        { name: 'Upper Body', type: 'upper' },
        { name: 'Lower Body', type: 'lower' }
      ]
    };
  }
  
  if (recentFocus === 'chest') {
    return {
      reason: "You trained chest/push recently. Time to balance with back and pulling movements!",
      workouts: [
        { name: 'Pull Day', type: 'pull' },
        { name: 'Leg Day', type: 'legs' },
        { name: 'Back Focus', type: 'pull' }
      ]
    };
  }
  
  if (recentFocus === 'back') {
    return {
      reason: "You trained back recently. Let's hit legs or push movements today!",
      workouts: [
        { name: 'Push Day', type: 'push' },
        { name: 'Leg Day', type: 'legs' },
        { name: 'Upper Body', type: 'upper' }
      ]
    };
  }
  
  if (recentFocus === 'legs') {
    return {
      reason: "Legs are recovering. Perfect time for upper body work!",
      workouts: [
        { name: 'Push Day', type: 'push' },
        { name: 'Pull Day', type: 'pull' },
        { name: 'Upper Body', type: 'upper' }
      ]
    };
  }
  
  // Find least trained muscle group
  const leastTrained = Object.entries(trainedMuscles).sort((a, b) => a[1] - b[1])[0][0];
  
  if (leastTrained === 'legs') {
    return {
      reason: "Your legs haven't been trained much this week. Don't skip leg day!",
      workouts: [
        { name: 'Leg Day', type: 'legs' },
        { name: 'Lower Body', type: 'lower' },
        { name: 'Full Body', type: 'fullbody' }
      ]
    };
  }
  
  if (leastTrained === 'back') {
    return {
      reason: "Time to focus on back development for a balanced physique.",
      workouts: [
        { name: 'Pull Day', type: 'pull' },
        { name: 'Back & Biceps', type: 'pull' },
        { name: 'Upper Body', type: 'upper' }
      ]
    };
  }
  
  if (leastTrained === 'chest') {
    return {
      reason: "Let's build that chest! Push day is calling.",
      workouts: [
        { name: 'Push Day', type: 'push' },
        { name: 'Chest & Triceps', type: 'push' },
        { name: 'Upper Body', type: 'upper' }
      ]
    };
  }
  
  // Default balanced suggestion
  return {
    reason: "You're training consistently! Here are some balanced options for today.",
    workouts: [
      { name: 'Push Day', type: 'push' },
      { name: 'Pull Day', type: 'pull' },
      { name: 'Leg Day', type: 'legs' }
    ]
  };
}

function loadSuggestedWorkout(workoutType) {
  const workout = workoutTemplates[workoutType];
  
  document.getElementById('workout-name').value = workout.name;
  
  // Clear and rebuild exercises container
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the template
  workout.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <input type="text" class="exercise-name" value="${ex.name}" />
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Show previous performance for this exercise
    const exerciseInput = entry.querySelector('.exercise-name');
    showPreviousPerformance(exerciseInput);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
}

function closeWorkoutModal() {
  document.getElementById('workout-modal').classList.remove('active');
}

function addExerciseEntry() {
  const container = document.getElementById('exercises-container');
  const entry = document.createElement('div');
  entry.className = 'exercise-entry';
  entry.innerHTML = `
    <input type="text" class="exercise-name" placeholder="Exercise name" />
    <div class="previous-performance"></div>
    <div class="sets-container"></div>
    <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
    <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
  `;
  container.appendChild(entry);
  
  // Add event listener to show previous performance when exercise name changes
  const exerciseInput = entry.querySelector('.exercise-name');
  exerciseInput.addEventListener('blur', function() {
    showPreviousPerformance(this);
  });
  
  addSet(entry.querySelector('.add-set-btn'));
}

// Calculate estimated 1RM using Epley formula
function calculate1RM(weight, reps) {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

// Get weight recommendation based on previous performance and target reps
function getWeightRecommendation(exerciseName, targetReps) {
  const exerciseNameLower = exerciseName.toLowerCase();
  
  // Find all previous performances of this exercise
  const performances = [];
  workouts.forEach(workout => {
    const exercise = workout.exercises.find(ex => ex.name.toLowerCase() === exerciseNameLower);
    if (exercise && exercise.sets) {
      exercise.sets.forEach(set => {
        if (set.weight > 0 && set.reps > 0) {
          performances.push({
            weight: set.weight,
            reps: set.reps,
            estimated1RM: calculate1RM(set.weight, set.reps)
          });
        }
      });
    }
  });
  
  if (performances.length === 0) return null;
  
  // Get the highest estimated 1RM
  const max1RM = Math.max(...performances.map(p => p.estimated1RM));
  
  // Calculate recommended weight based on target reps
  // Using reverse Epley formula: weight = 1RM / (1 + reps/30)
  let recommendedWeight = max1RM / (1 + targetReps / 30);
  
  // Round to nearest 0.5kg
  recommendedWeight = Math.round(recommendedWeight * 2) / 2;
  
  return {
    weight: recommendedWeight,
    estimated1RM: max1RM,
    basedOn: performances[0]
  };
}

function showPreviousPerformance(exerciseInput) {
  const exerciseName = exerciseInput.value.trim().toLowerCase();
  if (!exerciseName) return;
  
  const performanceDiv = exerciseInput.parentElement.querySelector('.previous-performance');
  const exerciseEntry = exerciseInput.closest('.exercise-entry');
  
  // Store exercise name for weight recommendations
  if (exerciseEntry) {
    exerciseEntry.dataset.exerciseName = exerciseName;
  }
  
  // Find the most recent workout with this exercise
  let lastPerformance = null;
  for (const workout of workouts) {
    const exercise = workout.exercises.find(ex => ex.name.toLowerCase() === exerciseName);
    if (exercise) {
      lastPerformance = {
        date: workout.date,
        sets: exercise.sets
      };
      break;
    }
  }
  
  if (lastPerformance) {
    const setsInfo = lastPerformance.sets.map((set, i) => 
      `Set ${i + 1}: ${set.reps} reps × ${set.weight}kg`
    ).join(' | ');
    
    // Calculate estimated 1RM from best set
    const bestSet = lastPerformance.sets.reduce((best, set) => {
      const current1RM = calculate1RM(set.weight, set.reps);
      const best1RM = calculate1RM(best.weight, best.reps);
      return current1RM > best1RM ? set : best;
    });
    const estimated1RM = calculate1RM(bestSet.weight, bestSet.reps);
    
    performanceDiv.innerHTML = `
      <div style="background: #e0f2fe; border-left: 4px solid var(--info); padding: 12px; border-radius: 6px; margin: 10px 0;">
        <strong style="color: var(--dark); display: block; margin-bottom: 5px;">📊 Last Performance (${formatDate(lastPerformance.date)})</strong>
        <div style="color: var(--text); font-size: 0.9rem;">${setsInfo}</div>
        <div style="color: var(--text-light); font-size: 0.85rem; margin-top: 5px;">
          💪 Estimated 1RM: ${estimated1RM.toFixed(1)}kg | Try to beat these numbers!
        </div>
      </div>
    `;
  } else {
    performanceDiv.innerHTML = `
      <div style="background: var(--light); padding: 10px; border-radius: 6px; margin: 10px 0;">
        <span style="color: var(--text-light); font-size: 0.9rem;">✨ First time doing this exercise!</span>
      </div>
    `;
  }
}

function addSet(btn) {
  const setsContainer = btn.previousElementSibling;
  const setNumber = setsContainer.children.length + 1;
  const exerciseEntry = btn.closest('.exercise-entry');
  const exerciseName = exerciseEntry?.dataset.exerciseName || exerciseEntry?.querySelector('.exercise-name')?.value.trim();
  
  const setRow = document.createElement('div');
  setRow.className = 'set-row';
  
  // Get weight recommendation based on typical rep ranges
  let weightRecommendation = '';
  if (exerciseName) {
    // Try different rep ranges to get recommendations
    const strengthRec = getWeightRecommendation(exerciseName, 5);
    const hypertrophyRec = getWeightRecommendation(exerciseName, 10);
    
    if (strengthRec || hypertrophyRec) {
      const rec = strengthRec || hypertrophyRec;
      weightRecommendation = `
        <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 2px;">
          💡 Suggested: ${rec.weight}kg (based on ${rec.estimated1RM.toFixed(1)}kg 1RM)
        </div>
      `;
    }
  }
  
  setRow.innerHTML = `
    <span>Set ${setNumber}</span>
    <input type="number" placeholder="Reps" min="1" class="reps-input" onchange="updateWeightSuggestion(this)" />
    <div style="display: flex; flex-direction: column; flex: 1;">
      <input type="number" placeholder="Weight (kg)" step="0.5" min="0" class="weight-input" />
      ${weightRecommendation}
    </div>
    <button class="remove-btn" onclick="removeSet(this)">×</button>
  `;
  setsContainer.appendChild(setRow);
}

// Update weight suggestion when reps change
function updateWeightSuggestion(repsInput) {
  const setRow = repsInput.closest('.set-row');
  const exerciseEntry = repsInput.closest('.exercise-entry');
  const exerciseName = exerciseEntry?.dataset.exerciseName || exerciseEntry?.querySelector('.exercise-name')?.value.trim();
  const targetReps = parseInt(repsInput.value);
  
  if (!exerciseName || !targetReps) return;
  
  const recommendation = getWeightRecommendation(exerciseName, targetReps);
  
  if (recommendation) {
    const weightInputContainer = setRow.querySelector('.weight-input').parentElement;
    const existingSuggestion = weightInputContainer.querySelector('div');
    
    const suggestionHTML = `
      <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 2px;">
        💡 Suggested: ${recommendation.weight}kg for ${targetReps} reps (1RM: ${recommendation.estimated1RM.toFixed(1)}kg)
      </div>
    `;
    
    if (existingSuggestion) {
      existingSuggestion.outerHTML = suggestionHTML;
    } else {
      weightInputContainer.insertAdjacentHTML('beforeend', suggestionHTML);
    }
  }
}

function removeSet(btn) {
  btn.parentElement.remove();
}

function removeExercise(btn) {
  btn.parentElement.remove();
}

function saveWorkout() {
  const name = document.getElementById('workout-name').value.trim();
  if (!name) {
    alert('Please enter a workout name');
    return;
  }

  const exercises = [];
  document.querySelectorAll('.exercise-entry').forEach(entry => {
    const exerciseName = entry.querySelector('.exercise-name').value.trim();
    if (!exerciseName) return;

    const sets = [];
    entry.querySelectorAll('.set-row').forEach(row => {
      const inputs = row.querySelectorAll('input');
      const reps = parseInt(inputs[0].value);
      const weight = parseFloat(inputs[1].value);
      if (reps && weight >= 0) {
        sets.push({ reps, weight });
      }
    });

    if (sets.length > 0) {
      exercises.push({ name: exerciseName, sets });
    }
  });

  if (exercises.length === 0) {
    alert('Please add at least one exercise with sets');
    return;
  }

  const workout = {
    id: Date.now(),
    name,
    exercises,
    date: new Date().toISOString()
  };

  workouts.unshift(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  
  closeWorkoutModal();
  renderWorkouts();
  updateStats();
  populateExerciseFilter();
}

function renderWorkouts() {
  const container = document.getElementById('workout-list');
  
  if (workouts.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No workouts yet</p><p>Start tracking your gym sessions!</p></div>';
    return;
  }

  container.innerHTML = workouts.map(workout => `
    <div class="workout-item">
      <div class="workout-header">
        <span class="workout-name">${workout.name}</span>
        <span class="workout-date">${formatDate(workout.date)}</span>
      </div>
      ${workout.exercises.map(ex => `
        <div style="margin-left: 15px; margin-top: 10px;">
          <strong>${ex.name}</strong>
          <div style="margin-left: 15px; color: var(--text-light);">
            ${ex.sets.map((set, i) => `Set ${i + 1}: ${set.reps} reps × ${set.weight}kg`).join('<br>')}
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function openCardioModal() {
  document.getElementById('cardio-modal').classList.add('active');
  document.getElementById('cardio-type').value = 'running';
  document.getElementById('cardio-duration').value = '';
  document.getElementById('cardio-distance').value = '';
  document.getElementById('cardio-notes').value = '';
}

function closeCardioModal() {
  document.getElementById('cardio-modal').classList.remove('active');
}

function saveCardio() {
  const type = document.getElementById('cardio-type').value;
  const duration = parseInt(document.getElementById('cardio-duration').value);
  const distance = parseFloat(document.getElementById('cardio-distance').value) || null;
  const notes = document.getElementById('cardio-notes').value.trim();

  if (!duration || duration <= 0) {
    alert('Please enter a valid duration');
    return;
  }

  const cardio = {
    id: Date.now(),
    type,
    duration,
    distance,
    notes,
    date: new Date().toISOString()
  };

  cardioSessions.unshift(cardio);
  localStorage.setItem('cardio', JSON.stringify(cardioSessions));
  
  closeCardioModal();
  renderCardio();
  updateStats();
}

function renderCardio() {
  const container = document.getElementById('cardio-list');
  
  if (cardioSessions.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No cardio sessions yet</p><p>Log your first cardio workout!</p></div>';
    return;
  }

  container.innerHTML = cardioSessions.map(cardio => `
    <div class="cardio-item">
      <div class="workout-header">
        <span class="workout-name">${cardio.type.charAt(0).toUpperCase() + cardio.type.slice(1)}</span>
        <span class="workout-date">${formatDate(cardio.date)}</span>
      </div>
      <div style="margin-top: 10px; color: var(--text-light);">
        Duration: ${cardio.duration} minutes
        ${cardio.distance ? `<br>Distance: ${cardio.distance} km` : ''}
        ${cardio.notes ? `<br>Notes: ${cardio.notes}` : ''}
      </div>
    </div>
  `).join('');
}

// Body Weight Functions
function openWeightModal() {
  document.getElementById('weight-modal').classList.add('active');
  document.getElementById('weight-value').value = '';
  document.getElementById('weight-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('weight-notes').value = '';
}

function closeWeightModal() {
  document.getElementById('weight-modal').classList.remove('active');
}

function saveBodyWeight() {
  const weight = parseFloat(document.getElementById('weight-value').value);
  const date = document.getElementById('weight-date').value;
  const notes = document.getElementById('weight-notes').value.trim();

  if (!weight || weight <= 0) {
    alert('Please enter a valid weight');
    return;
  }

  if (!date) {
    alert('Please select a date');
    return;
  }

  const weightEntry = {
    id: Date.now(),
    weight,
    date: new Date(date).toISOString(),
    notes
  };

  bodyWeights.push(weightEntry);
  bodyWeights.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('bodyWeights', JSON.stringify(bodyWeights));
  
  closeWeightModal();
  renderBodyWeights();
}

function renderBodyWeights() {
  renderWeightStats();
  renderWeightChart();
  renderWeightList();
}

function renderWeightStats() {
  const container = document.getElementById('weight-stats');
  
  if (bodyWeights.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No weight data yet</p></div>';
    return;
  }

  const sortedWeights = [...bodyWeights].sort((a, b) => new Date(a.date) - new Date(b.date));
  const currentWeight = sortedWeights[sortedWeights.length - 1].weight;
  const startWeight = sortedWeights[0].weight;
  const change = currentWeight - startWeight;
  const changePercent = ((change / startWeight) * 100).toFixed(1);
  
  // Calculate 30-day change
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentWeights = sortedWeights.filter(w => new Date(w.date) >= thirtyDaysAgo);
  const thirtyDayChange = recentWeights.length > 1 
    ? (recentWeights[recentWeights.length - 1].weight - recentWeights[0].weight).toFixed(1)
    : 0;
  
  // Determine goal status
  let goalStatus = '📊 Tracking';
  let goalColor = 'var(--info)';
  if (change > 0) {
    goalStatus = '📈 Bulking';
    goalColor = 'var(--success)';
  } else if (change < 0) {
    goalStatus = '📉 Cutting';
    goalColor = 'var(--primary)';
  }

  container.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid ${goalColor};">
      <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Current Weight</div>
      <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${currentWeight} kg</div>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid ${change >= 0 ? 'var(--success)' : 'var(--primary)'};">
      <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Total Change</div>
      <div style="font-size: 2rem; font-weight: bold; color: ${change >= 0 ? 'var(--success)' : 'var(--primary)'};">
        ${change >= 0 ? '+' : ''}${change.toFixed(1)} kg
      </div>
      <div style="font-size: 0.85rem; color: var(--text-light); margin-top: 5px;">
        ${change >= 0 ? '+' : ''}${changePercent}%
      </div>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid var(--warning);">
      <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">30-Day Change</div>
      <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">
        ${thirtyDayChange >= 0 ? '+' : ''}${thirtyDayChange} kg
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, ${goalColor} 0%, ${goalColor}dd 100%); padding: 20px; border-radius: 12px; color: white;">
      <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 5px;">Status</div>
      <div style="font-size: 1.5rem; font-weight: bold;">${goalStatus}</div>
    </div>
  `;
}

function renderWeightChart() {
  const container = document.getElementById('weight-chart');
  
  if (bodyWeights.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Log your weight to see progress chart</p></div>';
    return;
  }

  const sortedWeights = [...bodyWeights].sort((a, b) => new Date(a.date) - new Date(b.date));
  const maxWeight = Math.max(...sortedWeights.map(w => w.weight));
  const minWeight = Math.min(...sortedWeights.map(w => w.weight));
  const range = maxWeight - minWeight || 1;
  
  const chartHTML = sortedWeights.map((entry, index) => {
    const height = ((entry.weight - minWeight) / range) * 100;
    const date = new Date(entry.date);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    
    return `
      <div style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 40px;">
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--dark); margin-bottom: 5px;">
          ${entry.weight}
        </div>
        <div style="width: 100%; height: 200px; display: flex; align-items: flex-end; justify-content: center;">
          <div style="
            width: 80%;
            height: ${Math.max(height, 5)}%;
            background: linear-gradient(to top, var(--primary), var(--secondary));
            border-radius: 8px 8px 0 0;
            transition: all 0.3s ease;
            cursor: pointer;
          " title="${entry.weight}kg on ${formatDate(entry.date)}"></div>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-light); margin-top: 5px;">
          ${dateStr}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <div style="display: flex; gap: 5px; overflow-x: auto; padding: 10px 0;">
        ${chartHTML}
      </div>
      <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 2px solid var(--border);">
        <span style="color: var(--text-light); font-size: 0.9rem;">
          Range: ${minWeight.toFixed(1)}kg - ${maxWeight.toFixed(1)}kg
        </span>
      </div>
    </div>
  `;
}

function renderWeightList() {
  const container = document.getElementById('weight-list');
  
  if (bodyWeights.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No weight entries yet</p><p>Start tracking your body weight!</p></div>';
    return;
  }

  const sortedWeights = [...bodyWeights].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  container.innerHTML = sortedWeights.map((entry, index) => {
    const prevEntry = sortedWeights[index + 1];
    const change = prevEntry ? (entry.weight - prevEntry.weight).toFixed(1) : null;
    
    return `
      <div class="cardio-item">
        <div class="workout-header">
          <span class="workout-name">${entry.weight} kg</span>
          <span class="workout-date">${formatDate(entry.date)}</span>
        </div>
        ${change !== null ? `
          <div style="margin-top: 8px;">
            <span style="
              display: inline-block;
              padding: 4px 10px;
              border-radius: 12px;
              font-size: 0.85rem;
              font-weight: 600;
              background: ${change >= 0 ? '#d1fae5' : '#dbeafe'};
              color: ${change >= 0 ? '#065f46' : '#1e40af'};
            ">
              ${change >= 0 ? '↑' : '↓'} ${Math.abs(change)} kg from previous
            </span>
          </div>
        ` : ''}
        ${entry.notes ? `
          <div style="margin-top: 10px; color: var(--text-light); font-size: 0.9rem;">
            ${entry.notes}
          </div>
        ` : ''}
        <button 
          onclick="deleteWeight(${entry.id})" 
          style="margin-top: 10px; padding: 6px 12px; background: var(--danger); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;"
        >
          Delete
        </button>
      </div>
    `;
  }).join('');
}

function deleteWeight(id) {
  if (!confirm('Delete this weight entry?')) return;
  
  bodyWeights = bodyWeights.filter(w => w.id !== id);
  localStorage.setItem('bodyWeights', JSON.stringify(bodyWeights));
  renderBodyWeights();
}

function populateExerciseFilter() {
  const select = document.getElementById('exercise-filter');
  const exercises = new Set();
  
  workouts.forEach(workout => {
    workout.exercises.forEach(ex => exercises.add(ex.name));
  });

  select.innerHTML = '<option value="">Select exercise to view progress</option>' +
    Array.from(exercises).sort().map(ex => `<option value="${ex}">${ex}</option>`).join('');
}

function renderProgressChart() {
  const exerciseName = document.getElementById('exercise-filter').value;
  const container = document.getElementById('progress-chart');
  
  if (!exerciseName) {
    container.innerHTML = '<div class="empty-state"><p>Select an exercise to view progress</p></div>';
    return;
  }

  const data = [];
  workouts.forEach(workout => {
    const exercise = workout.exercises.find(ex => ex.name === exerciseName);
    if (exercise) {
      const maxWeight = Math.max(...exercise.sets.map(s => s.weight));
      data.push({ date: workout.date, weight: maxWeight });
    }
  });

  data.reverse();

  if (data.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No data for this exercise</p></div>';
    return;
  }

  container.innerHTML = data.map(entry => `
    <div class="progress-entry">
      <span class="progress-date">${formatDate(entry.date)}</span>
      <span class="progress-weight">${entry.weight}kg</span>
    </div>
  `).join('');
}

function renderWeeklySummary() {
  const container = document.getElementById('weekly-summary');
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const recentWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);
  const recentCardio = cardioSessions.filter(c => new Date(c.date) >= weekAgo);
  
  const totalSets = recentWorkouts.reduce((sum, w) => 
    sum + w.exercises.reduce((s, e) => s + e.sets.length, 0), 0
  );
  
  const totalCardioMinutes = recentCardio.reduce((sum, c) => sum + c.duration, 0);
  
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="text-align: center; padding: 20px; background: var(--light); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--primary);">${recentWorkouts.length}</div>
        <div style="color: var(--text-light);">Gym Sessions</div>
      </div>
      <div style="text-align: center; padding: 20px; background: var(--light); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--success);">${totalSets}</div>
        <div style="color: var(--text-light);">Total Sets</div>
      </div>
      <div style="text-align: center; padding: 20px; background: var(--light); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--warning);">${recentCardio.length}</div>
        <div style="color: var(--text-light);">Cardio Sessions</div>
      </div>
      <div style="text-align: center; padding: 20px; background: var(--light); border-radius: 8px;">
        <div style="font-size: 2rem; font-weight: bold; color: var(--secondary);">${totalCardioMinutes}</div>
        <div style="color: var(--text-light);">Cardio Minutes</div>
      </div>
    </div>
  `;
}

function renderExerciseLibrary() {
  const filter = document.getElementById('muscle-filter').value;
  const container = document.getElementById('exercise-library');
  
  const exercises = filter ? exerciseLibrary[filter] : 
    Object.entries(exerciseLibrary).flatMap(([muscle, exs]) => 
      exs.map(ex => ({ ...ex, muscle }))
    );

  container.innerHTML = exercises.map(ex => `
    <div class="exercise-card">
      <h3>${ex.name}</h3>
      ${ex.muscle ? `<span class="muscle-tag">${ex.muscle}</span>` : ''}
      <p>${ex.description}</p>
      ${ex.sets ? `<p style="color: var(--primary); font-weight: 600; margin-top: 8px;">Recommended: ${ex.sets} sets × ${ex.reps} reps</p>` : ''}
    </div>
  `).join('');
}

function renderProgramDetails() {
  const programKey = document.getElementById('program-filter').value;
  const container = document.getElementById('program-details');
  
  if (!programKey) {
    container.innerHTML = '<div class="empty-state"><p>Select a program to see details</p></div>';
    return;
  }

  const program = workoutPrograms[programKey];
  
  container.innerHTML = `
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; color: white;">
      <h3 style="margin-bottom: 10px; font-size: 1.5rem;">${program.name}</h3>
      <p style="margin-bottom: 15px; opacity: 0.95;">${program.description}</p>
      <div style="background: rgba(255,255,255,0.2); padding: 10px 15px; border-radius: 8px; display: inline-block;">
        <strong>📅 ${program.frequency}</strong>
      </div>
    </div>

    ${program.sessions.map((session, index) => `
      <div style="background: white; border: 2px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 style="color: var(--dark); margin: 0;">${session.name}</h3>
          <button class="btn-primary" onclick="useSessionWorkout('${programKey}', ${index})" style="padding: 8px 16px; font-size: 0.9rem;">
            Use This Session
          </button>
        </div>
        
        ${session.exercises.map((ex, exIndex) => `
          <div style="background: var(--light); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid var(--primary);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
              <div>
                <strong style="color: var(--dark); font-size: 1rem;">${exIndex + 1}. ${ex.name}</strong>
                <span class="muscle-tag" style="margin-left: 10px;">${ex.muscle}</span>
              </div>
              <span style="color: var(--primary); font-weight: 600; white-space: nowrap; font-size: 0.95rem;">${ex.sets} × ${ex.reps}</span>
            </div>
            <p style="color: var(--text-light); font-size: 0.9rem; margin: 0;">${ex.description}</p>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

function useSessionWorkout(programKey, sessionIndex) {
  const program = workoutPrograms[programKey];
  const session = program.sessions[sessionIndex];
  
  // Open workout modal
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = session.name;
  
  // Clear existing exercises
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the session
  session.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <input type="text" class="exercise-name" value="${ex.name}" />
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Show previous performance for this exercise
    const exerciseInput = entry.querySelector('.exercise-name');
    showPreviousPerformance(exerciseInput);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
}

function renderWorkoutRecommendations() {
  const workoutType = document.getElementById('workout-type-filter').value;
  const container = document.getElementById('workout-recommendations');
  
  if (!workoutType) {
    container.innerHTML = '<div class="empty-state"><p>Select a workout type to see recommendations</p></div>';
    return;
  }

  const workout = workoutTemplates[workoutType];
  
  container.innerHTML = `
    <div style="background: var(--light); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: var(--dark); margin-bottom: 10px;">${workout.name}</h3>
      <p style="color: var(--text-light); margin-bottom: 20px;">${workout.description}</p>
      
      ${workout.exercises.map((ex, index) => `
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div>
              <strong style="color: var(--dark); font-size: 1.05rem;">${index + 1}. ${ex.name}</strong>
              <span class="muscle-tag" style="margin-left: 10px;">${ex.muscle}</span>
            </div>
            <span style="color: var(--primary); font-weight: 600; white-space: nowrap;">${ex.sets} × ${ex.reps}</span>
          </div>
          <p style="color: var(--text-light); font-size: 0.95rem; margin: 0;">${ex.description}</p>
        </div>
      `).join('')}
      
      <button class="btn-primary" onclick="useRecommendedWorkout('${workoutType}')" style="width: 100%; margin-top: 10px;">
        Use This Workout
      </button>
    </div>
  `;
}

function useRecommendedWorkout(workoutType) {
  const workout = workoutTemplates[workoutType];
  
  // Open workout modal
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = workout.name;
  
  // Clear existing exercises
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the template
  workout.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <input type="text" class="exercise-name" value="${ex.name}" />
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Show previous performance for this exercise
    const exerciseInput = entry.querySelector('.exercise-name');
    showPreviousPerformance(exerciseInput);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Make functions global for inline onclick handlers
window.addSet = addSet;
window.removeSet = removeSet;
window.removeExercise = removeExercise;
window.useRecommendedWorkout = useRecommendedWorkout;
window.useSessionWorkout = useSessionWorkout;
window.loadSuggestedWorkout = loadSuggestedWorkout;

// ========== NEW FEATURES ==========

// Workout timer state
let workoutTimerInterval = null;
let workoutStartTime = null;
let workoutElapsedSeconds = 0;

// Rest timer state
let restTimerInterval = null;
let restTimeRemaining = 90;
let currentRestExercise = '';

// PR tracking
let personalRecords = JSON.parse(localStorage.getItem('personalRecords')) || {};

// Settings
let settings = JSON.parse(localStorage.getItem('settings')) || {
  defaultRestTime: 90,
  plateCalculatorBar: 20,
  enablePRNotifications: true
};

// Start workout timer
function startWorkoutTimer() {
  if (workoutTimerInterval) return;
  
  workoutStartTime = Date.now() - (workoutElapsedSeconds * 1000);
  document.getElementById('workout-timer').style.display = 'block';
  
  workoutTimerInterval = setInterval(() => {
    workoutElapsedSeconds = Math.floor((Date.now() - workoutStartTime) / 1000);
    const minutes = Math.floor(workoutElapsedSeconds / 60);
    const seconds = workoutElapsedSeconds % 60;
    document.getElementById('timer-display').textContent = 
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    updateLiveWorkoutStats();
  }, 1000);
}

// Update live workout stats (volume and sets)
function updateLiveWorkoutStats() {
  let totalVolume = 0;
  let completedSets = 0;
  
  document.querySelectorAll('.exercise-entry').forEach(entry => {
    entry.querySelectorAll('.set-row').forEach(row => {
      const inputs = row.querySelectorAll('input');
      const reps = parseInt(inputs[0].value) || 0;
      const weight = parseFloat(inputs[1].value) || 0;
      if (reps > 0 && weight > 0) {
        totalVolume += reps * weight;
        completedSets++;
      }
    });
  });
  
  document.getElementById('volume-display').textContent = `${totalVolume.toFixed(0)} kg`;
  document.getElementById('sets-display').textContent = completedSets;
}

// Stop workout timer
function stopWorkoutTimer() {
  if (workoutTimerInterval) {
    clearInterval(workoutTimerInterval);
    workoutTimerInterval = null;
  }
  workoutElapsedSeconds = 0;
  document.getElementById('workout-timer').style.display = 'none';
}

// Start rest timer
function startRestTimer(exerciseName, duration = settings.defaultRestTime) {
  currentRestExercise = exerciseName;
  restTimeRemaining = duration;
  
  document.getElementById('rest-timer-modal').classList.add('active');
  document.getElementById('rest-exercise-name').textContent = `Rest after ${exerciseName}`;
  document.getElementById('rest-countdown').textContent = restTimeRemaining;
  
  if (restTimerInterval) clearInterval(restTimerInterval);
  
  restTimerInterval = setInterval(() => {
    restTimeRemaining--;
    document.getElementById('rest-countdown').textContent = restTimeRemaining;
    
    if (restTimeRemaining <= 0) {
      closeRestTimer();
      // Play notification sound (optional)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Rest Complete!', {
          body: `Time for your next set of ${currentRestExercise}`,
          icon: '💪'
        });
      }
    }
  }, 1000);
}

function adjustRestTimer(seconds) {
  restTimeRemaining += seconds;
  if (restTimeRemaining < 0) restTimeRemaining = 0;
  document.getElementById('rest-countdown').textContent = restTimeRemaining;
}

function closeRestTimer() {
  if (restTimerInterval) {
    clearInterval(restTimerInterval);
    restTimerInterval = null;
  }
  document.getElementById('rest-timer-modal').classList.remove('active');
}

// Check for personal records
function checkForPRs(workout) {
  const newPRs = [];
  
  workout.exercises.forEach(exercise => {
    const exerciseName = exercise.name.toLowerCase();
    
    exercise.sets.forEach(set => {
      const weight = set.weight;
      const reps = set.reps;
      const volume = weight * reps;
      
      if (!personalRecords[exerciseName]) {
        personalRecords[exerciseName] = {
          maxWeight: weight,
          maxReps: reps,
          maxVolume: volume,
          date: workout.date
        };
        newPRs.push({ exercise: exercise.name, type: 'First Time!', value: `${weight}kg × ${reps}` });
      } else {
        const pr = personalRecords[exerciseName];
        
        if (weight > pr.maxWeight) {
          pr.maxWeight = weight;
          pr.date = workout.date;
          newPRs.push({ exercise: exercise.name, type: 'Max Weight', value: `${weight}kg` });
        }
        
        if (reps > pr.maxReps) {
          pr.maxReps = reps;
          pr.date = workout.date;
          newPRs.push({ exercise: exercise.name, type: 'Max Reps', value: `${reps} reps` });
        }
        
        if (volume > pr.maxVolume) {
          pr.maxVolume = volume;
          pr.date = workout.date;
          newPRs.push({ exercise: exercise.name, type: 'Max Volume', value: `${volume}kg total` });
        }
      }
    });
  });
  
  if (newPRs.length > 0 && settings.enablePRNotifications) {
    showPRCelebration(newPRs);
  }
  
  localStorage.setItem('personalRecords', JSON.stringify(personalRecords));
  return newPRs;
}

// Show PR celebration modal
function showPRCelebration(prs) {
  const prDetails = prs.map(pr => 
    `<div style="margin: 10px 0;"><strong>${pr.exercise}</strong><br>${pr.type}: ${pr.value}</div>`
  ).join('');
  
  document.getElementById('pr-details').innerHTML = prDetails;
  document.getElementById('pr-modal').classList.add('active');
}

function closePRModal() {
  document.getElementById('pr-modal').classList.remove('active');
}

// Render personal records
function renderPersonalRecords() {
  const filter = document.getElementById('pr-filter').value;
  const container = document.getElementById('personal-records');
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  let records = Object.entries(personalRecords);
  
  if (filter === 'recent') {
    records = records.filter(([_, pr]) => new Date(pr.date) >= thirtyDaysAgo);
  }
  
  if (records.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No personal records yet</p><p>Complete workouts to set your first PRs!</p></div>';
    return;
  }
  
  records.sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
  
  container.innerHTML = records.map(([exercise, pr]) => `
    <div style="background: var(--light); padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--success);">
      <h3 style="color: var(--dark); margin-bottom: 10px; text-transform: capitalize;">${exercise}</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
        <div>
          <div style="color: var(--text-light); font-size: 0.85rem;">Max Weight</div>
          <div style="color: var(--success); font-size: 1.5rem; font-weight: bold;">${pr.maxWeight}kg</div>
        </div>
        <div>
          <div style="color: var(--text-light); font-size: 0.85rem;">Max Reps</div>
          <div style="color: var(--primary); font-size: 1.5rem; font-weight: bold;">${pr.maxReps}</div>
        </div>
        <div>
          <div style="color: var(--text-light); font-size: 0.85rem;">Max Volume</div>
          <div style="color: var(--secondary); font-size: 1.5rem; font-weight: bold;">${pr.maxVolume}kg</div>
        </div>
      </div>
      <div style="margin-top: 10px; color: var(--text-light); font-size: 0.9rem;">Last PR: ${formatDate(pr.date)}</div>
    </div>
  `).join('');
}

// Plate calculator
function openPlateCalculator(targetWeight) {
  document.getElementById('plate-calculator-modal').classList.add('active');
  document.getElementById('plate-target-weight').value = targetWeight || '';
  calculatePlates();
  
  document.getElementById('plate-target-weight').addEventListener('input', calculatePlates);
  document.getElementById('plate-bar-weight').addEventListener('change', calculatePlates);
}

function closePlateCalculator() {
  document.getElementById('plate-calculator-modal').classList.remove('active');
}

function calculatePlates() {
  const targetWeight = parseFloat(document.getElementById('plate-target-weight').value);
  const barWeight = parseFloat(document.getElementById('plate-bar-weight').value);
  const resultDiv = document.getElementById('plate-result');
  
  if (!targetWeight || targetWeight <= barWeight) {
    resultDiv.innerHTML = '<div style="color: var(--text-light); padding: 20px; text-align: center;">Enter a target weight greater than the bar weight</div>';
    return;
  }
  
  const weightPerSide = (targetWeight - barWeight) / 2;
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5];
  const platesNeeded = [];
  let remaining = weightPerSide;
  
  for (const plate of availablePlates) {
    while (remaining >= plate) {
      platesNeeded.push(plate);
      remaining -= plate;
    }
  }
  
  if (remaining > 0.1) {
    resultDiv.innerHTML = `
      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid var(--warning);">
        <strong>⚠️ Cannot make exact weight</strong>
        <p style="margin: 10px 0 0 0;">Closest: ${(targetWeight - remaining * 2).toFixed(1)}kg</p>
      </div>
    `;
  }
  
  resultDiv.innerHTML += `
    <div style="background: var(--light); padding: 20px; border-radius: 8px; margin-top: 15px;">
      <strong style="display: block; margin-bottom: 15px; color: var(--dark);">Plates per side:</strong>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
        ${platesNeeded.map(plate => `
          <div style="background: var(--primary); color: white; padding: 15px 20px; border-radius: 8px; font-weight: bold; font-size: 1.2rem;">
            ${plate}kg
          </div>
        `).join('')}
      </div>
      ${platesNeeded.length === 0 ? '<div style="text-align: center; color: var(--text-light);">Just the bar!</div>' : ''}
    </div>
  `;
}

// Render workout calendar
function renderWorkoutCalendar() {
  const container = document.getElementById('workout-calendar');
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const workoutDates = new Set();
  [...workouts, ...cardioSessions].forEach(w => {
    const date = new Date(w.date);
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      workoutDates.add(date.getDate());
    }
  });
  
  let calendarHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h3 style="color: var(--dark);">${firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
    </div>
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px;">
      ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
        `<div style="text-align: center; font-weight: 600; color: var(--text-light); padding: 10px;">${day}</div>`
      ).join('')}
  `;
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarHTML += '<div></div>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today.getDate();
    const hasWorkout = workoutDates.has(day);
    
    calendarHTML += `
      <div style="
        text-align: center; 
        padding: 15px 10px; 
        border-radius: 8px;
        background: ${hasWorkout ? 'var(--success)' : 'var(--light)'};
        color: ${hasWorkout ? 'white' : 'var(--text)'};
        font-weight: ${isToday ? 'bold' : 'normal'};
        border: ${isToday ? '2px solid var(--primary)' : 'none'};
      ">
        ${day}
      </div>
    `;
  }
  
  calendarHTML += '</div>';
  container.innerHTML = calendarHTML;
}

// Render volume chart
function renderVolumeChart() {
  const container = document.getElementById('volume-chart');
  const last30Days = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last30Days.push({
      date: date.toISOString().split('T')[0],
      volume: 0,
      workouts: 0
    });
  }
  
  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date).toISOString().split('T')[0];
    const dayData = last30Days.find(d => d.date === workoutDate);
    
    if (dayData) {
      dayData.workouts++;
      workout.exercises.forEach(ex => {
        ex.sets.forEach(set => {
          dayData.volume += set.reps * set.weight;
        });
      });
    }
  });
  
  const maxVolume = Math.max(...last30Days.map(d => d.volume), 1);
  
  container.innerHTML = `
    <div style="margin-bottom: 20px;">
      <h3 style="color: var(--dark); margin-bottom: 10px;">Last 30 Days</h3>
      <div style="display: flex; align-items: flex-end; gap: 3px; height: 200px; padding: 10px; background: var(--light); border-radius: 8px;">
        ${last30Days.map(day => {
          const height = (day.volume / maxVolume) * 100;
          return `
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
              <div style="
                width: 100%; 
                height: ${height}%; 
                background: ${day.workouts > 0 ? 'var(--primary)' : 'var(--border)'};
                border-radius: 4px 4px 0 0;
                min-height: 2px;
              " title="${new Date(day.date).toLocaleDateString()}: ${day.volume}kg"></div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 10px; color: var(--text-light); font-size: 0.85rem;">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
      <div style="background: var(--light); padding: 15px; border-radius: 8px; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: bold; color: var(--primary);">
          ${last30Days.reduce((sum, d) => sum + d.volume, 0).toFixed(0)}kg
        </div>
        <div style="color: var(--text-light); font-size: 0.9rem;">Total Volume</div>
      </div>
      <div style="background: var(--light); padding: 15px; border-radius: 8px; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: bold; color: var(--success);">
          ${last30Days.filter(d => d.workouts > 0).length}
        </div>
        <div style="color: var(--text-light); font-size: 0.9rem;">Training Days</div>
      </div>
      <div style="background: var(--light); padding: 15px; border-radius: 8px; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: bold; color: var(--secondary);">
          ${(last30Days.reduce((sum, d) => sum + d.volume, 0) / last30Days.filter(d => d.workouts > 0).length || 0).toFixed(0)}kg
        </div>
        <div style="color: var(--text-light); font-size: 0.9rem;">Avg per Workout</div>
      </div>
    </div>
  `;
}

// Update the existing saveWorkout function to include new features
const originalSaveWorkout = saveWorkout;
saveWorkout = function() {
  const name = document.getElementById('workout-name').value.trim();
  if (!name) {
    alert('Please enter a workout name');
    return;
  }

  const exercises = [];
  document.querySelectorAll('.exercise-entry').forEach(entry => {
    const exerciseName = entry.querySelector('.exercise-name').value.trim();
    if (!exerciseName) return;

    const sets = [];
    entry.querySelectorAll('.set-row').forEach(row => {
      const inputs = row.querySelectorAll('input');
      const reps = parseInt(inputs[0].value);
      const weight = parseFloat(inputs[1].value);
      if (reps && weight >= 0) {
        sets.push({ reps, weight });
      }
    });

    if (sets.length > 0) {
      exercises.push({ name: exerciseName, sets });
    }
  });

  if (exercises.length === 0) {
    alert('Please add at least one exercise with sets');
    return;
  }

  const workout = {
    id: Date.now(),
    name,
    exercises,
    date: new Date().toISOString(),
    duration: workoutElapsedSeconds
  };

  // Check for PRs
  const prs = checkForPRs(workout);

  workouts.unshift(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  
  stopWorkoutTimer();
  closeWorkoutModal();
  renderWorkouts();
  updateStats();
  populateExerciseFilter();
  
  // Show success message with PRs if any
  if (prs.length > 0) {
    setTimeout(() => showPRCelebration(prs), 500);
  }
};

// Update setupEventListeners to include new features
const originalSetupEventListeners = setupEventListeners;
setupEventListeners = function() {
  originalSetupEventListeners();
  
  // PR filter
  const prFilter = document.getElementById('pr-filter');
  if (prFilter) {
    prFilter.addEventListener('change', renderPersonalRecords);
  }
  
  // Tab switching with new tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${tab}-tab`).classList.add('active');
      
      if (tab === 'progress') {
        renderWeeklySummary();
        renderWorkoutCalendar();
        renderVolumeChart();
      } else if (tab === 'records') {
        renderPersonalRecords();
      }
    });
  });
};

// Update openWorkoutModal to start timer
const originalOpenWorkoutModal = openWorkoutModal;
openWorkoutModal = function() {
  originalOpenWorkoutModal();
  startWorkoutTimer();
};

// Update closeWorkoutModal to stop timer
const originalCloseWorkoutModal = closeWorkoutModal;
closeWorkoutModal = function() {
  stopWorkoutTimer();
  originalCloseWorkoutModal();
};

// Add set completion with rest timer
const originalAddSet = addSet;
addSet = function(btn) {
  const setsContainer = btn.previousElementSibling;
  const setNumber = setsContainer.children.length + 1;
  const setRow = document.createElement('div');
  setRow.className = 'set-row';
  setRow.innerHTML = `
    <span>Set ${setNumber}</span>
    <input type="number" placeholder="Reps" min="1" class="set-reps" />
    <input type="number" placeholder="Weight (kg)" step="0.5" min="0" class="set-weight" />
    <button class="btn-secondary" onclick="markSetComplete(this)" style="padding: 8px 12px; font-size: 0.85rem;">✓</button>
    <button class="remove-btn" onclick="removeSet(this)">×</button>
  `;
  setsContainer.appendChild(setRow);
  
  // Add plate calculator button for weight input
  const weightInput = setRow.querySelector('.set-weight');
  weightInput.addEventListener('focus', function() {
    const currentValue = this.value;
    if (currentValue) {
      // Show plate calculator hint
      this.title = 'Click the calculator icon to see plate loading';
    }
  });
};

// Mark set as complete and start rest timer
function markSetComplete(btn) {
  const setRow = btn.parentElement;
  const exerciseEntry = setRow.closest('.exercise-entry');
  const exerciseName = exerciseEntry.querySelector('.exercise-name').value;
  
  // Visual feedback
  setRow.style.background = 'var(--success)';
  setRow.style.color = 'white';
  btn.textContent = '✓';
  btn.disabled = true;
  
  // Update live stats
  updateLiveWorkoutStats();
  
  // Start rest timer
  if (exerciseName) {
    startRestTimer(exerciseName);
  }
}

// Export workout data
function exportWorkoutData() {
  const data = {
    workouts,
    cardioSessions,
    personalRecords,
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fittrack-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Import workout data
function importWorkoutData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      if (confirm('This will merge imported data with your existing data. Continue?')) {
        if (data.workouts) {
          workouts = [...data.workouts, ...workouts];
          localStorage.setItem('workouts', JSON.stringify(workouts));
        }
        if (data.cardioSessions) {
          cardioSessions = [...data.cardioSessions, ...cardioSessions];
          localStorage.setItem('cardio', JSON.stringify(cardioSessions));
        }
        if (data.personalRecords) {
          personalRecords = { ...personalRecords, ...data.personalRecords };
          localStorage.setItem('personalRecords', JSON.stringify(personalRecords));
        }
        
        alert('Data imported successfully!');
        location.reload();
      }
    } catch (error) {
      alert('Error importing data. Please check the file format.');
    }
  };
  reader.readAsText(file);
}

// Make new functions global
window.closeRestTimer = closeRestTimer;
window.adjustRestTimer = adjustRestTimer;
window.closePRModal = closePRModal;
window.closePlateCalculator = closePlateCalculator;
window.openPlateCalculator = openPlateCalculator;
window.markSetComplete = markSetComplete;
window.exportWorkoutData = exportWorkoutData;
window.importWorkoutData = importWorkoutData;

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

console.log('FitTrack Pro features loaded! 🏋️‍♂️');

// ========== MUSCLE GROUP VISUALIZATION & ANALYSIS ==========

// Muscle group mapping for exercises
const exerciseMuscleMap = {
  // Chest
  'bench press': ['chest', 'triceps', 'shoulders'],
  'incline dumbbell press': ['chest', 'shoulders', 'triceps'],
  'cable flyes': ['chest'],
  'push-ups': ['chest', 'triceps', 'shoulders'],
  'dips': ['chest', 'triceps'],
  
  // Back
  'deadlift': ['back', 'legs', 'core'],
  'pull-ups': ['back', 'biceps'],
  'barbell row': ['back', 'biceps'],
  'lat pulldown': ['back', 'biceps'],
  'face pulls': ['shoulders', 'back'],
  
  // Legs
  'squat': ['legs', 'core'],
  'romanian deadlift': ['legs', 'back'],
  'leg press': ['legs'],
  'lunges': ['legs', 'core'],
  'leg curls': ['legs'],
  'calf raises': ['legs'],
  
  // Shoulders
  'overhead press': ['shoulders', 'triceps', 'core'],
  'lateral raises': ['shoulders'],
  'arnold press': ['shoulders', 'triceps'],
  
  // Arms
  'barbell curl': ['biceps'],
  'tricep dips': ['triceps', 'chest'],
  'hammer curls': ['biceps'],
  'skull crushers': ['triceps'],
  'cable curls': ['biceps'],
  'tricep pushdowns': ['triceps'],
  
  // Core
  'plank': ['core'],
  'cable crunches': ['core'],
  'hanging leg raises': ['core'],
  'russian twists': ['core']
};

// Training type recommendations
const trainingTypes = {
  strength: {
    name: 'Strength',
    sets: '3-5',
    reps: '3-6',
    rest: 180,
    description: 'Heavy weight, low reps, long rest for maximum strength',
    color: '#dc3545'
  },
  hypertrophy: {
    name: 'Hypertrophy',
    sets: '3-4',
    reps: '8-12',
    rest: 90,
    description: 'Moderate weight, moderate reps for muscle growth',
    color: '#6366f1'
  },
  endurance: {
    name: 'Endurance',
    sets: '2-3',
    reps: '15-20',
    rest: 60,
    description: 'Light weight, high reps, short rest for muscular endurance',
    color: '#10b981'
  },
  power: {
    name: 'Power',
    sets: '3-5',
    reps: '1-5',
    rest: 180,
    description: 'Explosive movements with heavy weight',
    color: '#f59e0b'
  }
};

// Analyze workout muscle groups
function analyzeWorkoutMuscles(workout) {
  const muscleVolume = {
    chest: 0,
    back: 0,
    legs: 0,
    shoulders: 0,
    biceps: 0,
    triceps: 0,
    core: 0
  };
  
  workout.exercises.forEach(exercise => {
    const exerciseName = exercise.name.toLowerCase();
    const muscles = exerciseMuscleMap[exerciseName] || [];
    
    const totalVolume = exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
    
    muscles.forEach(muscle => {
      if (muscleVolume[muscle] !== undefined) {
        muscleVolume[muscle] += totalVolume / muscles.length;
      }
    });
  });
  
  return muscleVolume;
}

// Render muscle group visualization
function renderMuscleGroupVisualization(muscleVolume) {
  const maxVolume = Math.max(...Object.values(muscleVolume), 1);
  
  return `
    <div style="background: var(--light); padding: 20px; border-radius: 12px; margin-top: 20px;">
      <h3 style="color: var(--dark); margin-bottom: 20px;">💪 Muscle Groups Trained</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
        ${Object.entries(muscleVolume).map(([muscle, volume]) => {
          const percentage = (volume / maxVolume) * 100;
          const isActive = volume > 0;
          
          return `
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid ${isActive ? 'var(--primary)' : 'var(--border)'};">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: 600; color: var(--dark); text-transform: capitalize;">${getMuscleEmoji(muscle)} ${muscle}</span>
                <span style="color: ${isActive ? 'var(--primary)' : 'var(--text-light)'}; font-weight: bold;">${volume.toFixed(0)}kg</span>
              </div>
              <div style="width: 100%; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); transition: width 0.5s ease;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        ${renderMuscleBodyDiagram(muscleVolume)}
      </div>
    </div>
  `;
}

// Get emoji for muscle group
function getMuscleEmoji(muscle) {
  const emojis = {
    chest: '🫁',
    back: '🦴',
    legs: '🦵',
    shoulders: '💪',
    biceps: '💪',
    triceps: '💪',
    core: '🎯'
  };
  return emojis[muscle] || '💪';
}

// Render simple body diagram
function renderMuscleBodyDiagram(muscleVolume) {
  const getIntensity = (muscle) => {
    const volume = muscleVolume[muscle] || 0;
    const maxVolume = Math.max(...Object.values(muscleVolume), 1);
    const percentage = (volume / maxVolume) * 100;
    
    if (percentage === 0) return '#e5e7eb';
    if (percentage < 33) return '#93c5fd';
    if (percentage < 66) return '#3b82f6';
    return '#1d4ed8';
  };
  
  return `
    <div style="display: inline-block; text-align: center;">
      <svg width="200" height="300" viewBox="0 0 200 300" style="max-width: 100%;">
        <!-- Head -->
        <circle cx="100" cy="30" r="20" fill="#e5e7eb" />
        
        <!-- Shoulders -->
        <ellipse cx="70" cy="70" rx="15" ry="10" fill="${getIntensity('shoulders')}" />
        <ellipse cx="130" cy="70" rx="15" ry="10" fill="${getIntensity('shoulders')}" />
        
        <!-- Chest -->
        <rect x="80" y="65" width="40" height="35" rx="5" fill="${getIntensity('chest')}" />
        
        <!-- Core -->
        <rect x="85" y="100" width="30" height="40" rx="5" fill="${getIntensity('core')}" />
        
        <!-- Back (shown as outline) -->
        <rect x="80" y="65" width="40" height="75" rx="5" fill="none" stroke="${getIntensity('back')}" stroke-width="3" />
        
        <!-- Arms -->
        <rect x="55" y="75" width="12" height="50" rx="6" fill="${getIntensity('biceps')}" />
        <rect x="133" y="75" width="12" height="50" rx="6" fill="${getIntensity('triceps')}" />
        
        <!-- Legs -->
        <rect x="85" y="145" width="12" height="80" rx="6" fill="${getIntensity('legs')}" />
        <rect x="103" y="145" width="12" height="80" rx="6" fill="${getIntensity('legs')}" />
      </svg>
      
      <div style="margin-top: 15px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 15px; height: 15px; background: #e5e7eb; border-radius: 3px;"></div>
          <span>Not trained</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 15px; height: 15px; background: #93c5fd; border-radius: 3px;"></div>
          <span>Light</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 15px; height: 15px; background: #3b82f6; border-radius: 3px;"></div>
          <span>Moderate</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 15px; height: 15px; background: #1d4ed8; border-radius: 3px;"></div>
          <span>Heavy</span>
        </div>
      </div>
    </div>
  `;
}

// Add training type selector to exercise entry
function addTrainingTypeSelector(exerciseEntry) {
  const setsContainer = exerciseEntry.querySelector('.sets-container');
  
  const typeSelector = document.createElement('div');
  typeSelector.className = 'training-type-selector';
  typeSelector.style.cssText = 'margin: 10px 0; display: flex; gap: 8px; flex-wrap: wrap;';
  
  typeSelector.innerHTML = `
    <span style="font-size: 0.9rem; color: var(--text-light); align-self: center;">Training Type:</span>
    ${Object.entries(trainingTypes).map(([key, type]) => `
      <button 
        class="training-type-btn" 
        data-type="${key}"
        onclick="applyTrainingType(this, '${key}')"
        style="
          padding: 6px 12px;
          border: 2px solid ${type.color};
          background: white;
          color: ${type.color};
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        "
        onmouseover="this.style.background='${type.color}'; this.style.color='white';"
        onmouseout="this.style.background='white'; this.style.color='${type.color}';"
        title="${type.description}"
      >
        ${type.name}
      </button>
    `).join('')}
  `;
  
  setsContainer.parentElement.insertBefore(typeSelector, setsContainer);
}

// Apply training type to exercise
function applyTrainingType(btn, typeKey) {
  const type = trainingTypes[typeKey];
  const exerciseEntry = btn.closest('.exercise-entry');
  const setsContainer = exerciseEntry.querySelector('.sets-container');
  
  // Clear existing sets
  setsContainer.innerHTML = '';
  
  // Add sets based on training type
  const numSets = parseInt(type.sets.split('-')[0]);
  const reps = type.reps.split('-')[0];
  
  for (let i = 0; i < numSets; i++) {
    const setRow = document.createElement('div');
    setRow.className = 'set-row';
    setRow.innerHTML = `
      <span>Set ${i + 1}</span>
      <input type="number" placeholder="Reps" min="1" class="set-reps" value="${reps}" />
      <input type="number" placeholder="Weight (kg)" step="0.5" min="0" class="set-weight" />
      <button class="btn-secondary" onclick="markSetComplete(this)" style="padding: 8px 12px; font-size: 0.85rem;">✓</button>
      <button class="remove-btn" onclick="removeSet(this)">×</button>
    `;
    setsContainer.appendChild(setRow);
  }
  
  // Update rest timer default for this exercise
  exerciseEntry.dataset.restTime = type.rest;
  
  // Visual feedback
  btn.style.background = type.color;
  btn.style.color = 'white';
  setTimeout(() => {
    btn.style.background = 'white';
    btn.style.color = type.color;
  }, 300);
}

// Update renderWorkouts to include muscle visualization
const originalRenderWorkouts = renderWorkouts;
renderWorkouts = function() {
  const container = document.getElementById('workout-list');
  
  if (workouts.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No workouts yet</p><p>Start tracking your gym sessions!</p></div>';
    return;
  }

  container.innerHTML = workouts.map(workout => {
    const muscleVolume = analyzeWorkoutMuscles(workout);
    const totalVolume = Object.values(muscleVolume).reduce((sum, v) => sum + v, 0);
    const duration = workout.duration ? `${Math.floor(workout.duration / 60)}min` : '';
    
    return `
      <div class="workout-item">
        <div class="workout-header">
          <div>
            <span class="workout-name">${workout.name}</span>
            ${duration ? `<span style="margin-left: 10px; color: var(--text-light); font-size: 0.9rem;">⏱️ ${duration}</span>` : ''}
            ${totalVolume > 0 ? `<span style="margin-left: 10px; color: var(--primary); font-size: 0.9rem;">📊 ${totalVolume.toFixed(0)}kg</span>` : ''}
          </div>
          <span class="workout-date">${formatDate(workout.date)}</span>
        </div>
        
        ${workout.exercises.map(ex => `
          <div style="margin-left: 15px; margin-top: 10px;">
            <strong>${ex.name}</strong>
            <div style="margin-left: 15px; color: var(--text-light);">
              ${ex.sets.map((set, i) => `Set ${i + 1}: ${set.reps} reps × ${set.weight}kg`).join('<br>')}
            </div>
          </div>
        `).join('')}
        
        ${renderMuscleGroupVisualization(muscleVolume)}
      </div>
    `;
  }).join('');
};

// Update addExerciseEntry to include training type selector
const originalAddExerciseEntry = addExerciseEntry;
addExerciseEntry = function() {
  const container = document.getElementById('exercises-container');
  const entry = document.createElement('div');
  entry.className = 'exercise-entry';
  entry.innerHTML = `
    <input type="text" class="exercise-name" placeholder="Exercise name" />
    <div class="previous-performance"></div>
    <div class="sets-container"></div>
    <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
    <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
  `;
  container.appendChild(entry);
  
  // Add event listener to show previous performance when exercise name changes
  const exerciseInput = entry.querySelector('.exercise-name');
  exerciseInput.addEventListener('blur', function() {
    showPreviousPerformance(this);
  });
  
  // Add training type selector
  addTrainingTypeSelector(entry);
  
  addSet(entry.querySelector('.add-set-btn'));
};

// Make functions global
window.applyTrainingType = applyTrainingType;

// ========== EXERCISE IMAGES & DESCRIPTIONS ==========

// Exercise details with form cues and muscle targets
const exerciseDetails = {
  'bench press': {
    primaryMuscles: ['Chest', 'Triceps'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie flat on bench with feet on floor',
      'Grip bar slightly wider than shoulder width',
      'Lower bar to mid-chest with control',
      'Press bar up until arms are extended',
      'Keep shoulder blades retracted throughout'
    ],
    tips: [
      'Keep your back slightly arched',
      'Drive through your feet',
      'Don\'t bounce the bar off your chest'
    ],
    imageUrl: '🏋️'
  },
  'squat': {
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Position bar on upper back/traps',
      'Stand with feet shoulder-width apart',
      'Descend by bending knees and hips',
      'Go until thighs are parallel to ground',
      'Drive through heels to stand'
    ],
    tips: [
      'Keep chest up and core tight',
      'Knees should track over toes',
      'Maintain neutral spine'
    ],
    imageUrl: '🦵'
  },
  'deadlift': {
    primaryMuscles: ['Back', 'Hamstrings'],
    secondaryMuscles: ['Glutes', 'Core', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip bar just outside legs',
      'Keep back straight, chest up',
      'Drive through heels to lift',
      'Extend hips and knees simultaneously'
    ],
    tips: [
      'Keep bar close to body',
      'Don\'t round your back',
      'Engage lats before lifting'
    ],
    imageUrl: '💪'
  },
  'pull-ups': {
    primaryMuscles: ['Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Core'],
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull yourself up until chin over bar',
      'Lower with control to full extension',
      'Keep core engaged throughout'
    ],
    tips: [
      'Avoid swinging or kipping',
      'Focus on pulling elbows down',
      'Full range of motion is key'
    ],
    imageUrl: '🔝'
  },
  'overhead press': {
    primaryMuscles: ['Shoulders', 'Triceps'],
    secondaryMuscles: ['Core', 'Upper Chest'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Start with bar at shoulder height',
      'Press bar overhead until arms extended',
      'Lower with control to shoulders',
      'Keep core tight throughout'
    ],
    tips: [
      'Don\'t lean back excessively',
      'Press in a slight arc',
      'Squeeze glutes for stability'
    ],
    imageUrl: '🏋️‍♀️'
  }
};

// Show exercise details modal
function showExerciseDetails(exerciseName) {
  const details = exerciseDetails[exerciseName.toLowerCase()];
  
  if (!details) {
    return `
      <div style="background: var(--light); padding: 15px; border-radius: 8px; margin: 10px 0;">
        <p style="color: var(--text-light); font-size: 0.9rem;">
          ℹ️ Exercise details not available. Focus on proper form and progressive overload!
        </p>
      </div>
    `;
  }
  
  return `
    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 12px; margin: 10px 0; border-left: 4px solid var(--info);">
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
        <div style="font-size: 3rem;">${details.imageUrl}</div>
        <div>
          <h4 style="color: var(--dark); margin-bottom: 5px; text-transform: capitalize;">${exerciseName}</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <span style="background: var(--primary); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem;">
              ${details.equipment}
            </span>
            <span style="background: ${details.difficulty === 'Advanced' ? 'var(--danger)' : details.difficulty === 'Intermediate' ? 'var(--warning)' : 'var(--success)'}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem;">
              ${details.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: var(--dark); display: block; margin-bottom: 8px;">🎯 Target Muscles:</strong>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${details.primaryMuscles.map(m => `
            <span style="background: var(--success); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem;">
              ${m}
            </span>
          `).join('')}
          ${details.secondaryMuscles.map(m => `
            <span style="background: var(--info); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem;">
              ${m}
            </span>
          `).join('')}
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: var(--dark); display: block; margin-bottom: 8px;">📋 Instructions:</strong>
        <ol style="margin: 0; padding-left: 20px; color: var(--text);">
          ${details.instructions.map(inst => `<li style="margin-bottom: 5px;">${inst}</li>`).join('')}
        </ol>
      </div>
      
      <div>
        <strong style="color: var(--dark); display: block; margin-bottom: 8px;">💡 Pro Tips:</strong>
        <ul style="margin: 0; padding-left: 20px; color: var(--text);">
          ${details.tips.map(tip => `<li style="margin-bottom: 5px;">${tip}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Add exercise info button to exercise entries
function addExerciseInfoButton(exerciseEntry) {
  const exerciseInput = exerciseEntry.querySelector('.exercise-name');
  const infoBtn = document.createElement('button');
  infoBtn.className = 'btn-secondary';
  infoBtn.innerHTML = 'ℹ️ Info';
  infoBtn.style.cssText = 'padding: 8px 12px; font-size: 0.85rem; margin-left: 10px;';
  infoBtn.onclick = function(e) {
    e.preventDefault();
    const exerciseName = exerciseInput.value.trim();
    if (exerciseName) {
      toggleExerciseInfo(exerciseEntry, exerciseName);
    }
  };
  
  exerciseInput.parentElement.insertBefore(infoBtn, exerciseInput.nextSibling);
}

// Toggle exercise info display
function toggleExerciseInfo(exerciseEntry, exerciseName) {
  let infoDiv = exerciseEntry.querySelector('.exercise-info');
  
  if (infoDiv) {
    infoDiv.remove();
  } else {
    infoDiv = document.createElement('div');
    infoDiv.className = 'exercise-info';
    infoDiv.innerHTML = showExerciseDetails(exerciseName);
    
    const previousPerf = exerciseEntry.querySelector('.previous-performance');
    if (previousPerf) {
      previousPerf.after(infoDiv);
    } else {
      exerciseEntry.querySelector('.exercise-name').after(infoDiv);
    }
  }
}

// Update exercise library to show detailed cards
const originalRenderExerciseLibrary = renderExerciseLibrary;
renderExerciseLibrary = function() {
  const filter = document.getElementById('muscle-filter').value;
  const container = document.getElementById('exercise-library');
  
  const exercises = filter ? exerciseLibrary[filter] : 
    Object.entries(exerciseLibrary).flatMap(([muscle, exs]) => 
      exs.map(ex => ({ ...ex, muscle }))
    );

  container.innerHTML = exercises.map(ex => {
    const details = exerciseDetails[ex.name.toLowerCase()];
    
    return `
      <div class="exercise-card" style="cursor: pointer; transition: all 0.3s ease;" onclick="toggleExerciseCardDetails(this, '${ex.name}')">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3>${ex.name}</h3>
            ${ex.muscle ? `<span class="muscle-tag">${ex.muscle}</span>` : ''}
          </div>
          ${details ? `<span style="font-size: 2rem;">${details.imageUrl}</span>` : ''}
        </div>
        <p>${ex.description}</p>
        ${ex.sets ? `<p style="color: var(--primary); font-weight: 600; margin-top: 8px;">Recommended: ${ex.sets} sets × ${ex.reps} reps</p>` : ''}
        ${details ? `
          <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
            ${details.primaryMuscles.map(m => `
              <span style="background: var(--success); color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.75rem;">
                ${m}
              </span>
            `).join('')}
          </div>
        ` : ''}
        <div class="exercise-card-details" style="display: none; margin-top: 15px;"></div>
      </div>
    `;
  }).join('');
};

// Toggle exercise card details
function toggleExerciseCardDetails(card, exerciseName) {
  const detailsDiv = card.querySelector('.exercise-card-details');
  
  if (detailsDiv.style.display === 'none') {
    detailsDiv.innerHTML = showExerciseDetails(exerciseName);
    detailsDiv.style.display = 'block';
    card.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
  } else {
    detailsDiv.style.display = 'none';
    card.style.background = 'var(--light)';
  }
}

// Make functions global
window.toggleExerciseCardDetails = toggleExerciseCardDetails;
window.toggleExerciseInfo = toggleExerciseInfo;

console.log('Exercise details and muscle visualization loaded! 💪');

// ========== EXERCISE DROPDOWN SELECTOR ==========

// Comprehensive exercise database organized by category
const exerciseDatabase = {
  'Chest': [
    'Bench Press',
    'Incline Bench Press',
    'Decline Bench Press',
    'Dumbbell Bench Press',
    'Incline Dumbbell Press',
    'Cable Flyes',
    'Dumbbell Flyes',
    'Push-ups',
    'Dips (Chest Focus)',
    'Machine Chest Press',
    'Pec Deck'
  ],
  'Back': [
    'Deadlift',
    'Pull-ups',
    'Chin-ups',
    'Barbell Row',
    'Dumbbell Row',
    'T-Bar Row',
    'Lat Pulldown',
    'Cable Row',
    'Face Pulls',
    'Hyperextensions',
    'Shrugs'
  ],
  'Legs': [
    'Squat',
    'Front Squat',
    'Leg Press',
    'Romanian Deadlift',
    'Leg Curls',
    'Leg Extensions',
    'Lunges',
    'Bulgarian Split Squat',
    'Hack Squat',
    'Calf Raises',
    'Seated Calf Raises',
    'Goblet Squat'
  ],
  'Shoulders': [
    'Overhead Press',
    'Dumbbell Shoulder Press',
    'Arnold Press',
    'Lateral Raises',
    'Front Raises',
    'Rear Delt Flyes',
    'Face Pulls',
    'Upright Row',
    'Machine Shoulder Press'
  ],
  'Biceps': [
    'Barbell Curl',
    'Dumbbell Curl',
    'Hammer Curls',
    'Cable Curls',
    'Preacher Curls',
    'Concentration Curls',
    'EZ Bar Curls',
    '21s'
  ],
  'Triceps': [
    'Tricep Dips',
    'Skull Crushers',
    'Tricep Pushdowns',
    'Overhead Tricep Extension',
    'Close Grip Bench Press',
    'Diamond Push-ups',
    'Kickbacks'
  ],
  'Core': [
    'Plank',
    'Side Plank',
    'Cable Crunches',
    'Hanging Leg Raises',
    'Russian Twists',
    'Ab Wheel Rollout',
    'Mountain Climbers',
    'Dead Bug',
    'Bicycle Crunches'
  ],
  'Cardio': [
    'Running',
    'Cycling',
    'Rowing',
    'Jump Rope',
    'Burpees',
    'Box Jumps',
    'Battle Ropes'
  ]
};

// Create searchable dropdown for exercise selection
function createExerciseDropdown(inputElement) {
  const wrapper = document.createElement('div');
  wrapper.className = 'exercise-dropdown-wrapper';
  wrapper.style.cssText = 'position: relative; width: 100%;';
  
  // Replace input with new structure
  const newInput = inputElement.cloneNode(true);
  newInput.setAttribute('autocomplete', 'off');
  newInput.setAttribute('placeholder', 'Search or select exercise...');
  
  const dropdown = document.createElement('div');
  dropdown.className = 'exercise-dropdown';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 400px;
    overflow-y: auto;
    background: white;
    border: 2px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: none;
    margin-top: 5px;
  `;
  
  wrapper.appendChild(newInput);
  wrapper.appendChild(dropdown);
  inputElement.parentNode.replaceChild(wrapper, inputElement);
  
  // Show dropdown on focus
  newInput.addEventListener('focus', () => {
    renderExerciseDropdown(dropdown, '');
    dropdown.style.display = 'block';
  });
  
  // Filter on input
  newInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    renderExerciseDropdown(dropdown, searchTerm);
    dropdown.style.display = 'block';
  });
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
  
  // Handle exercise selection
  dropdown.addEventListener('click', (e) => {
    const exerciseItem = e.target.closest('.exercise-dropdown-item');
    if (exerciseItem) {
      const exerciseName = exerciseItem.dataset.exercise;
      newInput.value = exerciseName;
      dropdown.style.display = 'none';
      
      // Trigger previous performance check
      showPreviousPerformance(newInput);
      
      // Show exercise details
      const exerciseEntry = newInput.closest('.exercise-entry');
      if (exerciseEntry) {
        const existingInfo = exerciseEntry.querySelector('.exercise-info');
        if (!existingInfo) {
          toggleExerciseInfo(exerciseEntry, exerciseName);
        }
      }
    }
  });
  
  return newInput;
}

// Render dropdown content
function renderExerciseDropdown(dropdown, searchTerm) {
  let html = '';
  
  Object.entries(exerciseDatabase).forEach(([category, exercises]) => {
    const filteredExercises = exercises.filter(ex => 
      ex.toLowerCase().includes(searchTerm)
    );
    
    if (filteredExercises.length > 0) {
      html += `
        <div class="exercise-category">
          <div style="
            padding: 10px 15px;
            background: var(--light);
            font-weight: 600;
            color: var(--dark);
            font-size: 0.9rem;
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 1;
          ">
            ${getCategoryEmoji(category)} ${category}
          </div>
          ${filteredExercises.map(exercise => `
            <div 
              class="exercise-dropdown-item" 
              data-exercise="${exercise}"
              style="
                padding: 12px 15px;
                cursor: pointer;
                border-bottom: 1px solid var(--border);
                transition: all 0.2s ease;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
              onmouseover="this.style.background='var(--light)'; this.style.paddingLeft='20px';"
              onmouseout="this.style.background='white'; this.style.paddingLeft='15px';"
            >
              <span style="color: var(--text);">${exercise}</span>
              ${hasExerciseDetails(exercise) ? '<span style="color: var(--info); font-size: 0.85rem;">ℹ️</span>' : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
  });
  
  if (html === '') {
    html = `
      <div style="padding: 20px; text-align: center; color: var(--text-light);">
        No exercises found. Try a different search term.
      </div>
    `;
  }
  
  dropdown.innerHTML = html;
}

// Get emoji for category
function getCategoryEmoji(category) {
  const emojis = {
    'Chest': '🫁',
    'Back': '🦴',
    'Legs': '🦵',
    'Shoulders': '💪',
    'Biceps': '💪',
    'Triceps': '💪',
    'Core': '🎯',
    'Cardio': '🏃'
  };
  return emojis[category] || '💪';
}

// Check if exercise has detailed information
function hasExerciseDetails(exerciseName) {
  return exerciseDetails[exerciseName.toLowerCase()] !== undefined;
}

// Update addExerciseEntry to use dropdown
addExerciseEntry = function() {
  const container = document.getElementById('exercises-container');
  const entry = document.createElement('div');
  entry.className = 'exercise-entry';
  entry.innerHTML = `
    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
      <input type="text" class="exercise-name" placeholder="Search or select exercise..." style="flex: 1; margin-bottom: 0;" />
      <button class="btn-secondary exercise-info-btn" style="padding: 8px 12px; font-size: 0.85rem; white-space: nowrap;">ℹ️ Info</button>
    </div>
    <div class="previous-performance"></div>
    <div class="sets-container"></div>
    <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
    <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
  `;
  container.appendChild(entry);
  
  // Create dropdown for exercise selection
  const exerciseInput = entry.querySelector('.exercise-name');
  const newInput = createExerciseDropdown(exerciseInput);
  
  // Add info button handler
  const infoBtn = entry.querySelector('.exercise-info-btn');
  infoBtn.onclick = function(e) {
    e.preventDefault();
    const exerciseName = newInput.value.trim();
    if (exerciseName) {
      toggleExerciseInfo(entry, exerciseName);
    } else {
      alert('Please select an exercise first');
    }
  };
  
  // Add training type selector
  addTrainingTypeSelector(entry);
  
  addSet(entry.querySelector('.add-set-btn'));
};

// Update loadSuggestedWorkout to use dropdown
loadSuggestedWorkout = function(workoutType) {
  const workout = workoutTemplates[workoutType];
  
  document.getElementById('workout-name').value = workout.name;
  
  // Clear and rebuild exercises container
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the template
  workout.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
        <input type="text" class="exercise-name" value="${ex.name}" style="flex: 1; margin-bottom: 0;" />
        <button class="btn-secondary exercise-info-btn" style="padding: 8px 12px; font-size: 0.85rem; white-space: nowrap;">ℹ️ Info</button>
      </div>
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Create dropdown
    const exerciseInput = entry.querySelector('.exercise-name');
    const newInput = createExerciseDropdown(exerciseInput);
    
    // Add info button handler
    const infoBtn = entry.querySelector('.exercise-info-btn');
    infoBtn.onclick = function(e) {
      e.preventDefault();
      toggleExerciseInfo(entry, newInput.value);
    };
    
    // Show previous performance for this exercise
    showPreviousPerformance(newInput);
    
    // Add training type selector
    addTrainingTypeSelector(entry);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
};

// Update useSessionWorkout to use dropdown
useSessionWorkout = function(programKey, sessionIndex) {
  const program = workoutPrograms[programKey];
  const session = program.sessions[sessionIndex];
  
  // Open workout modal
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = session.name;
  
  // Clear existing exercises
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the session
  session.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
        <input type="text" class="exercise-name" value="${ex.name}" style="flex: 1; margin-bottom: 0;" />
        <button class="btn-secondary exercise-info-btn" style="padding: 8px 12px; font-size: 0.85rem; white-space: nowrap;">ℹ️ Info</button>
      </div>
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Create dropdown
    const exerciseInput = entry.querySelector('.exercise-name');
    const newInput = createExerciseDropdown(exerciseInput);
    
    // Add info button handler
    const infoBtn = entry.querySelector('.exercise-info-btn');
    infoBtn.onclick = function(e) {
      e.preventDefault();
      toggleExerciseInfo(entry, newInput.value);
    };
    
    // Show previous performance for this exercise
    showPreviousPerformance(newInput);
    
    // Add training type selector
    addTrainingTypeSelector(entry);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
  
  startWorkoutTimer();
};

// Update useRecommendedWorkout to use dropdown
useRecommendedWorkout = function(workoutType) {
  const workout = workoutTemplates[workoutType];
  
  // Open workout modal
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = workout.name;
  
  // Clear existing exercises
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  // Add each exercise from the template
  workout.exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
        <input type="text" class="exercise-name" value="${ex.name}" style="flex: 1; margin-bottom: 0;" />
        <button class="btn-secondary exercise-info-btn" style="padding: 8px 12px; font-size: 0.85rem; white-space: nowrap;">ℹ️ Info</button>
      </div>
      <div class="previous-performance"></div>
      <div class="sets-container"></div>
      <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      <button class="remove-btn" onclick="removeExercise(this)">Remove Exercise</button>
    `;
    container.appendChild(entry);
    
    // Create dropdown
    const exerciseInput = entry.querySelector('.exercise-name');
    const newInput = createExerciseDropdown(exerciseInput);
    
    // Add info button handler
    const infoBtn = entry.querySelector('.exercise-info-btn');
    infoBtn.onclick = function(e) {
      e.preventDefault();
      toggleExerciseInfo(entry, newInput.value);
    };
    
    // Show previous performance for this exercise
    showPreviousPerformance(newInput);
    
    // Add training type selector
    addTrainingTypeSelector(entry);
    
    // Add recommended number of sets
    const numSets = parseInt(ex.sets.split('-')[0]) || 3;
    for (let i = 0; i < numSets; i++) {
      addSet(entry.querySelector('.add-set-btn'));
    }
  });
  
  startWorkoutTimer();
};

console.log('Exercise dropdown selector loaded! 🎯');

// ========== BODY PART FOCUSED WORKOUT SYSTEM ==========

// Body part templates for different workout types
const bodyPartTemplates = {
  fullbody: {
    name: 'Full Body',
    bodyParts: [
      { name: 'Chest', emoji: '🫁', required: true },
      { name: 'Upper Back', emoji: '🦴', required: true },
      { name: 'Lower Back', emoji: '💪', required: false },
      { name: 'Front Delts', emoji: '💪', required: false },
      { name: 'Side Delts', emoji: '💪', required: false },
      { name: 'Rear Delts', emoji: '💪', required: false },
      { name: 'Quads', emoji: '🦵', required: true },
      { name: 'Hamstrings', emoji: '🦵', required: true },
      { name: 'Glutes', emoji: '🍑', required: false },
      { name: 'Calves', emoji: '🦵', required: false },
      { name: 'Biceps', emoji: '💪', required: false },
      { name: 'Triceps', emoji: '💪', required: false },
      { name: 'Abs', emoji: '🎯', required: false },
      { name: 'Obliques', emoji: '🎯', required: false }
    ]
  },
  push: {
    name: 'Push Day',
    bodyParts: [
      { name: 'Chest', emoji: '🫁', required: true },
      { name: 'Front Delts', emoji: '💪', required: true },
      { name: 'Side Delts', emoji: '💪', required: false },
      { name: 'Triceps', emoji: '💪', required: true },
      { name: 'Abs', emoji: '🎯', required: false }
    ]
  },
  pull: {
    name: 'Pull Day',
    bodyParts: [
      { name: 'Upper Back', emoji: '🦴', required: true },
      { name: 'Lower Back', emoji: '💪', required: false },
      { name: 'Rear Delts', emoji: '💪', required: true },
      { name: 'Biceps', emoji: '💪', required: true },
      { name: 'Forearms', emoji: '💪', required: false },
      { name: 'Abs', emoji: '🎯', required: false }
    ]
  },
  legs: {
    name: 'Leg Day',
    bodyParts: [
      { name: 'Quads', emoji: '🦵', required: true },
      { name: 'Hamstrings', emoji: '🦵', required: true },
      { name: 'Glutes', emoji: '🍑', required: true },
      { name: 'Calves', emoji: '🦵', required: true },
      { name: 'Abs', emoji: '🎯', required: false },
      { name: 'Obliques', emoji: '🎯', required: false }
    ]
  },
  upper: {
    name: 'Upper Body',
    bodyParts: [
      { name: 'Chest', emoji: '🫁', required: true },
      { name: 'Upper Back', emoji: '🦴', required: true },
      { name: 'Front Delts', emoji: '💪', required: true },
      { name: 'Side Delts', emoji: '💪', required: false },
      { name: 'Rear Delts', emoji: '💪', required: false },
      { name: 'Biceps', emoji: '💪', required: false },
      { name: 'Triceps', emoji: '💪', required: false },
      { name: 'Forearms', emoji: '💪', required: false },
      { name: 'Abs', emoji: '🎯', required: false }
    ]
  },
  lower: {
    name: 'Lower Body',
    bodyParts: [
      { name: 'Quads', emoji: '🦵', required: true },
      { name: 'Hamstrings', emoji: '🦵', required: true },
      { name: 'Glutes', emoji: '🍑', required: true },
      { name: 'Calves', emoji: '🦵', required: true },
      { name: 'Lower Back', emoji: '💪', required: false },
      { name: 'Abs', emoji: '🎯', required: false },
      { name: 'Obliques', emoji: '🎯', required: false }
    ]
  }
};

// Exercises organized by body part
const exercisesByBodyPart = {
  'Chest': [
    'Bench Press',
    'Incline Bench Press',
    'Decline Bench Press',
    'Dumbbell Bench Press',
    'Incline Dumbbell Press',
    'Cable Flyes',
    'Dumbbell Flyes',
    'Push-ups',
    'Dips (Chest Focus)',
    'Machine Chest Press',
    'Pec Deck'
  ],
  'Upper Back': [
    'Pull-ups',
    'Chin-ups',
    'Barbell Row',
    'Dumbbell Row',
    'T-Bar Row',
    'Lat Pulldown',
    'Cable Row',
    'Chest Supported Row',
    'Inverted Rows'
  ],
  'Lower Back': [
    'Deadlift',
    'Romanian Deadlift',
    'Good Mornings',
    'Hyperextensions',
    'Back Extensions',
    'Reverse Hyperextensions'
  ],
  'Front Delts': [
    'Overhead Press',
    'Dumbbell Shoulder Press',
    'Front Raises',
    'Arnold Press',
    'Machine Shoulder Press',
    'Push Press'
  ],
  'Side Delts': [
    'Lateral Raises',
    'Cable Lateral Raises',
    'Dumbbell Lateral Raises',
    'Machine Lateral Raises',
    'Upright Row'
  ],
  'Rear Delts': [
    'Rear Delt Flyes',
    'Face Pulls',
    'Reverse Pec Deck',
    'Cable Rear Delt Flyes',
    'Bent Over Lateral Raises'
  ],
  'Quads': [
    'Squat',
    'Front Squat',
    'Leg Press',
    'Leg Extensions',
    'Lunges',
    'Bulgarian Split Squat',
    'Hack Squat',
    'Goblet Squat',
    'Sissy Squat'
  ],
  'Hamstrings': [
    'Romanian Deadlift',
    'Leg Curls',
    'Nordic Curls',
    'Good Mornings',
    'Stiff Leg Deadlift',
    'Glute Ham Raise',
    'Seated Leg Curls'
  ],
  'Glutes': [
    'Hip Thrusts',
    'Bulgarian Split Squat',
    'Glute Bridges',
    'Cable Pull-throughs',
    'Lunges',
    'Step-ups',
    'Kickbacks'
  ],
  'Calves': [
    'Standing Calf Raises',
    'Seated Calf Raises',
    'Calf Press on Leg Press',
    'Donkey Calf Raises',
    'Single Leg Calf Raises'
  ],
  'Biceps': [
    'Barbell Curl',
    'Dumbbell Curl',
    'Hammer Curls',
    'Cable Curls',
    'Preacher Curls',
    'Concentration Curls',
    'EZ Bar Curls',
    'Spider Curls',
    '21s'
  ],
  'Triceps': [
    'Tricep Dips',
    'Skull Crushers',
    'Tricep Pushdowns',
    'Overhead Tricep Extension',
    'Close Grip Bench Press',
    'Diamond Push-ups',
    'Kickbacks',
    'JM Press'
  ],
  'Forearms': [
    'Wrist Curls',
    'Reverse Wrist Curls',
    'Farmers Walk',
    'Dead Hangs',
    'Reverse Curls',
    'Hammer Curls'
  ],
  'Abs': [
    'Plank',
    'Cable Crunches',
    'Hanging Leg Raises',
    'Ab Wheel Rollout',
    'Dead Bug',
    'Bicycle Crunches',
    'Sit-ups',
    'Decline Sit-ups',
    'Dragon Flags'
  ],
  'Obliques': [
    'Russian Twists',
    'Side Plank',
    'Woodchoppers',
    'Oblique Crunches',
    'Hanging Oblique Raises',
    'Landmine Rotations'
  ],
  'Core': [
    'Plank',
    'Cable Crunches',
    'Hanging Leg Raises',
    'Russian Twists',
    'Ab Wheel Rollout',
    'Dead Bug',
    'Mountain Climbers'
  ]
};

// Show body part focused workout builder
function showBodyPartWorkoutBuilder() {
  const container = document.getElementById('exercises-container');
  
  container.innerHTML = `
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; color: white;">
      <h3 style="margin-bottom: 15px; font-size: 1.3rem;">🎯 Build Your Workout</h3>
      <p style="margin-bottom: 20px; opacity: 0.95;">Select a workout type to get started with body part focused training</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
        ${Object.entries(bodyPartTemplates).map(([key, template]) => `
          <button 
            onclick="selectWorkoutType('${key}')" 
            style="
              background: rgba(255,255,255,0.2);
              border: 2px solid rgba(255,255,255,0.4);
              color: white;
              padding: 15px 10px;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              transition: all 0.3s ease;
              font-size: 0.95rem;
            "
            onmouseover="this.style.background='rgba(255,255,255,0.3)'"
            onmouseout="this.style.background='rgba(255,255,255,0.2)'"
          >
            ${template.name}
          </button>
        `).join('')}
      </div>
      
      <button 
        onclick="showCustomBodyPartBuilder()" 
        style="
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 15px;
          width: 100%;
          font-size: 0.95rem;
        "
      >
        ⚙️ Custom Body Parts
      </button>
    </div>
  `;
}

// Select workout type and show body parts
function selectWorkoutType(templateKey) {
  const template = bodyPartTemplates[templateKey];
  const container = document.getElementById('exercises-container');
  
  document.getElementById('workout-name').value = template.name;
  
  container.innerHTML = `
    <div style="background: var(--light); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: var(--dark); margin: 0;">📋 ${template.name} - Select Exercises</h3>
        <button onclick="showBodyPartWorkoutBuilder()" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          ← Back
        </button>
      </div>
      <p style="color: var(--text-light); margin-bottom: 20px;">
        Choose one exercise per body part and select your training style
      </p>
    </div>
    
    <div id="body-parts-container"></div>
    
    <button class="btn-primary" onclick="finalizeBodyPartWorkout()" style="width: 100%; margin-top: 20px;">
      ✓ Start Workout
    </button>
  `;
  
  const bodyPartsContainer = document.getElementById('body-parts-container');
  
  template.bodyParts.forEach((bodyPart, index) => {
    const bodyPartCard = createBodyPartCard(bodyPart, index);
    bodyPartsContainer.appendChild(bodyPartCard);
  });
  
  startWorkoutTimer();
}

// Create body part selection card
function createBodyPartCard(bodyPart, index) {
  const card = document.createElement('div');
  card.className = 'body-part-card';
  card.dataset.bodyPart = bodyPart.name;
  card.style.cssText = `
    background: white;
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  `;
  
  const exercises = exercisesByBodyPart[bodyPart.name] || [];
  
  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <h4 style="color: var(--dark); margin: 0; flex: 1;">
        ${bodyPart.emoji} ${bodyPart.name}
        ${bodyPart.required ? '<span style="color: var(--danger); font-size: 0.8rem;"> *required</span>' : ''}
      </h4>
      ${!bodyPart.required ? `
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" class="skip-bodypart" onchange="toggleBodyPart(this)" 
            style="width: 18px; height: 18px; cursor: pointer;" />
          <span style="font-size: 0.9rem; color: var(--text-light);">Skip</span>
        </label>
      ` : ''}
    </div>
    
    <div class="body-part-content">
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--text);">
          Select Exercise:
        </label>
        <select class="exercise-select" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem;">
          <option value="">Choose an exercise...</option>
          ${exercises.map(ex => `<option value="${ex}">${ex}</option>`).join('')}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--text);">
          Training Style:
        </label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <button 
            class="training-style-btn" 
            data-style="strength"
            onclick="selectTrainingStyle(this, 'strength')"
            style="
              padding: 12px;
              border: 2px solid #dc3545;
              background: white;
              color: #dc3545;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              transition: all 0.3s ease;
            "
          >
            💪 Strength<br>
            <span style="font-size: 0.85rem; font-weight: normal;">3-5 sets × 3-6 reps</span>
          </button>
          <button 
            class="training-style-btn active" 
            data-style="hypertrophy"
            onclick="selectTrainingStyle(this, 'hypertrophy')"
            style="
              padding: 12px;
              border: 2px solid #6366f1;
              background: #6366f1;
              color: white;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              transition: all 0.3s ease;
            "
          >
            📈 Hypertrophy<br>
            <span style="font-size: 0.85rem; font-weight: normal;">3-4 sets × 8-12 reps</span>
          </button>
        </div>
      </div>
      
      <div class="exercise-preview" style="display: none; background: var(--light); padding: 15px; border-radius: 8px; margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong style="color: var(--dark);">Preview:</strong>
          <button onclick="showExerciseInfoInCard(this)" class="btn-secondary" style="padding: 6px 12px; font-size: 0.85rem;">
            ℹ️ Info
          </button>
        </div>
        <div class="preview-content"></div>
      </div>
    </div>
  `;
  
  // Add event listener for exercise selection
  const exerciseSelect = card.querySelector('.exercise-select');
  exerciseSelect.addEventListener('change', function() {
    updateExercisePreview(card);
  });
  
  // Set default to hypertrophy
  card.dataset.trainingStyle = 'hypertrophy';
  
  return card;
}

// Toggle body part skip
function toggleBodyPart(checkbox) {
  const card = checkbox.closest('.body-part-card');
  const content = card.querySelector('.body-part-content');
  
  if (checkbox.checked) {
    content.style.opacity = '0.3';
    content.style.pointerEvents = 'none';
    card.style.borderColor = '#e5e7eb';
    card.style.background = '#f9fafb';
    card.dataset.skipped = 'true';
  } else {
    content.style.opacity = '1';
    content.style.pointerEvents = 'auto';
    card.style.borderColor = 'var(--border)';
    card.style.background = 'white';
    card.dataset.skipped = 'false';
  }
}

// Select training style
function selectTrainingStyle(btn, style) {
  const card = btn.closest('.body-part-card');
  const buttons = card.querySelectorAll('.training-style-btn');
  
  buttons.forEach(b => {
    b.classList.remove('active');
    const btnStyle = b.dataset.style;
    const color = btnStyle === 'strength' ? '#dc3545' : '#6366f1';
    b.style.background = 'white';
    b.style.color = color;
    b.style.borderColor = color;
  });
  
  btn.classList.add('active');
  const color = style === 'strength' ? '#dc3545' : '#6366f1';
  btn.style.background = color;
  btn.style.color = 'white';
  
  card.dataset.trainingStyle = style;
  updateExercisePreview(card);
}

// Update exercise preview
function updateExercisePreview(card) {
  const exerciseSelect = card.querySelector('.exercise-select');
  const exerciseName = exerciseSelect.value;
  const trainingStyle = card.dataset.trainingStyle;
  const preview = card.querySelector('.exercise-preview');
  const previewContent = card.querySelector('.preview-content');
  
  if (!exerciseName) {
    preview.style.display = 'none';
    return;
  }
  
  const style = trainingTypes[trainingStyle];
  const sets = style.sets.split('-')[0];
  const reps = style.reps;
  
  preview.style.display = 'block';
  previewContent.innerHTML = `
    <div style="color: var(--text);">
      <strong>${exerciseName}</strong><br>
      <span style="color: var(--primary); font-weight: 600;">${sets} sets × ${reps} reps</span>
      <span style="color: var(--text-light); margin-left: 10px;">Rest: ${Math.floor(style.rest / 60)}min</span>
    </div>
  `;
  
  card.style.borderColor = 'var(--primary)';
}

// Show exercise info in card
function showExerciseInfoInCard(btn) {
  const card = btn.closest('.body-part-card');
  const exerciseSelect = card.querySelector('.exercise-select');
  const exerciseName = exerciseSelect.value;
  
  if (exerciseName) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
          <h2>${exerciseName}</h2>
          <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          ${showExerciseDetails(exerciseName)}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// Finalize body part workout
function finalizeBodyPartWorkout() {
  const cards = document.querySelectorAll('.body-part-card');
  const exercises = [];
  let hasError = false;
  let errorMessage = '';
  
  cards.forEach(card => {
    const bodyPart = card.dataset.bodyPart;
    
    // Check if this body part is skipped (only for optional body parts)
    const skipCheckbox = card.querySelector('.skip-bodypart');
    const isSkipped = skipCheckbox && skipCheckbox.checked;
    
    if (isSkipped) {
      console.log('Skipping optional body part:', bodyPart);
      return; // Skip this body part entirely
    }
    
    // If not skipped, exercise selection is required
    const exerciseSelect = card.querySelector('.exercise-select');
    const exerciseName = exerciseSelect.value;
    const trainingStyle = card.dataset.trainingStyle || 'hypertrophy';
    
    if (!exerciseName) {
      card.style.borderColor = 'var(--danger)';
      card.style.background = '#fff5f5';
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      hasError = true;
      errorMessage = `Please select an exercise for ${bodyPart}${skipCheckbox ? ' or check "Skip"' : ''}`;
      return;
    }
    
    // Reset error styling if exercise is selected
    card.style.borderColor = 'var(--border)';
    card.style.background = 'white';
    
    const style = trainingTypes[trainingStyle];
    const numSets = parseInt(style.sets.split('-')[0]);
    const reps = style.reps.split('-')[0];
    
    exercises.push({
      name: exerciseName,
      bodyPart: bodyPart,
      trainingStyle: trainingStyle,
      sets: numSets,
      reps: parseInt(reps),
      restTime: style.rest
    });
  });
  
  if (hasError) {
    alert(errorMessage || 'Please select an exercise for all required body parts');
    return;
  }
  
  if (exercises.length === 0) {
    alert('Please select at least one exercise to create a workout');
    return;
  }
  
  // Build the workout with actual set inputs
  buildFinalWorkout(exercises);
}

// Build final workout with set inputs
function buildFinalWorkout(exercises) {
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  exercises.forEach(ex => {
    const entry = document.createElement('div');
    entry.className = 'exercise-entry';
    entry.dataset.restTime = ex.restTime;
    
    entry.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--light) 0%, white 100%); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div>
            <strong style="color: var(--dark); font-size: 1.1rem;">${ex.name}</strong>
            <div style="margin-top: 5px;">
              <span style="background: var(--info); color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.8rem; margin-right: 5px;">
                ${ex.bodyPart}
              </span>
              <span style="background: ${ex.trainingStyle === 'strength' ? '#dc3545' : '#6366f1'}; color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.8rem;">
                ${ex.trainingStyle === 'strength' ? '💪 Strength' : '📈 Hypertrophy'}
              </span>
            </div>
          </div>
          <button onclick="removeExercise(this)" class="remove-btn">×</button>
        </div>
        
        <div class="previous-performance"></div>
        <div class="sets-container"></div>
        <button class="add-set-btn" onclick="addSet(this)">+ Add Set</button>
      </div>
    `;
    
    container.appendChild(entry);
    
    // Show previous performance
    const fakeInput = document.createElement('input');
    fakeInput.value = ex.name;
    entry.appendChild(fakeInput);
    entry.dataset.exerciseName = ex.name.toLowerCase();
    showPreviousPerformance(fakeInput);
    fakeInput.remove();
    
    // Add sets with weight recommendations
    for (let i = 0; i < ex.sets; i++) {
      const setRow = document.createElement('div');
      setRow.className = 'set-row';
      
      // Get weight recommendation for this exercise and rep range
      const recommendation = getWeightRecommendation(ex.name, ex.reps);
      let weightSuggestion = '';
      
      if (recommendation) {
        weightSuggestion = `
          <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 2px;">
            💡 Suggested: ${recommendation.weight}kg (1RM: ${recommendation.estimated1RM.toFixed(1)}kg)
          </div>
        `;
      }
      
      setRow.innerHTML = `
        <span>Set ${i + 1}</span>
        <input type="number" placeholder="Reps" min="1" class="set-reps reps-input" value="${ex.reps}" onchange="updateWeightSuggestion(this)" />
        <div style="display: flex; flex-direction: column; flex: 1;">
          <input type="number" placeholder="Weight (kg)" step="0.5" min="0" class="set-weight weight-input" />
          ${weightSuggestion}
        </div>
        <button class="btn-secondary" onclick="markSetComplete(this)" style="padding: 8px 12px; font-size: 0.85rem;">✓</button>
        <button class="remove-btn" onclick="removeSet(this)">×</button>
      `;
      entry.querySelector('.sets-container').appendChild(setRow);
    }
  });
}

// Update openWorkoutModal to show body part builder
openWorkoutModal = function() {
  document.getElementById('workout-modal').classList.add('active');
  document.getElementById('workout-name').value = '';
  showBodyPartWorkoutBuilder();
};

// Show custom body part builder
function showCustomBodyPartBuilder() {
  const container = document.getElementById('exercises-container');
  
  // All available body parts
  const allBodyParts = [
    { name: 'Chest', emoji: '🫁', category: 'Upper Body' },
    { name: 'Upper Back', emoji: '🦴', category: 'Upper Body' },
    { name: 'Lower Back', emoji: '💪', category: 'Lower Body' },
    { name: 'Front Delts', emoji: '💪', category: 'Upper Body' },
    { name: 'Side Delts', emoji: '💪', category: 'Upper Body' },
    { name: 'Rear Delts', emoji: '💪', category: 'Upper Body' },
    { name: 'Biceps', emoji: '💪', category: 'Upper Body' },
    { name: 'Triceps', emoji: '💪', category: 'Upper Body' },
    { name: 'Forearms', emoji: '💪', category: 'Upper Body' },
    { name: 'Quads', emoji: '🦵', category: 'Lower Body' },
    { name: 'Hamstrings', emoji: '🦵', category: 'Lower Body' },
    { name: 'Glutes', emoji: '🍑', category: 'Lower Body' },
    { name: 'Calves', emoji: '🦵', category: 'Lower Body' },
    { name: 'Abs', emoji: '🎯', category: 'Core' },
    { name: 'Obliques', emoji: '🎯', category: 'Core' }
  ];
  
  container.innerHTML = `
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; color: white;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; font-size: 1.3rem;">⚙️ Custom Workout Builder</h3>
        <button onclick="showBodyPartWorkoutBuilder()" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem; background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); color: white;">
          ← Back
        </button>
      </div>
      <p style="margin: 0; opacity: 0.95;">Select the body parts you want to train today</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
        <button onclick="selectAllBodyParts()" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          ✓ Select All
        </button>
        <button onclick="deselectAllBodyParts()" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          ✗ Deselect All
        </button>
        <button onclick="selectCategory('Upper Body')" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          Upper Body
        </button>
        <button onclick="selectCategory('Lower Body')" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          Lower Body
        </button>
        <button onclick="selectCategory('Core')" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          Core
        </button>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
      ${allBodyParts.map(bp => `
        <label class="body-part-checkbox-card" data-category="${bp.category}" style="
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: white;
          border: 2px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        "
        onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-2px)';"
        onmouseout="if(!this.querySelector('input').checked) { this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; }"
        >
          <input type="checkbox" value="${bp.name}" style="width: 20px; height: 20px; cursor: pointer;" onchange="updateBodyPartCardStyle(this)" />
          <div>
            <div style="font-size: 1.5rem; margin-bottom: 5px;">${bp.emoji}</div>
            <div style="font-weight: 600; color: var(--dark); font-size: 0.95rem;">${bp.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${bp.category}</div>
          </div>
        </label>
      `).join('')}
    </div>
    
    <button class="btn-primary" onclick="buildCustomWorkout()" style="width: 100%; padding: 15px; font-size: 1.1rem;">
      ✓ Continue with Selected Body Parts
    </button>
  `;
}

// Update body part card style when checkbox changes
function updateBodyPartCardStyle(checkbox) {
  const card = checkbox.closest('.body-part-checkbox-card');
  if (checkbox.checked) {
    card.style.borderColor = 'var(--primary)';
    card.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
    card.style.transform = 'translateY(-2px)';
  } else {
    card.style.borderColor = 'var(--border)';
    card.style.background = 'white';
    card.style.transform = 'translateY(0)';
  }
}

// Select all body parts
function selectAllBodyParts() {
  document.querySelectorAll('.body-part-checkbox-card input[type="checkbox"]').forEach(cb => {
    cb.checked = true;
    updateBodyPartCardStyle(cb);
  });
}

// Deselect all body parts
function deselectAllBodyParts() {
  document.querySelectorAll('.body-part-checkbox-card input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    updateBodyPartCardStyle(cb);
  });
}

// Select body parts by category
function selectCategory(category) {
  document.querySelectorAll('.body-part-checkbox-card').forEach(card => {
    if (card.dataset.category === category) {
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.checked = true;
      updateBodyPartCardStyle(checkbox);
    }
  });
}

// Build custom workout from selected body parts
function buildCustomWorkout() {
  const selectedBodyParts = [];
  document.querySelectorAll('.body-part-checkbox-card input[type="checkbox"]:checked').forEach(cb => {
    selectedBodyParts.push({
      name: cb.value,
      emoji: cb.closest('.body-part-checkbox-card').querySelector('div > div:first-child').textContent,
      required: true
    });
  });
  
  if (selectedBodyParts.length === 0) {
    alert('Please select at least one body part');
    return;
  }
  
  // Create custom template
  const customTemplate = {
    name: 'Custom Workout',
    bodyParts: selectedBodyParts
  };
  
  // Use the existing selectWorkoutType logic with custom template
  const container = document.getElementById('exercises-container');
  
  document.getElementById('workout-name').value = customTemplate.name;
  
  container.innerHTML = `
    <div style="background: var(--light); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: var(--dark); margin: 0;">📋 ${customTemplate.name} - Select Exercises</h3>
        <button onclick="showCustomBodyPartBuilder()" class="btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
          ← Back
        </button>
      </div>
      <p style="color: var(--text-light); margin-bottom: 20px;">
        Choose one exercise per body part and select your training style
      </p>
    </div>
    
    <div id="body-parts-container"></div>
    
    <button class="btn-primary" onclick="finalizeBodyPartWorkout()" style="width: 100%; margin-top: 20px;">
      ✓ Start Workout
    </button>
  `;
  
  const bodyPartsContainer = document.getElementById('body-parts-container');
  
  customTemplate.bodyParts.forEach((bodyPart, index) => {
    const bodyPartCard = createBodyPartCard(bodyPart, index);
    bodyPartsContainer.appendChild(bodyPartCard);
  });
  
  startWorkoutTimer();
}

// Make functions global
window.showCustomBodyPartBuilder = showCustomBodyPartBuilder;
window.updateBodyPartCardStyle = updateBodyPartCardStyle;
window.selectAllBodyParts = selectAllBodyParts;
window.deselectAllBodyParts = deselectAllBodyParts;
window.selectCategory = selectCategory;
window.buildCustomWorkout = buildCustomWorkout;

console.log('Body part focused workout system loaded! 🎯');
