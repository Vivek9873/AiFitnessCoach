export interface UserDetails {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'endurance';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutLocation: 'home' | 'gym' | 'outdoor';
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'keto';
  medicalHistory?: string;
  stressLevel?: 'low' | 'medium' | 'high';
}

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  notes?: string;
}

export interface Meal {
  name: string;
  items: string[];
  calories?: string;
  protein?: string;
}

export interface DietPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

export interface FitnessPlan {
  workoutPlan: WorkoutDay[];
  dietPlan: DietPlan;
  tips: string[];
  motivation: string;
}