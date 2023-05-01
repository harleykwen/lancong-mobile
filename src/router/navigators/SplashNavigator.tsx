import React from 'react'
import { ROUTE_NAME } from '../routeName'
import { Splash } from '../../screens/SplashStack'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const SplashNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ROUTE_NAME.SPLASH_NAVIGATOR_SPLASH} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name={ROUTE_NAME.SPLASH_NAVIGATOR_SPLASH} component={Splash}/>
        </Stack.Navigator>
    )
}

export default SplashNavigator