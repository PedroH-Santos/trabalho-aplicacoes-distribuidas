import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../app/HomeScreen';
import CadastroScreen from '../app/CadastroScreen';
import CalculateDistanceScreen from '../app/CalculateDistanceScreen';
import InsertVehicleScreen from '../app/InsertVehicleScreen';
import UpdateVehicleScreen from '../app/UpdateVehicleScreen';
import { UpdateClientScreen } from '../app/UpdateClientScreen';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    <AppStack.Screen name="CalculateDistanceScreen" component={CalculateDistanceScreen} options={{ headerShown: false }}/>
    <AppStack.Screen name="InsertVehicleScreen" component={InsertVehicleScreen} options={{ headerShown: false }}/>
    <AppStack.Screen name="UpdateVehicleScreen" component={UpdateVehicleScreen} options={{ headerShown: false }}/>
    <AppStack.Screen name="UpdateClientScreen" component={UpdateClientScreen} options={{ headerShown: false }}/>
  </AppStack.Navigator>
);

export default AppRoutes;