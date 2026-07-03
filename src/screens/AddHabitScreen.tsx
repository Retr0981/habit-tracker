import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useHabits } from '../context/HabitContext';
import { Colors, HABIT_COLORS } from '../components/theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;

const EMOJI_OPTIONS = ['💪', '📖', '🏃', '🧘', '💧', '🎨', '💻', '🎵', '🥗', '😴', '✍️', '🎯'];

export function AddHabitScreen({ navigation }: { navigation: Nav }) {
  const { addHabit } = useHabits();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);

  const handleSave = () => {
    if (name.trim().length === 0) return;
    addHabit(name.trim(), emoji, color);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>New Habit</Text>

        {/* Emoji picker */}
        <Text style={styles.label}>Pick an icon</Text>
        <View style={styles.emojiRow}>
          {EMOJI_OPTIONS.map((e) => (
            <TouchableOpacity
              key={e}
              style={[styles.emojiCircle, emoji === e && { borderColor: Colors.accent, borderWidth: 2 }]}
              onPress={() => setEmoji(e)}
            >
              <Text style={styles.emojiText}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color picker */}
        <Text style={styles.label}>Pick a color</Text>
        <View style={styles.colorRow}>
          {HABIT_COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.colorCircle,
                { backgroundColor: c },
                color === c && styles.colorCircleSelected,
              ]}
              onPress={() => setColor(c)}
            />
          ))}
        </View>

        {/* Name input */}
        <Text style={styles.label}>Habit name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Read 30 minutes"
          placeholderTextColor={Colors.textSecondary}
          value={name}
          onChangeText={setName}
          autoFocus
          maxLength={40}
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: color }]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Create Habit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 22,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: Colors.white,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 32,
  },
  saveButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
