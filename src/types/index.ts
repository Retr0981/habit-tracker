export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  completedDates: string[]; // ISO date strings (YYYY-MM-DD)
  createdAt: string; // ISO datetime
}

export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  HabitDetail: { habitId: string };
  EditHabit: { habitId: string };
};
