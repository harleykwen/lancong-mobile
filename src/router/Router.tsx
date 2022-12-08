import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Splash from '../screens/Splash/Splash'

const Stack = createNativeStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'splash'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'splash'} component={Splash} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router