import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainRoute from './MainRoute';
import LanguageScreen from '../screens/LanguageScreen';
import BoardingScreen1 from '../screens/BoardingScreen1';
import DesclaimerScreen from '../screens/DesclaimerScreen';
import AdLoading from '../screens/AdLoading';
const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{headerShown: false,animationenabled: true}}
      />
      <Stack.Screen
        name="BoardingScreen1"
        component={BoardingScreen1}
        options={{headerShown: false,animationenabled: false}}
      />
      <Stack.Screen
        name="DesclaimerScreen"
        component={DesclaimerScreen}
        options={{headerShown: false,animationenabled: false}}
      />
      <Stack.Screen
        name="AdLoading"
        component={AdLoading}
        options={{headerShown: false,animationenabled: false}}
        initialParams={{screen: 'boarding'}}
      />
      <Stack.Screen
        name="MainRoute"
        component={MainRoute}
        options={{headerShown: false,animationenabled: false}}
      />
    </Stack.Navigator>
  );
}