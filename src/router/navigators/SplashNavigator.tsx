import React from 'react'
import Splash from '../../screens/Splash/Splash'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const SplashNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ROUTE_NAME.SPLASH} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name={ROUTE_NAME.SPLASH} component={Splash}/>
        </Stack.Navigator>
    )
}

export default SplashNavigator