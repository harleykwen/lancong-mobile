import React from 'react'
import AuthNavigator from './navigators/AuthNavigator'
import MainNavigator from './navigators/MainNavigator' 
import SplashNavigator from './navigators/SplashNavigator'
import TripNavigator from './navigators/TripNavigator'
import ProfileNavigator from './navigators/ProfileNavigator'
import TransactionNavigator from './navigators/TransactionNavigator'
import RefundNavigator from './navigators/RefundNavigator'
import { ROUTE_NAME } from './routeName'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Router: React.FC = () => {
    
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen 
                        options={{ ...TransitionPresets.SlideFromRightIOS }} 
                        name={ROUTE_NAME.SPLASH_NAVIGATOR} 
                        component={SplashNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.SlideFromRightIOS }} 
                        name={ROUTE_NAME.AUTH_NAVIGATOR} 
                        component={AuthNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.SlideFromRightIOS }} 
                        name={ROUTE_NAME.MAIN_NAVIGATOR} 
                        component={MainNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} 
                        name={ROUTE_NAME.TRIP_NAVIGATOR} 
                        component={TripNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} 
                        name={ROUTE_NAME.PROFILE_NAVIGATOR} 
                        component={ProfileNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} 
                        name={ROUTE_NAME.TRANSACTION_NAVIGATOR} 
                        component={TransactionNavigator} 
                    />
                    <Stack.Screen 
                        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} 
                        name={ROUTE_NAME.REFUND_NAVIGATOR} 
                        component={RefundNavigator} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Router