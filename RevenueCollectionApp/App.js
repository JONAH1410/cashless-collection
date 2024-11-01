import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import LoginScreen from './screens/LoginScreen';

Amplify.configure(config);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
