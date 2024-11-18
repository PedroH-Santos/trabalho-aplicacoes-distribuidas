import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../app/WelcomeScreen/index";
import LoginScreen from "../app/LoginScreen";
import CadastroScreen from "../app/CadastroScreen";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="CadastroScreen"
      component={CadastroScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
