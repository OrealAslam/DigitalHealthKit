import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdLoading from '../screens/AdLoading';
import GraphAdLoading from '../screens/GraphAdLoading';
import LandingScreen from '../screens/LandingScreen';
import AddBloodSugar from '../screens/bloodsugar/AddBloodSugar';
import SugarResultScreen from '../screens/bloodsugar/SugarResultScreen';
import AddBloodPressure from '../screens/bloodpressure/AddBloodPressure';
import AddNewBloodPressureScreen from '../screens/bloodpressure/NewScreen/AddNewBloodPressureScreen';
import AddNewBloodSugarScreen from '../screens/bloodsugar/NewScreen/AddNewBloodSugarScreen';
import ResultPageScreen from '../screens/bloodpressure/ResultPageScreen';
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen';
import DisclaimerScreen from '../screens/DisclaimerScreen';
import FeedBackScreen from '../screens/FeedBackScreen';
import AboutUs from '../screens/AboutUs';
import BoardingHeartRate1 from '../screens/HeartRate/BoardingHeartRate1';
import BoardingHeartRate2 from '../screens/HeartRate/BoardingHeartRate2';
import BmiScreen from '../screens/bmi/BmiScreen';
import BmiResultScreen from '../screens/bmi/BmiResultScreen';
import DetailScreen from '../screens/ScreenComonents/Health/DetailScreen';
import AdTemperature from '../screens/temperature/AdTemperature';
import TemperatureResultScreen from '../screens/temperature/TemperatureResultScreen';

const Stack = createNativeStackNavigator();

export default function MainRoute(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={LandingScreen}
        options={{headerShown: false, animationenabled: true}}
      />
      <Stack.Screen
        name="AdLoading"
        component={AdLoading}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="GraphAdLoading"
        component={GraphAdLoading}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddBloodSugar"
        component={AddBloodSugar}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="SugarResultScreen"
        component={SugarResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddBloodPressure"
        component={AddBloodPressure}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddNewBloodPressureScreen"
        component={AddNewBloodPressureScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddNewBloodSugarScreen"
        component={AddNewBloodSugarScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ResultPageScreen"
        component={ResultPageScreen}
        options={{headerShown: false, animationenabled: false}}
      />

      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="DisclaimerScreen"
        component={DisclaimerScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="FeedBackScreen"
        component={FeedBackScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BoardingHeartRate1"
        component={BoardingHeartRate1}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BoardingHeartRate2"
        component={BoardingHeartRate2}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BmiScreen"
        component={BmiScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BmiResultScreen"
        component={BmiResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AdTemperature"
        component={AdTemperature}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="TemperatureResultScreen"
        component={TemperatureResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
