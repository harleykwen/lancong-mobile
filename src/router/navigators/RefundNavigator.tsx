import React from 'react'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { 
    RefundScreen, 
    RefundTermsAndConditionsScreen, 
    RefundInformationScreen,
    RefundFormScreen, 
} from '../../screens/RefundStack'

const RefundNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator 
            initialRouteName={ROUTE_NAME.REFUND_NAVIGATOR_REFUND} 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.REFUND_NAVIGATOR_REFUND} 
                component={RefundScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.REFUND_NAVIGATOR_TERMS_AND_CONDITIONS} 
                component={RefundTermsAndConditionsScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.REFUND_NAVIGATOR_INFORMATION} 
                component={RefundInformationScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.REFUND_NAVIGATOR_FORM} 
                component={RefundFormScreen} 
            />
        </Stack.Navigator>
    )
}

export default RefundNavigator