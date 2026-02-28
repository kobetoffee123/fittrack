// FitTrack v2.0 - Complete Fitness Tracker
// All features implementation

// ============================================
// DATA STORAGE
// ============================================
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
  units: 'kg',
  dailyCalorieGoal: 2000,
  dailyProteinGoal: 150,
  dailyWaterGoal: 3000
};

// ============================================
// ACHIEVEMENT DEFINITIONS
// ============================================
const achievementDefinitions = [
  { id: 'first_workout', name: 'First Steps', description: 'Complete your first workout', icon: '🎯', check: () => workouts.length >= 1 },
  { id: 'week_streak', name: 'Week Warrior', description: '7-day workout streak', icon: '🔥', check: () => calculateStreak() >= 7 },
  { id: 'month_streak', name: 'Monthly Master', description: '30-day workout streak', icon: '💪', check: () => calculateStreak() >= 30 },
  { id: 'hundred_workouts', name: 'Century Club', description: 'Complete 100 workouts', icon: '💯', check: () => workouts.length >= 100 },
  { id: 'thousand_kg', name: 'Ton Lifter', description: 'Lift 1000kg total volume in one workout', icon: '🏋️', check: () => workouts.some(w => calculateWorkoutVolume(w) >= 1000) },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a workout before 7 AM', icon: '🌅', check: () => workouts.some(w => new Date(w.date).getHours() < 7) },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a workout after 10 PM', icon: '🦉', check: () => workouts.some(w => new Date(w.date).getHours() >= 22) },
  { id: 'hydration_hero', name: 'Hydration Hero', description: 'Drink 3L of water in one day', icon: '💧', check: () => {
    const today = new Date().toDateString();
    const todayWater = waterIntake.filter(w => new Date(w.date).toDateString() === today);
    return todayWater.reduce((sum, w) => sum + w.amount, 0) >= 3000;
  }},
  { id: 'nutrition_tracker', name: 'Nutrition Ninja', description: 'Log nutrition for 7 consecutive days', icon: '🍎', check: () => {
    const dates = nutritionLogs.map(n => new Date(n.date).toDateString());
    const uniqueDates = [...new Set(dates)].sort();
    let streak = 0;
    for (let i = 0; i < uniqueDates.length; i++) {
      if (i === 0 || new Date(uniqueDates[i]) - new Date(uniqueDates[i-1]) === 86400000) {
        streak++;
      } else {
        streak = 1;
      }
    }
    return streak >= 7;
  }},
  { id: 'sleep_champion', name: 'Sleep Champion', description: 'Log 8+ hours of sleep for 7 days', icon: '😴', check: () => {
    const recentSleep = sleepLogs.slice(-7);
    return recentSleep.length >= 7 && recentSleep.every(s => s.hours >= 8);
  }}
];

// ============================================
// MOTIVATIONAL QUOTES
// ============================================
const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The difference between try and triumph is a little umph.",
  "Don't wish for it, work for it.",
  "Sweat is fat crying.",
  "The only way to finish is to start.",
  "Believe in yourself and all that you are.",
  "Push yourself because no one else is going to do it for you."
];

// ============================================
// STRENGTH STANDARDS (kg for reference lifts)
// ============================================
const strengthStandards = {
  'Bench Press': {
    beginner: { male: 50, female: 25 },
    intermediate: { male: 80, female: 45 },
    advanced: { male: 110, female: 65 },
    elite: { male: 140, female: 85 }
  },
  'Squat': {
    beginner: { male: 60, female: 35 },
    intermediate: { male: 100, female: 60 },
    advanced: { male: 140, female: 90 },
    elite: { male: 180, female: 120 }
  },
  'Deadlift': {
    beginner: { male: 80, female: 45 },
    intermediate: { male: 130, female: 75 },
    advanced: { male: 180, female: 110 },
    elite: { male: 230, female: 145 }
  },
  'Overhead Press': {
    beginner: { male: 35, female: 20 },
    intermediate: { male: 55, female: 30 },
    advanced: { male: 75, female: 45 },
    elite: { male: 95, female: 60 }
  }
};


// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  setupKeyboardShortcuts();
  checkAchievements();
  requestNotificationPermission();
});

function initializeApp() {
  updateDate();
  updateStats();
  applySettings();
  showMotivationalQuote();
  
  // Check for deload week
  checkDeloadWeek();
  
  // Check for overtraining
  checkOvertraining();
}

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

function showMotivationalQuote() {
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const quoteElement = document.createElement('div');
  quoteElement.style.cssText = `
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 12px;
    margin: 20px 0;
    text-align: center;
    font-style: italic;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  `;
  quoteElement.innerHTML = `"${quote}"`;
  
  const container = document.querySelector('.container');
  const tabs = document.querySelector('.tabs');
  container.insertBefore(quoteElement, tabs);
}

// ============================================
// SETTINGS & DARK MODE
// ============================================
function applySettings() {
  if (settings.darkMode) {
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) toggle.checked = true;
  }
  
  const notifToggle = document.getElementById('notifications-toggle');
  if (notifToggle) notifToggle.checked = settings.notifications;
  
  const unitsSelect = document.getElementById('units-select');
  if (unitsSelect) unitsSelect.value = settings.units;
}

function toggleDarkMode() {
  settings.darkMode = !settings.darkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('settings', JSON.stringify(settings));
}

