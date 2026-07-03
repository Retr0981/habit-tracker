import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Habit } from '../types';
import { loadHabits, saveHabits } from '../storage/habits';
import { todayString, calcStreak } from '../utils/dates';
import { v4 as uuidv4 } from 'uuid';

interface HabitContextValue {
  habits: Habit[];
  loading: boolean;
  addHabit: (name: string, emoji: string, color: string) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, updates: Partial<Pick<Habit, 'name' | 'emoji' | 'color'>>) => void;
  toggleToday: (id: string) => void;
  isCompletedToday: (id: string) => boolean;
  getStreak: (habit: Habit) => number;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    loadHabits().then((h) => {
      setHabits(h);
      setLoading(false);
    });
  }, []);

  // Persist whenever habits change
  useEffect(() => {
    if (!loading) {
      saveHabits(habits);
    }
  }, [habits, loading]);

  const addHabit = useCallback((name: string, emoji: string, color: string) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      emoji,
      color,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHabit = useCallback(
    (id: string, updates: Partial<Pick<Habit, 'name' | 'emoji' | 'color'>>) => {
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...updates } : h)),
      );
    },
    [],
  );

  const toggleToday = useCallback((id: string) => {
    const today = todayString();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const done = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: done
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      }),
    );
  }, []);

  const isCompletedToday = useCallback(
    (id: string) => {
      const today = todayString();
      return habits.find((h) => h.id === id)?.completedDates.includes(today) ?? false;
    },
    [habits],
  );

  const getStreak = useCallback((habit: Habit) => calcStreak(habit.completedDates, todayString()), []);

  return (
    <HabitContext.Provider
      value={{ habits, loading, addHabit, deleteHabit, updateHabit, toggleToday, isCompletedToday, getStreak }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabits must be used inside HabitProvider');
  return ctx;
}
