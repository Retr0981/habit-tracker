import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Habit } from '../types';
import { Colors } from './theme';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  isCompletedToday: boolean;
  onToggle: () => void;
  onPress: () => void;
}

export function HabitCard({
  habit,
  streak,
  isCompletedToday,
  onToggle,
  onPress,
}: HabitCardProps) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    // Quick bouncy animation
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, { borderLeftColor: habit.color }]}
    >
      <Animated.View style={[styles.inner, { transform: [{ scale }] }]}>
        {/* Left: emoji + name */}
        <View style={styles.info}>
          <Text style={styles.emoji}>{habit.emoji}</Text>
          <View>
            <Text style={styles.name}>{habit.name}</Text>
            <Text style={styles.streak}>
              {streak > 0 ? `🔥 ${streak} day${streak > 1 ? 's' : ''} streak` : 'No streak yet'}
            </Text>
          </View>
        </View>

        {/* Right: check circle */}
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        >
          <View
            style={[
              styles.checkCircle,
              {
                backgroundColor: isCompletedToday
                  ? habit.color
                  : Colors.surfaceLight,
                borderColor: habit.color,
              },
            ]}
          >
            {isCompletedToday && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderLeftWidth: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  emoji: {
    fontSize: 28,
  },
  name: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  streak: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  checkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
