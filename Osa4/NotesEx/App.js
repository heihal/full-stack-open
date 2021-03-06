import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main'
import AddNoottiScreen from './AddNoottiScreen';






const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
      
        <Stack.Screen name="Main" component={Main} options={{ title: "Welcome to Notes!" }} />
        <Stack.Screen name="AddNote" component={AddNoottiScreen} options={{ title: "Save a note!" } } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App







