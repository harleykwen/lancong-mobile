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



import ListTripType from '../screens/ListTripType/ListTripType'
import TripTypeDetail from '../screens/TripTypeDetail/TripTypeDetail'
import CompleteData from '../screens/CompleteData/CompleteData'
import Payment from '../screens/Payment/Payment'
import PaymentMethod from '../screens/PaymentMethod/PaymentMethod'
import Otp from '../screens/Otp/Otp'
import { SearchHotelScreen } from '../screens/HotelStack'
import { 
    CheckoutPackageScreen,
    CompleteDataScreen,
    DataPelancongScreen,
    ListTripScreen, 
    PackageTripDetailScreen, 
    PaymentMethodScreen, 
    PaymentTypeScreen, 
    SearchTripScreen, 
    SpecialRequestScreen, 
    TripDetailScreen, 
} from '../screens/TripStack'
import { AddPelancongScreen, PelancongDataScreen, ProfileScreen } from '../screens/ProfileStack'
import { TransactionDetailScreen, TransactionListScreen } from '../screens/TransactionStack'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TripStack() {
    return (
        <Stack.Navigator initialRouteName={'main-app'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'main-app'} component={Home} />
            <Stack.Screen name={'list-trip-type'} component={ListTripType} />
            <Stack.Screen name={'trip-type-detail'} component={TripTypeDetail} />
            {/* <Stack.Screen name={'complete-data'} component={CompleteData} /> */}
            <Stack.Screen name={'payment'} component={Payment} />
            {/* <Stack.Screen name={'payment-method'} component={PaymentMethod} /> */}

            {/* TRIP STACK */}
            <Stack.Screen name={'search-trip'} component={SearchTripScreen} />
            <Stack.Screen name={'list-trip'} component={ListTripScreen} />
            <Stack.Screen name={'detail-trip'} component={TripDetailScreen} />
            <Stack.Screen name={'trip-package-detail'} component={PackageTripDetailScreen} />
            <Stack.Screen name={'trip-package-checkout'} component={CheckoutPackageScreen} />
            <Stack.Screen name={'complete-data'} component={CompleteDataScreen} />
            <Stack.Screen name={'special-request'} component={SpecialRequestScreen} />
            <Stack.Screen name={'data-pelancong'} component={DataPelancongScreen} />
            <Stack.Screen name={'payment-type'} component={PaymentTypeScreen} />
            <Stack.Screen name={'payment-method'} component={PaymentMethodScreen} />

            {/* HOTEL STACK */}
            <Stack.Screen name='search-hotel' component={SearchHotelScreen} />
        </Stack.Navigator>
    )
}

function TransactionStack() {
    return (
        <Stack.Navigator initialRouteName={'transaction-list'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'transaction-list'} component={TransactionListScreen} />
            <Stack.Screen name={'transaction-detail'} component={TransactionDetailScreen} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName={'profile'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'profile'} component={ProfileScreen} />
            <Stack.Screen name={'data-pelancong'} component={PelancongDataScreen} />
            <Stack.Screen name={'add-data-pelancong'} component={AddPelancongScreen} />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#038103'}}>
            <Tab.Screen name={'Beranda'} component={TripStack} options={{ headerShown: false, tabBarIcon: Icon.Home }} />
            <Tab.Screen name={'Transaksi'} component={TransactionStack} options={{ headerShown: false, tabBarIcon: Icon.History }} />
            <Tab.Screen name={'Pesan'} component={Chat} options={{ tabBarIcon: Icon.Chat }} />
            <Tab.Screen name={'Akun'} component={ProfileStack} options={{ headerShown: false, tabBarIcon: Icon.UserCircle }} />
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