import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lastNDays, todayString } from '../utils/dates';
import { Colors } from './theme';

interface WeekGridProps {
  completedDates: string[];
  color: string;
}

/** A 7-column mini grid showing the last 7 days. */
export function WeekGrid({ completedDates, color }: WeekGridProps) {
  const days = lastNDays(7);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = todayString();

  return (
    <View style={styles.container}>
      {days.map((dateStr, i) => {
        const isToday = dateStr === today;
        const isCompleted = completedDates.includes(dateStr);
        return (
          <View key={dateStr} style={styles.column}>
            <Text
              style={[
                styles.label,
                isToday && { color, fontWeight: '700' },
              ]}
            >
              {dayLabels[i]}
            </Text>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: isCompleted ? color : Colors.surfaceLight,
                  borderWidth: isToday ? 2 : 0,
                  borderColor: color,
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 4,
  },
  column: {
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