function toggleNotifications() {
  settings.notifications = !settings.notifications;
  localStorage.setItem('settings', JSON.stringify(settings));
  
  if (settings.notifications) {
    requestNotificationPermission();
  }
}

function changeUnits(units) {
  settings.units = units;
  localStorage.setItem('settings', JSON.stringify(settings));
  // Refresh displays
  renderWorkouts();
  renderBodyWeights();
}

function requestNotificationPermission() {
  if (settings.notifications && 'Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function showNotification(title, body) {
  if (settings.notifications && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '💪' });
  }
}


// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Only trigger if not typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key.toLowerCase()) {
      case 'n':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          openWorkoutModal();
        }
        break;
      case 'c':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          openCardioModal();
        }
        break;
      case 'w':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          openWeightModal();
        }
        break;
      case 'd':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          toggleDarkMode();
        }
        break;
      case 'e':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          exportAllData();
        }
        break;
    }
  });
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${tab}-tab`).classList.add('active');
      
      // Render content based on tab
      switch(tab) {
        case 'gym':
          renderWorkouts();
          break;
        case 'cardio':
          renderCardio();
          break;
        case 'bodyweight':
          renderBodyWeights();
          renderMeasurements();
          renderProgressPhotos();
          break;
        case 'nutrition':
          renderNutritionSummary();
          renderWaterTracker();
          renderSleepTracker();
          renderNutritionList();
          break;
        case 'progress':
          renderAchievements();
          renderWeeklySummary();
          renderMuscleVolumeChart();
          renderStrengthStandards();
          break;
        case 'records':
          renderPersonalRecords();
          break;
        case 'exercises':
          renderExerciseLibrary();
          break;
        case 'settings':
          // Settings already rendered
          break;
      }
    });
  });

  // Gym buttons
  document.getElementById('new-workout-btn')?.addEventListener('click', openWorkoutModal);
  document.getElementById('repeat-last-workout-btn')?.addEventListener('click', repeatLastWorkout);
  document.getElementById('load-template-btn')?.addEventListener('click', openTemplateModal);

  // Body weight buttons
  document.getElementById('log-weight-btn')?.addEventListener('click', openWeightModal);
  document.getElementById('log-measurement-btn')?.addEventListener('click', openMeasurementsModal);
  document.getElementById('add-photo-btn')?.addEventListener('click', openPhotoModal);

  // Nutrition buttons
  document.getElementById('log-nutrition-btn')?.addEventListener('click', openNutritionModal);
  document.getElementById('log-water-btn')?.addEventListener('click', openWaterModal);
  document.getElementById('log-sleep-btn')?.addEventListener('click', openSleepModal);

  // Settings buttons
  document.getElementById('dark-mode-toggle')?.addEventListener('change', toggleDarkMode);
  document.getElementById('notifications-toggle')?.addEventListener('change', toggleNotifications);
  document.getElementById('units-select')?.addEventListener('change', (e) => changeUnits(e.target.value));
  document.getElementById('export-data-btn')?.addEventListener('click', exportAllData);
  document.getElementById('import-data-btn')?.addEventListener('click', () => document.getElementById('import-file-input').click());
  document.getElementById('import-file-input')?.addEventListener('change', importData);
  document.getElementById('print-workout-btn')?.addEventListener('click', printWorkout);
  document.getElementById('clear-data-btn')?.addEventListener('click', clearAllData);

  // Modal close buttons
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('active');
    });
  });

  // Photo preview
  document.getElementById('photo-input')?.addEventListener('change', previewPhoto);
}

// ============================================
// WORKOUT FUNCTIONS
// ============================================
function repeatLastWorkout() {
  if (workouts.length === 0) {
    alert('No previous workouts to repeat!');
    return;
  }
  
  const lastWorkout = workouts[0];
  openWorkoutModal();
  
  // Populate with last workout data
  document.getElementById('workout-name').value = lastWorkout.name;
  
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  lastWorkout.exercises.forEach(ex => {
    addExerciseEntry();
    const entries = container.querySelectorAll('.exercise-entry');
    const entry = entries[entries.length - 1];
    
    entry.querySelector('.exercise-name').value = ex.name;
    
    ex.sets.forEach(() => {
      const addSetBtn = entry.querySelector('.add-set-btn');
      if (addSetBtn) addSetBtn.click();
    });
  });
  
  showNotification('Workout Loaded', `Repeating: ${lastWorkout.name}`);
}

function openTemplateModal() {
  document.getElementById('template-modal').classList.add('active');
  renderTemplateList();
}

function closeTemplateModal() {
  document.getElementById('template-modal').classList.remove('active');
}

function renderTemplateList() {
  const container = document.getElementById('template-list');
  
  if (workoutTemplates.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No saved templates yet</p>
        <p style="font-size: 0.9rem; color: var(--text-light);">Complete a workout and save it as a template!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = workoutTemplates.map(template => `
    <div class="cardio-item">
      <div class="workout-header">
        <span class="workout-name">${template.name}</span>
        <span class="workout-date">${template.exercises.length} exercises</span>
      </div>
      <div style="margin-top: 10px; display: flex; gap: 10px;">
        <button class="btn-primary" onclick="loadTemplate(${template.id})" style="flex: 1;">Load</button>
        <button class="btn-danger" onclick="deleteTemplate(${template.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function saveAsTemplate() {
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

  const template = {
    id: Date.now(),
    name,
    exercises
  };

  workoutTemplates.push(template);
  localStorage.setItem('workoutTemplates', JSON.stringify(workoutTemplates));
  
  showNotification('Template Saved', `${name} saved as template`);
}

function loadTemplate(id) {
  const template = workoutTemplates.find(t => t.id === id);
  if (!template) return;
  
  closeTemplateModal();
  openWorkoutModal();
  
  document.getElementById('workout-name').value = template.name;
  
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  
  template.exercises.forEach(ex => {
    addExerciseEntry();
    const entries = container.querySelectorAll('.exercise-entry');
    const entry = entries[entries.length - 1];
    
    entry.querySelector('.exercise-name').value = ex.name;
    
    ex.sets.forEach(set => {
      const addSetBtn = entry.querySelector('.add-set-btn');
      if (addSetBtn) addSetBtn.click();
      
      const setRows = entry.querySelectorAll('.set-row');
      const lastRow = setRows[setRows.length - 1];
      const inputs = lastRow.querySelectorAll('input');
      inputs[0].value = set.reps;
      inputs[1].value = set.weight;
    });
  });
}

function deleteTemplate(id) {
  if (!confirm('Delete this template?')) return;
  
  workoutTemplates = workoutTemplates.filter(t => t.id !== id);
  localStorage.setItem('workoutTemplates', JSON.stringify(workoutTemplates));
  renderTemplateList();
}

function calculateWorkoutVolume(workout) {
  let totalVolume = 0;
  workout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      totalVolume += set.reps * set.weight;
    });
  });
  return totalVolume;
}


// ============================================
// BODY MEASUREMENTS
// ============================================
function openMeasurementsModal() {
  document.getElementById('measurements-modal').classList.add('active');
  document.getElementById('measure-date').value = new Date().toISOString().split('T')[0];
}

function closeMeasurementsModal() {
  document.getElementById('measurements-modal').classList.remove('active');
}

function saveMeasurements() {
  const measurements = {
    id: Date.now(),
    date: new Date(document.getElementById('measure-date').value).toISOString(),
    chest: parseFloat(document.getElementById('measure-chest').value) || null,
    waist: parseFloat(document.getElementById('measure-waist').value) || null,
    hips: parseFloat(document.getElementById('measure-hips').value) || null,
    armLeft: parseFloat(document.getElementById('measure-arm-left').value) || null,
    armRight: parseFloat(document.getElementById('measure-arm-right').value) || null,
    thighLeft: parseFloat(document.getElementById('measure-thigh-left').value) || null,
    thighRight: parseFloat(document.getElementById('measure-thigh-right').value) || null,
    calfLeft: parseFloat(document.getElementById('measure-calf-left').value) || null,
    calfRight: parseFloat(document.getElementById('measure-calf-right').value) || null
  };
  
  bodyMeasurements.push(measurements);
  bodyMeasurements.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('bodyMeasurements', JSON.stringify(bodyMeasurements));
  
  closeMeasurementsModal();
  renderMeasurements();
  showNotification('Measurements Saved', 'Body measurements logged successfully');
}

