import React from 'react'
import MainNavigatorTabItem from './MainNavigatorTabItem'
import { ROUTE_NAME } from '../routeName'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import { 
    IC_CHAT, 
    IC_HOME, 
    IC_RECEIPT_LOG, 
    IC_USER, 
} from '../../assets'
import MainHomeNavigator from './MainHomeNavigator'
import Chat from '../../screens/Chat/Chat'
import { ProfileScreen } from '../../screens/ProfileStack'
import { TransactionListScreen } from '../../screens/TransactionStack'

const MainNavigator: React.FC = () => {
    const Tab = createBottomTabNavigator()
    const { t } = useTranslation()

    return (
        <Tab.Navigator 
            initialRouteName={ROUTE_NAME.MAIN_HOME_NAVIGATOR} 
            screenOptions={{ headerShown: false }}
            tabBar={(props: any) => <MainNavigatorTabItem {...props} />}
        >
            <Tab.Screen 
                name={ROUTE_NAME.MAIN_HOME_NAVIGATOR} 
                component={MainHomeNavigator} 
                options={{ tabBarLabel: `${t('common:bottom_tabs_home')}`, tabBarIcon: IC_HOME }}
            />
            <Tab.Screen 
                name={ROUTE_NAME.MAIN_TRANSACTION} 
                component={TransactionListScreen} 
                options={{ tabBarLabel: `${t('common:bottom_tabs_transaction')}`, tabBarIcon: IC_RECEIPT_LOG }}
            />
            <Tab.Screen 
                name={ROUTE_NAME.MAIN_CHAT} 
                component={Chat} 
                options={{ tabBarLabel: `${t('common:bottom_tabs_chat')}`, tabBarIcon: IC_CHAT }}
            />
            <Tab.Screen 
                name={ROUTE_NAME.MAIN_PROFILE} 
                component={ProfileScreen} 
                options={{ tabBarLabel: `${t('common:bottom_tabs_account')}`, tabBarIcon: IC_USER }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigator