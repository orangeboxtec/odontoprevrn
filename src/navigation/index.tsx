import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Home from '../screens/home';


const Tab = createBottomTabNavigator();

function screenOptions({ route }: any): BottomTabNavigationOptions {
    return {
        tabBarActiveTintColor: "#246AF7",
        headerShown: false,
        tabBarStyle: {
            height: 55,
            shadowOpacity: 0,
            elevation: 0,
        },
        tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Chat') iconName = 'comment-dots';
            if (route.name === 'Home') iconName = 'house';
            return <FontAwesome6 name={iconName} size={size} color={color} iconStyle='solid' />;
        },
    };
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name='Chat' component={Home} options={{ headerShown: false }} />
                {//<Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
