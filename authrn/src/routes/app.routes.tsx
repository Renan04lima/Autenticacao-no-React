import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import NewItem from '../pages/NewItem';
import EditItem from '../pages/EditItem';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator screenOptions={{headerShown: false}}>
    <AppStack.Screen name="Dashboard" component={Dashboard} />
    <AppStack.Screen name="NewItem" component={NewItem} />
    <AppStack.Screen name="EditItem" component={EditItem} />
  </AppStack.Navigator>
);

export default AppRoutes;
