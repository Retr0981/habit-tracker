import { StyleSheet } from 'react-native';

export const Colors = {
  background: '#0f0f1a',
  surface: '#1a1a2e',
  surfaceLight: '#25253d',
  text: '#e8e8f0',
  textSecondary: '#8888a8',
  accent: '#6c63ff',
  accentLight: '#8b83ff',
  success: '#4ecdc4',
  danger: '#ff6b6b',
  warning: '#ffe66d',
  white: '#ffffff',
};

export const baseStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  surface: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  text: {
    color: Colors.text,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
});

export const HABIT_COLORS = [
  '#6c63ff', // purple
  '#4ecdc4', // teal
  '#ff6b6b', // coral
  '#ffe66d', // yellow
  '#a8e6cf', // mint
  '#ff8a5c', // orange
  '#ea80fc', // pink
  '#80d8ff', // light blue
];
