/**
 * Navigation Stack Configuration
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import {
  SplashScreen,
  HomeScreen,
  ListDetailsScreen,
  CreateTaskScreen,
  EditTaskScreen,
} from '../screens';
import { COLORS } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.dark,
  },
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="Splash"
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animation: 'default',
          }}
        />
        <Stack.Screen
          name="ListDetails"
          component={ListDetailsScreen}
          options={{
            animation: 'default',
          }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTaskScreen}
          options={{
            animation: 'default',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTaskScreen}
          options={{
            animation: 'default',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
