import React from 'react'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { 
    AddPelancongScreen, 
    PelancongDataScreen, 
    PelancongDetailScreen, 
    ProfileScreen, 
} from '../../screens/ProfileStack'

const ProfileNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator 
            initialRouteName={ROUTE_NAME.PROFILE_NAVIGATOR_MY_PROFILE} 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.PROFILE_NAVIGATOR_MY_PROFILE} 
                component={ProfileScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.PROFILE_NAVIGATOR_PELANCONG_DATA} 
                component={PelancongDataScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.PROFILE_NAVIGATOR_ADD_PELANCONG_DATA} 
                component={AddPelancongScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.PROFILE_NAVIGATOR_DETAIL_PELANCONG_DATA} 
                component={PelancongDetailScreen} 
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator