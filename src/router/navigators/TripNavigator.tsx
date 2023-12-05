import React from 'react'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { 
    CheckoutPackageScreen,
    CompleteDataScreen,
    DataPelancongScreen,
    FullPaymentSummary,
    ListTripScreen, 
    PackageTripDetailScreen, 
    PaymentTypeScreen, 
    SearchTripLocationScreen, 
    SearchTripScreen, 
    SpecialRequestScreen, 
    TripCheckoutComplete, 
    TripDetailScreen, 
} from '../../screens/TripStack'

const TripNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator 
            initialRouteName={ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP} 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP} 
                component={SearchTripScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP_LOCATION} 
                component={SearchTripLocationScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_LIST_STRIP} 
                component={ListTripScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_TRIP_DETAIL} 
                component={TripDetailScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_PACKAGE_DETAIL} 
                component={PackageTripDetailScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_PACKAGE_CHECKOUT} 
                component={CheckoutPackageScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_COMPLETE_DATA} 
                component={CompleteDataScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_PELANCONG_DATA} 
                component={DataPelancongScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_SPECIAL_REQUEST} 
                component={SpecialRequestScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_PAYMENT_TYPE} 
                component={PaymentTypeScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_CHECKOUT_COMPLETE} 
                component={TripCheckoutComplete} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRIP_NAVIGATOR_FULL_PAYMENT_SUMMARY} 
                component={FullPaymentSummary} 
            />
        </Stack.Navigator>
    )
}

export default TripNavigator