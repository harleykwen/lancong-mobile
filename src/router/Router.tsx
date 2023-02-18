import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Icon from "react-native-unicons"

// screens
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'
import Splash from '../screens/Splash/Splash'
import Home from '../screens/Home/Home'
import Booking from '../screens/Booking/Booking'
import History from '../screens/History/History'
import Chat from '../screens/Chat/Chat'
import Profile from '../screens/Profile/Profile'
import SearchTrip from '../screens/SearchTrip/SearchTrip'
import ListTrip from '../screens/ListTrip/ListTrip'
import TripDetail from '../screens/TripDetail/TripDetail'
import ListTripType from '../screens/ListTripType/ListTripType'
import TripTypeDetail from '../screens/TripTypeDetail/TripTypeDetail'
import CompleteData from '../screens/CompleteData/CompleteData'
import Payment from '../screens/Payment/Payment'
import PaymentMethod from '../screens/PaymentMethod/PaymentMethod'
import Otp from '../screens/Otp/Otp'
import { SearchHotelScreen } from '../screens/HotelStack'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TripStack() {
    return (
        <Stack.Navigator initialRouteName={'main-app'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'main-app'} component={Home} />
            <Stack.Screen name={'search-trip'} component={SearchTrip} />
            <Stack.Screen name={'list-trip'} component={ListTrip} />
            <Stack.Screen name={'detail-trip'} component={TripDetail} />
            <Stack.Screen name={'list-trip-type'} component={ListTripType} />
            <Stack.Screen name={'trip-type-detail'} component={TripTypeDetail} />
            <Stack.Screen name={'complete-data'} component={CompleteData} />
            <Stack.Screen name={'payment'} component={Payment} />
            <Stack.Screen name={'payment-method'} component={PaymentMethod} />

            {/* HOTEL STACK */}
            <Stack.Screen name='search-hotel' component={SearchHotelScreen} />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#038103'}}>
            <Tab.Screen name={'Home'} component={TripStack} options={{ headerShown: false, tabBarIcon: Icon.Home }} />
            <Tab.Screen name={'Booking'} component={Booking} options={{ tabBarIcon: Icon.Book }} />
            <Tab.Screen name={'History'} component={History} options={{ tabBarIcon: Icon.History }} />
            <Tab.Screen name={'Chat'} component={Chat} options={{ tabBarIcon: Icon.Chat }} />
            <Tab.Screen name={'Profile'} component={Profile} options={{ headerShown: false, tabBarIcon: Icon.UserCircle }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'splash'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'splash'} component={Splash} />
                <Stack.Screen name={'login'} component={Login} />
                <Stack.Screen name={'register'} component={Register} />
                <Stack.Screen name={'otp'} component={Otp} />
                <Stack.Screen name={'main'} component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router