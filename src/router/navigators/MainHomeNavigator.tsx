import React from 'react'
import Home from '../../screens/Home/Home'
import { ROUTE_NAME } from '../routeName'
import { SearchTripScreen } from '../../screens/TripStack'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

const MainHomeNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ROUTE_NAME.MAIN_HOME} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name={ROUTE_NAME.MAIN_HOME} component={Home}/>
            <Stack.Screen name={ROUTE_NAME.MAIN_HOME_TRIP_SEARCH} component={SearchTripScreen}/>
        </Stack.Navigator>
    )
}

export default MainHomeNavigator