function renderMeasurements() {
  const container = document.getElementById('measurements-display');
  
  if (bodyMeasurements.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No measurements yet</p></div>';
    return;
  }
  
  const latest = bodyMeasurements[bodyMeasurements.length - 1];
  const first = bodyMeasurements[0];
  
  const renderMeasure = (name, current, initial) => {
    if (!current) return '';
    const change = initial ? (current - initial).toFixed(1) : null;
    return `
      <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid var(--primary);">
        <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">${name}</div>
        <div style="font-size: 1.5rem; font-weight: bold; color: var(--dark);">${current} cm</div>
        ${change ? `<div style="font-size: 0.85rem; color: ${change >= 0 ? 'var(--success)' : 'var(--primary)'}; margin-top: 5px;">
          ${change >= 0 ? '+' : ''}${change} cm
        </div>` : ''}
      </div>
    `;
  };
  
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
      ${renderMeasure('Chest', latest.chest, first.chest)}
      ${renderMeasure('Waist', latest.waist, first.waist)}
      ${renderMeasure('Hips', latest.hips, first.hips)}
      ${renderMeasure('Left Arm', latest.armLeft, first.armLeft)}
      ${renderMeasure('Right Arm', latest.armRight, first.armRight)}
      ${renderMeasure('Left Thigh', latest.thighLeft, first.thighLeft)}
      ${renderMeasure('Right Thigh', latest.thighRight, first.thighRight)}
      ${renderMeasure('Left Calf', latest.calfLeft, first.calfLeft)}
      ${renderMeasure('Right Calf', latest.calfRight, first.calfRight)}
    </div>
    <div style="text-align: center; color: var(--text-light); font-size: 0.9rem;">
      Last updated: ${formatDate(latest.date)}
    </div>
  `;
}

// ============================================
// PROGRESS PHOTOS
// ============================================
function openPhotoModal() {
  document.getElementById('photo-modal').classList.add('active');
  document.getElementById('photo-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('photo-preview').innerHTML = '';
}

function closePhotoModal() {
  document.getElementById('photo-modal').classList.remove('active');
}

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    document.getElementById('photo-preview').innerHTML = `
      <img src="${event.target.result}" style="max-width: 100%; border-radius: 8px; margin-top: 10px;" />
    `;
  };
  reader.readAsDataURL(file);
}

function saveProgressPhoto() {
  const fileInput = document.getElementById('photo-input');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a photo');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const photo = {
      id: Date.now(),
      date: new Date(document.getElementById('photo-date').value).toISOString(),
      image: event.target.result,
      notes: document.getElementById('photo-notes').value.trim()
    };
    
    progressPhotos.push(photo);
    progressPhotos.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('progressPhotos', JSON.stringify(progressPhotos));
    
    closePhotoModal();
    renderProgressPhotos();
    showNotification('Photo Saved', 'Progress photo added successfully');
  };
  reader.readAsDataURL(file);
}

function renderProgressPhotos() {
  const container = document.getElementById('progress-photos');
  
  if (progressPhotos.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No progress photos yet</p></div>';
    return;
  }
  
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
      ${progressPhotos.map(photo => `
        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <img src="${photo.image}" style="width: 100%; height: 200px; object-fit: cover;" />
          <div style="padding: 10px;">
            <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">
              ${formatDate(photo.date)}
            </div>
            ${photo.notes ? `<div style="font-size: 0.9rem; color: var(--text);">${photo.notes}</div>` : ''}
            <button onclick="deletePhoto(${photo.id})" style="margin-top: 10px; padding: 6px 12px; background: var(--danger); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; width: 100%;">
              Delete
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function deletePhoto(id) {
  if (!confirm('Delete this photo?')) return;
  
  progressPhotos = progressPhotos.filter(p => p.id !== id);
  localStorage.setItem('progressPhotos', JSON.stringify(progressPhotos));
  renderProgressPhotos();
}


// ============================================
// NUTRITION TRACKING
// ============================================
function openNutritionModal() {
  document.getElementById('nutrition-modal').classList.add('active');
}

function closeNutritionModal() {
  document.getElementById('nutrition-modal').classList.remove('active');
}

function saveNutrition() {
  const nutrition = {
    id: Date.now(),
    date: new Date().toISOString(),
    mealType: document.getElementById('meal-type').value,
    calories: parseInt(document.getElementById('meal-calories').value) || 0,
    protein: parseInt(document.getElementById('meal-protein').value) || 0,
    carbs: parseInt(document.getElementById('meal-carbs').value) || 0,
    fats: parseInt(document.getElementById('meal-fats').value) || 0,
    description: document.getElementById('meal-description').value.trim()
  };
  
  nutritionLogs.push(nutrition);
  localStorage.setItem('nutritionLogs', JSON.stringify(nutritionLogs));
  
  closeNutritionModal();
  renderNutritionSummary();
  renderNutritionList();
  checkAchievements();
  showNotification('Meal Logged', `${nutrition.calories} calories logged`);
}

function renderNutritionSummary() {
  const container = document.getElementById('nutrition-summary');
  const today = new Date().toDateString();
  const todayMeals = nutritionLogs.filter(n => new Date(n.date).toDateString() === today);
  
  const totals = todayMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  
  const caloriePercent = (totals.calories / settings.dailyCalorieGoal) * 100;
  const proteinPercent = (totals.protein / settings.dailyProteinGoal) * 100;
  
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
      <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary);">
        <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Calories</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${totals.calories}</div>
        <div style="font-size: 0.85rem; color: var(--text-light); margin-top: 5px;">
          Goal: ${settings.dailyCalorieGoal} (${caloriePercent.toFixed(0)}%)
        </div>
        <div style="background: var(--light); height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
          <div style="background: var(--primary); height: 100%; width: ${Math.min(caloriePercent, 100)}%; transition: width 0.3s;"></div>
        </div>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid var(--success);">
        <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Protein</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${totals.protein}g</div>
        <div style="font-size: 0.85rem; color: var(--text-light); margin-top: 5px;">
          Goal: ${settings.dailyProteinGoal}g (${proteinPercent.toFixed(0)}%)
        </div>
        <div style="background: var(--light); height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
          <div style="background: var(--success); height: 100%; width: ${Math.min(proteinPercent, 100)}%; transition: width 0.3s;"></div>
        </div>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid var(--warning);">
        <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Carbs</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${totals.carbs}g</div>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid var(--secondary);">
        <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Fats</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${totals.fats}g</div>
      </div>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 12px;">
      <h3 style="margin-bottom: 15px;">Today's Meals</h3>
      ${todayMeals.length === 0 ? '<p style="color: var(--text-light);">No meals logged today</p>' : 
        todayMeals.map(meal => `
          <div style="padding: 10px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600;">${meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</div>
              <div style="font-size: 0.9rem; color: var(--text-light);">${meal.description || 'No description'}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 600;">${meal.calories} cal</div>
              <div style="font-size: 0.85rem; color: var(--text-light);">P: ${meal.protein}g C: ${meal.carbs}g F: ${meal.fats}g</div>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function renderNutritionList() {
  const container = document.getElementById('nutrition-list');
  
  if (nutritionLogs.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No nutrition logs yet</p></div>';
    return;
  }
  
  // Group by date
  const byDate = {};
  nutritionLogs.forEach(meal => {
    const date = new Date(meal.date).toDateString();
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(meal);
  });
  
  container.innerHTML = Object.keys(byDate).reverse().slice(0, 7).map(date => {
    const meals = byDate[date];
    const totals = meals.reduce((acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein
    }), { calories: 0, protein: 0 });
    
    return `
      <div class="cardio-item">
        <div class="workout-header">
          <span class="workout-name">${formatDate(date)}</span>
          <span class="workout-date">${totals.calories} cal | ${totals.protein}g protein</span>
        </div>
        <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-light);">
          ${meals.length} meals logged
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// WATER TRACKING
// ============================================
function openWaterModal() {
  document.getElementById('water-modal').classList.add('active');
}

function closeWaterModal() {
  document.getElementById('water-modal').classList.remove('active');
}

function addWater(amount) {
  const water = {
    id: Date.now(),
    date: new Date().toISOString(),
    amount
  };
  
  waterIntake.push(water);
  localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  
  renderWaterTracker();
  checkAchievements();
  showNotification('Water Logged', `+${amount}ml`);
}

function addCustomWater() {
  const amount = parseInt(document.getElementById('water-custom').value);
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  
  addWater(amount);
  document.getElementById('water-custom').value = '';
  closeWaterModal();
}

function renderWaterTracker() {
  const container = document.getElementById('water-tracker');
  const today = new Date().toDateString();
  const todayWater = waterIntake.filter(w => new Date(w.date).toDateString() === today);
  const total = todayWater.reduce((sum, w) => sum + w.amount, 0);
  const percent = (total / settings.dailyWaterGoal) * 100;
  
  const glasses = Math.floor(total / 250);
  const glassIcons = '💧'.repeat(Math.min(glasses, 12));
  
  container.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 12px; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 15px;">${glassIcons || '🥤'}</div>
      <div style="font-size: 2.5rem; font-weight: bold; color: var(--primary); margin-bottom: 10px;">
        ${total}ml
      </div>
      <div style="font-size: 1rem; color: var(--text-light); margin-bottom: 20px;">
        Goal: ${settings.dailyWaterGoal}ml (${percent.toFixed(0)}%)
      </div>
      <div style="background: var(--light); height: 12px; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, var(--primary), var(--secondary)); height: 100%; width: ${Math.min(percent, 100)}%; transition: width 0.3s;"></div>
      </div>
      <button class="btn-primary" onclick="openWaterModal()">+ Add Water</button>
    </div>
  `;
}

// ============================================
// SLEEP TRACKING
// ============================================
function openSleepModal() {
  document.getElementById('sleep-modal').classList.add('active');
  document.getElementById('sleep-date').value = new Date().toISOString().split('T')[0];
}

function closeSleepModal() {
  document.getElementById('sleep-modal').classList.remove('active');
}

function saveSleep() {
  const sleep = {
    id: Date.now(),
    date: new Date(document.getElementById('sleep-date').value).toISOString(),
    hours: parseFloat(document.getElementById('sleep-hours').value),
    quality: document.getElementById('sleep-quality').value,
    notes: document.getElementById('sleep-notes').value.trim()
  };
  
  if (!sleep.hours || sleep.hours <= 0) {
    alert('Please enter valid sleep hours');
    return;
  }
  
  sleepLogs.push(sleep);
  sleepLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('sleepLogs', JSON.stringify(sleepLogs));
  
  closeSleepModal();
  renderSleepTracker();
  checkAchievements();
  showNotification('Sleep Logged', `${sleep.hours} hours logged`);
}

function renderSleepTracker() {
  const container = document.getElementById('sleep-tracker');
  
  if (sleepLogs.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No sleep data yet</p></div>';
    return;
  }
  
  const recent = sleepLogs.slice(-7);
  const avgHours = (recent.reduce((sum, s) => sum + s.hours, 0) / recent.length).toFixed(1);
  
  const qualityEmoji = {
    poor: '😴',
    fair: '😐',
    good: '😊',
    excellent: '😄'
  };
  
  container.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 3rem; margin-bottom: 10px;">😴</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--dark);">${avgHours} hours</div>
        <div style="font-size: 0.9rem; color: var(--text-light);">7-day average</div>
      </div>
      
      <div style="display: flex; gap: 5px; justify-content: center; margin-bottom: 20px;">
        ${recent.map(s => `
          <div style="flex: 1; text-align: center;">
            <div style="font-size: 1.5rem;">${qualityEmoji[s.quality]}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${s.hours}h</div>
          </div>
        `).join('')}
      </div>
      
      <button class="btn-primary" onclick="openSleepModal()" style="width: 100%;">+ Log Sleep</button>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 12px;">
      <h3 style="margin-bottom: 15px;">Recent Sleep</h3>
      ${recent.reverse().map(s => `
        <div style="padding: 10px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">${formatDate(s.date)}</div>
            ${s.notes ? `<div style="font-size: 0.9rem; color: var(--text-light);">${s.notes}</div>` : ''}
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.5rem;">${qualityEmoji[s.quality]}</div>
            <div style="font-size: 0.9rem; color: var(--text-light);">${s.hours} hours</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// ============================================
// ACHIEVEMENTS SYSTEM
// ============================================
function checkAchievements() {
  let newAchievements = [];
  
  achievementDefinitions.forEach(def => {
    const alreadyUnlocked = achievements.some(a => a.id === def.id);
    if (!alreadyUnlocked && def.check()) {
      const achievement = {
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        unlockedAt: new Date().toISOString()
      };
      achievements.push(achievement);
      newAchievements.push(achievement);
    }
  });
  
  if (newAchievements.length > 0) {
    localStorage.setItem('achievements', JSON.stringify(achievements));
    newAchievements.forEach(a => {
      showAchievementNotification(a);
    });
  }
}

function showAchievementNotification(achievement) {
  showNotification(`🏆 Achievement Unlocked!`, `${achievement.icon} ${achievement.name}`);
  
  // Show modal
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 400px;">
      <div class="modal-body" style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 5rem; margin-bottom: 20px;">${achievement.icon}</div>
        <h2 style="color: var(--success); margin-bottom: 10px;">Achievement Unlocked!</h2>
        <h3 style="margin-bottom: 10px;">${achievement.name}</h3>
        <p style="color: var(--text-light); margin-bottom: 30px;">${achievement.description}</p>
        <button class="btn-primary" onclick="this.closest('.modal').remove()">Awesome!</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  setTimeout(() => modal.remove(), 5000);
}

function renderAchievements() {
  const container = document.getElementById('achievements-display');
  
  const unlocked = achievements.length;
  const total = achievementDefinitions.length;
  const percent = (unlocked / total) * 100;
  
  container.innerHTML = `
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
      <div style="font-size: 2rem; font-weight: bold; margin-bottom: 5px;">${unlocked} / ${total}</div>
      <div style="font-size: 1rem; opacity: 0.9;">Achievements Unlocked</div>
      <div style="background: rgba(255,255,255,0.2); height: 10px; border-radius: 5px; margin-top: 15px; overflow: hidden;">
        <div style="background: white; height: 100%; width: ${percent}%; transition: width 0.3s;"></div>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
      ${achievementDefinitions.map(def => {
        const unlocked = achievements.find(a => a.id === def.id);
        return `
          <div style="
            background: ${unlocked ? 'white' : 'var(--light)'};
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            opacity: ${unlocked ? '1' : '0.5'};
            border: 2px solid ${unlocked ? 'var(--success)' : 'var(--border)'};
          ">
            <div style="font-size: 3rem; margin-bottom: 10px;">${def.icon}</div>
            <div style="font-weight: 600; margin-bottom: 5px;">${def.name}</div>
            <div style="font-size: 0.85rem; color: var(--text-light);">${def.description}</div>
            ${unlocked ? `<div style="font-size: 0.75rem; color: var(--success); margin-top: 10px;">
              Unlocked ${formatDate(unlocked.unlockedAt)}
            </div>` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============================================
// MUSCLE VOLUME ANALYTICS
// ============================================
function renderMuscleVolumeChart() {
  const container = document.getElementById('muscle-volume-chart');
  
  // Calculate volume per muscle group for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentWorkouts = workouts.filter(w => new Date(w.date) >= thirtyDaysAgo);
  
  const muscleVolume = {
    chest: 0,
    back: 0,
    legs: 0,
    shoulders: 0,
    arms: 0,
    core: 0
  };
  
  recentWorkouts.forEach(workout => {
    workout.exercises.forEach(ex => {
      const name = ex.name.toLowerCase();
      const volume = ex.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
      
      if (name.includes('bench') || name.includes('chest') || name.includes('fly')) {
        muscleVolume.chest += volume;
      } else if (name.includes('row') || name.includes('pull') || name.includes('deadlift') || name.includes('lat')) {
        muscleVolume.back += volume;
      } else if (name.includes('squat') || name.includes('leg') || name.includes('lunge') || name.includes('calf')) {
        muscleVolume.legs += volume;
      } else if (name.includes('shoulder') || name.includes('press') && !name.includes('bench') || name.includes('raise')) {
        muscleVolume.shoulders += volume;
      } else if (name.includes('curl') || name.includes('tricep') || name.includes('dip')) {
        muscleVolume.arms += volume;
      } else if (name.includes('plank') || name.includes('crunch') || name.includes('ab')) {
        muscleVolume.core += volume;
      }
    });
  });
  
  const maxVolume = Math.max(...Object.values(muscleVolume));
  
  container.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px;">
      <h3 style="margin-bottom: 20px;">30-Day Volume by Muscle Group</h3>
      ${Object.entries(muscleVolume).map(([muscle, volume]) => {
        const percent = maxVolume > 0 ? (volume / maxVolume) * 100 : 0;
        return `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-weight: 600; text-transform: capitalize;">${muscle}</span>
              <span style="color: var(--text-light);">${volume.toFixed(0)} kg</span>
            </div>
            <div style="background: var(--light); height: 24px; border-radius: 12px; overflow: hidden;">
              <div style="
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                height: 100%;
                width: ${percent}%;
                transition: width 0.3s;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 10px;
                color: white;
                font-size: 0.85rem;
                font-weight: 600;
              ">
                ${percent > 20 ? percent.toFixed(0) + '%' : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============================================
// STRENGTH STANDARDS
// ============================================
function renderStrengthStandards() {
  const container = document.getElementById('strength-standards');
  
  // Get user's best lifts
  const userLifts = {};
  Object.keys(strengthStandards).forEach(exercise => {
    const exerciseWorkouts = workouts.filter(w => 
      w.exercises.some(ex => ex.name.toLowerCase().includes(exercise.toLowerCase()))
    );
    
    let maxWeight = 0;
    let maxReps = 1;
    
    exerciseWorkouts.forEach(w => {
      w.exercises.forEach(ex => {
        if (ex.name.toLowerCase().includes(exercise.toLowerCase())) {
          ex.sets.forEach(set => {
            const estimated1RM = set.weight * (1 + set.reps / 30);
            if (estimated1RM > maxWeight) {
              maxWeight = estimated1RM;
              maxReps = set.reps;
            }
          });
        }
      });
    });
    
    if (maxWeight > 0) {
      userLifts[exercise] = maxWeight;
    }
  });
  
  container.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 12px;">
      <h3 style="margin-bottom: 20px;">Your Strength Level</h3>
      <p style="color: var(--text-light); margin-bottom: 20px; font-size: 0.9rem;">
        Based on estimated 1RM. Standards are for reference only.
      </p>
      
      ${Object.entries(strengthStandards).map(([exercise, standards]) => {
        const userMax = userLifts[exercise];
        if (!userMax) return '';
        
        // Determine level (assuming male for now)
        let level = 'Beginner';
        let color = 'var(--text-light)';
        
        if (userMax >= standards.elite.male) {
          level = 'Elite';
          color = '#FFD700';
        } else if (userMax >= standards.advanced.male) {
          level = 'Advanced';
          color = 'var(--success)';
        } else if (userMax >= standards.intermediate.male) {
          level = 'Intermediate';
          color = 'var(--primary)';
        }
        
        return `
          <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div>
                <div style="font-weight: 600; font-size: 1.1rem;">${exercise}</div>
                <div style="font-size: 0.9rem; color: var(--text-light);">Est. 1RM: ${userMax.toFixed(1)} kg</div>
              </div>
              <div style="
                background: ${color};
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.9rem;
              ">
                ${level}
              </div>
            </div>
            
            <div style="display: flex; gap: 10px; font-size: 0.85rem;">
              <div style="flex: 1; text-align: center; padding: 8px; background: var(--light); border-radius: 6px;">
                <div style="color: var(--text-light);">Beginner</div>
                <div style="font-weight: 600;">${standards.beginner.male}kg</div>
              </div>
              <div style="flex: 1; text-align: center; padding: 8px; background: var(--light); border-radius: 6px;">
                <div style="color: var(--text-light);">Intermediate</div>
                <div style="font-weight: 600;">${standards.intermediate.male}kg</div>
              </div>
              <div style="flex: 1; text-align: center; padding: 8px; background: var(--light); border-radius: 6px;">
                <div style="color: var(--text-light);">Advanced</div>
                <div style="font-weight: 600;">${standards.advanced.male}kg</div>
              </div>
              <div style="flex: 1; text-align: center; padding: 8px; background: var(--light); border-radius: 6px;">
                <div style="color: var(--text-light);">Elite</div>
                <div style="font-weight: 600;">${standards.elite.male}kg</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
      
      ${Object.keys(userLifts).length === 0 ? '<p style="color: var(--text-light); text-align: center;">Complete workouts with Bench Press, Squat, Deadlift, or Overhead Press to see your strength standards.</p>' : ''}
    </div>
  `;
}

// ============================================
// SMART REMINDERS
// ============================================
function checkDeloadWeek() {
  if (workouts.length < 12) return;
  
  // Check if last 4-6 weeks have been consistent high volume
  const sixWeeksAgo = new Date();
  sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42);
  
  const recentWorkouts = workouts.filter(w => new Date(w.date) >= sixWeeksAgo);
  
  if (recentWorkouts.length >= 12) {
    // Check if user hasn't taken a deload (low volume week) recently
    const avgVolume = recentWorkouts.reduce((sum, w) => sum + calculateWorkoutVolume(w), 0) / recentWorkouts.length;
    
    const lastWeek = workouts.slice(0, 3);
    const lastWeekVolume = lastWeek.reduce((sum, w) => sum + calculateWorkoutVolume(w), 0) / lastWeek.length;
    
    if (lastWeekVolume > avgVolume * 0.8) {
      showNotification('💡 Deload Reminder', 'Consider taking a deload week to recover and prevent overtraining');
    }
  }
}

function checkOvertraining() {
  if (workouts.length < 3) return;
  
  const lastThree = workouts.slice(0, 3);
  const muscleGroups = {};
  
  lastThree.forEach(w => {
    w.exercises.forEach(ex => {
      const name = ex.name.toLowerCase();
      if (name.includes('chest') || name.includes('bench')) {
        muscleGroups.chest = (muscleGroups.chest || 0) + 1;
      }
      if (name.includes('back') || name.includes('row') || name.includes('pull')) {
        muscleGroups.back = (muscleGroups.back || 0) + 1;
      }
      if (name.includes('leg') || name.includes('squat')) {
        muscleGroups.legs = (muscleGroups.legs || 0) + 1;
      }
    });
  });
  
  Object.entries(muscleGroups).forEach(([muscle, count]) => {
    if (count >= 3) {
      showNotification('⚠️ Overtraining Warning', `You've trained ${muscle} 3 times in your last 3 workouts. Consider rest or training other muscles.`);
    }
  });
}


// ============================================
// DATA MANAGEMENT
// ============================================
function exportAllData() {
  const data = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    workouts,
    cardioSessions,
    bodyWeights,
    bodyMeasurements,
    progressPhotos,
    workoutTemplates,
    nutritionLogs,
    waterIntake,
    sleepLogs,
    achievements,
    settings
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fittrack-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Data Exported', 'Your data has been downloaded');
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      
      if (!data.version) {
        alert('Invalid backup file');
        return;
      }
      
      if (!confirm('This will merge the imported data with your existing data. Continue?')) {
        return;
      }
      
      // Merge data
      workouts = [...workouts, ...(data.workouts || [])];
      cardioSessions = [...cardioSessions, ...(data.cardioSessions || [])];
      bodyWeights = [...bodyWeights, ...(data.bodyWeights || [])];
      bodyMeasurements = [...bodyMeasurements, ...(data.bodyMeasurements || [])];
      progressPhotos = [...progressPhotos, ...(data.progressPhotos || [])];
      workoutTemplates = [...workoutTemplates, ...(data.workoutTemplates || [])];
      nutritionLogs = [...nutritionLogs, ...(data.nutritionLogs || [])];
      waterIntake = [...waterIntake, ...(data.waterIntake || [])];
      sleepLogs = [...sleepLogs, ...(data.sleepLogs || [])];
      achievements = [...achievements, ...(data.achievements || [])];
      
      if (data.settings) {
        settings = { ...settings, ...data.settings };
      }
      
      // Save to localStorage
      localStorage.setItem('workouts', JSON.stringify(workouts));
      localStorage.setItem('cardio', JSON.stringify(cardioSessions));
      localStorage.setItem('bodyWeights', JSON.stringify(bodyWeights));
      localStorage.setItem('bodyMeasurements', JSON.stringify(bodyMeasurements));
      localStorage.setItem('progressPhotos', JSON.stringify(progressPhotos));
      localStorage.setItem('workoutTemplates', JSON.stringify(workoutTemplates));
      localStorage.setItem('nutritionLogs', JSON.stringify(nutritionLogs));
      localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
      localStorage.setItem('sleepLogs', JSON.stringify(sleepLogs));
      localStorage.setItem('achievements', JSON.stringify(achievements));
      localStorage.setItem('settings', JSON.stringify(settings));
      
      showNotification('Data Imported', 'Your data has been imported successfully');
      location.reload();
    } catch (error) {
      alert('Error importing data: ' + error.message);
    }
  };
  reader.readAsText(file);
}

function printWorkout() {
  if (workouts.length === 0) {
    alert('No workouts to print');
    return;
  }
  
  const workout = workouts[0];
  const printWindow = window.open('', '', 'width=800,height=600');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${workout.name} - FitTrack</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: #6366f1;
          border-bottom: 3px solid #6366f1;
          padding-bottom: 10px;
        }
        .exercise {
          margin: 20px 0;
          page-break-inside: avoid;
        }
        .exercise-name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f3f4f6;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 0.9rem;
        }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>${workout.name}</h1>
      <p><strong>Date:</strong> ${formatDate(workout.date)}</p>
      <p><strong>Duration:</strong> ${workout.duration || 'N/A'}</p>
      
      ${workout.exercises.map(ex => `
        <div class="exercise">
          <div class="exercise-name">${ex.name}</div>
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Reps</th>
                <th>Weight (kg)</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${ex.sets.map((set, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${set.reps}</td>
                  <td>${set.weight}</td>
                  <td></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
      
      <div class="footer">
        <p>Generated by FitTrack v2.0 on ${new Date().toLocaleDateString()}</p>
        <p>💪 Keep pushing! You've got this!</p>
      </div>
      
      <button onclick="window.print()" style="
        background: #6366f1;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 20px;
      ">Print Workout</button>
    </body>
    </html>
  `);
  
  printWindow.document.close();
}

function clearAllData() {
  if (!confirm('⚠️ WARNING: This will delete ALL your data permanently. This cannot be undone!\n\nAre you absolutely sure?')) {
    return;
  }
  
  if (!confirm('Last chance! All workouts, progress photos, and data will be lost forever. Continue?')) {
    return;
  }
  
  localStorage.clear();
  showNotification('Data Cleared', 'All data has been deleted');
  location.reload();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatDate(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

// ============================================
// DARK MODE CSS
// ============================================
const darkModeStyles = `
  .dark-mode {
    --primary: #818cf8;
    --primary-dark: #6366f1;
    --secondary: #a78bfa;
    --success: #34d399;
    --danger: #f87171;
    --warning: #fbbf24;
    --dark: #f9fafb;
    --light: #1f2937;
    --border: #374151;
    --text: #e5e7eb;
    --text-light: #9ca3af;
  }
  
  .dark-mode body {
    background-color: #111827;
    color: #e5e7eb;
  }
  
  .dark-mode .card {
    background: #1f2937;
    border-color: #374151;
  }
  
  .dark-mode input,
  .dark-mode select,
  .dark-mode textarea {
    background: #374151;
    color: #e5e7eb;
    border-color: #4b5563;
  }
  
  .dark-mode .modal-content {
    background: #1f2937;
  }
  
  .dark-mode .tab-btn {
    color: #9ca3af;
  }
  
  .dark-mode .tab-btn.active {
    color: #818cf8;
    border-bottom-color: #818cf8;
  }
`;

// Add dark mode styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

// ============================================
// INITIALIZE ON LOAD
// ============================================
console.log('FitTrack v2.0 loaded successfully! 💪');
console.log('Keyboard shortcuts:');
console.log('  Ctrl/Cmd + N: New Workout');
console.log('  Ctrl/Cmd + C: Log Cardio');
console.log('  Ctrl/Cmd + W: Log Weight');
console.log('  Ctrl/Cmd + D: Toggle Dark Mode');
console.log('  Ctrl/Cmd + E: Export Data');
