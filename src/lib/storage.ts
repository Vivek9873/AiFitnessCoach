import { FitnessPlan, UserDetails } from '@/types';

const STORAGE_KEY = 'fitness_plan';
const USER_KEY = 'user_details';

export const storage = {
  savePlan: (plan: FitnessPlan) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    }
  },

  loadPlan: (): FitnessPlan | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  saveUserDetails: (details: UserDetails) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(details));
    }
  },

  loadUserDetails: (): UserDetails | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clearAll: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
};