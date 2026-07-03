import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitProvider } from './src/context/HabitContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddHabitScreen } from './src/screens/AddHabitScreen';
import { HabitDetailScreen } from './src/screens/HabitDetailScreen';
import { RootStackParamList } from './src/types';
import { Colors } from './src/components/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom dark theme matching our app palette
const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    primary: Colors.accent,
    border: Colors.surfaceLight,
    notification: Colors.accent,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <NavigationContainer theme={AppTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="AddHabit"
              component={AddHabitScreen}
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </HabitProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
