import React from 'react'
import { ROUTE_NAME } from '../routeName'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { 
    TransactionDetailScreen, 
    TransactionListDraftScreen, 
    TransactionListScreen, 
} from '../../screens/TransactionStack'

const TransactionNavigator: React.FC = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator 
            initialRouteName={ROUTE_NAME.TRANSACTION_NAVIGATOR_LIST} 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRANSACTION_NAVIGATOR_LIST} 
                component={TransactionListScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRANSACTION_NAVIGATOR_LIST_DRAFT} 
                component={TransactionListDraftScreen} 
            />
            <Stack.Screen 
                options={{ ...TransitionPresets.SlideFromRightIOS }} 
                name={ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL} 
                component={TransactionDetailScreen} 
            />
        </Stack.Navigator>
    )
}

export default TransactionNavigator