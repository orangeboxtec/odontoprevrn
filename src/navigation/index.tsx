import React from 'react';
import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Chat'}>
                <Stack.Screen name='Chat' component={Home} options={{ headerShown: false }} />
                {//<Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
