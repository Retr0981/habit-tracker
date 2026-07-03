# HabitTracker

A clean, dark-themed habit tracker built with Expo + React Native + TypeScript.

## Features

- **Add habits** with custom emoji and color
- **Track daily completions** with a single tap
- **Streak tracking** — current streak, best streak, and total days
- **Weekly grid** — visual overview of the last 7 days
- **Persistent storage** — all data saved locally via AsyncStorage
- **Smooth animations** — bouncy check marks and native feel

## Project structure

```
src/
├── types/index.ts          # TypeScript types and navigation params
├── storage/habits.ts       # AsyncStorage read/write
├── utils/dates.ts          # Date helpers, streak calculation
├── context/HabitContext.tsx # React context for all habit state
├── components/
│   ├── theme.ts            # Colors and shared styles
│   ├── HabitCard.tsx       # Habit list item with animated check
│   └── WeekGrid.tsx        # 7-day mini calendar dots
└── screens/
    ├── HomeScreen.tsx      # Main list with greeting & progress
    ├── AddHabitScreen.tsx  # Create new habit (modal)
    └── HabitDetailScreen.tsx # Stats, weekly grid, delete
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.19
- npm (comes with Node)
- [Expo Go](https://expo.dev/client) on your phone (or an Android/iOS simulator)

### Install & run

```bash
cd HabitTracker
npm install
npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press:
- `a` for Android emulator
- `i` for iOS simulator (macOS only)

### Build for production

```bash
# Android
npx expo export --platform android

# iOS
npx expo export --platform ios
```

## Tech stack

| Layer         | Library                              |
| ------------- | ------------------------------------ |
| Framework     | Expo SDK 52 + React Native 0.86      |
| Language      | TypeScript (strict)                  |
| Navigation    | @react-navigation/native-stack       |
| Storage       | @react-native-async-storage/async-storage |
| ID generation | uuid + react-native-get-random-values |

## Note

Your Node version (v20.11.1) is slightly below the minimum required (v20.19.4). The project still works — typecheck and Metro bundle both pass clean — but you may want to update Node for the best experience.
