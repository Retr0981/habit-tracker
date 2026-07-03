import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useHabits } from '../context/HabitContext';
import { WeekGrid } from '../components/WeekGrid';
import { Colors } from '../components/theme';
import { calcStreak, calcBestStreak, todayString } from '../utils/dates';

type Nav = NativeStackNavigationProp<RootStackParamList, 'HabitDetail'>;

export function HabitDetailScreen({
  navigation,
  route,
}: {
  navigation: Nav;
  route: { params: { habitId: string } };
}) {
  const { habits, deleteHabit, toggleToday, isCompletedToday } = useHabits();
  const habit = habits.find((h) => h.id === route.params.habitId);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Habit not found.</Text>
      </View>
    );
  }

  const streak = calcStreak(habit.completedDates, todayString());
  const bestStreak = calcBestStreak(habit.completedDates);
  const totalCompleted = habit.completedDates.length;

  const handleDelete = () => {
    deleteHabit(habit.id);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{habit.emoji}</Text>
        <Text style={styles.heroName}>{habit.name}</Text>
        <TouchableOpacity
          style={[styles.todayButton, { backgroundColor: isCompletedToday(habit.id) ? habit.color : Colors.surfaceLight, borderColor: habit.color }]}
          onPress={() => toggleToday(habit.id)}
          activeOpacity={0.7}
        >
          <Text style={{ color: isCompletedToday(habit.id) ? Colors.white : habit.color, fontWeight: '700', fontSize: 16 }}>
            {isCompletedToday(habit.id) ? '✓ Done for today' : 'Mark as done'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: habit.color }]}>{streak}</Text>
          <Text style={styles.statLabel}>Current streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: habit.color }]}>{bestStreak}</Text>
          <Text style={styles.statLabel}>Best streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: habit.color }]}>{totalCompleted}</Text>
          <Text style={styles.statLabel}>Total days</Text>
        </View>
      </View>

      {/* This week grid */}
      <Text style={styles.sectionTitle}>This week</Text>
      <View style={styles.weekCard}>
        <WeekGrid completedDates={habit.completedDates} color={habit.color} />
      </View>

      {/* Created info */}
      <Text style={styles.sectionTitle}>Info</Text>
      <View style={styles.weekCard}>
        <Text style={styles.infoText}>
          Created {new Date(habit.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  backText: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  todayButton: {
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  weekCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});
