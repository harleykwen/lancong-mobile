import React from 'react'
import Login from '../../screens/Login/Login'
import Register from '../../screens/Register/Register'
import Otp from '../../screens/Otp/Otp'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const AuthNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ROUTE_NAME.AUTH_SIGN_IN} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name={ROUTE_NAME.AUTH_SIGN_IN} component={Login} />
            <Stack.Screen name={ROUTE_NAME.AUTH_SIGN_UP} component={Register} />
            <Stack.Screen name={ROUTE_NAME.AUTH_SIGN_UP_OTP} component={Otp} />
        </Stack.Navigator>
    )
}

export default AuthNavigator