import React from 'react'
import TripSuggestion from './components/TripSuggestion'
import Categories from './components/Categories'
import ActivePayment from './components/ActivePayment'
import { RefreshControl } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { activePaymentApi, tripSuggestionApi } from '../../apis/home'
import { 
    Flex, 
    ScrollView, 
    Text, 
} from 'native-base'

interface IHome {
    navigation: any
}

const Home = (props: IHome) => {
    const { navigation } = props

    const tripSuggestion = useQuery('trip-suggestion', tripSuggestionApi)
    const activePayment = useQuery('active-payment', activePaymentApi)

    return (
        <Flex backgroundColor='#f7f7f7' flex={1}>
            <Flex 
                direction='row' 
                paddingX='24px'
                paddingY='16px' 
                alignItems='center' 
                justifyContent='center'
                borderBottomWidth='1px'
                borderBottomColor='#e5e5e5'
                backgroundColor='#ffffff'
            >
                <Text 
                    fontSize='14px' 
                    color='#101010' 
                    fontFamily='Poppins-SemiBold'
                >Beranda</Text>
            </Flex>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={tripSuggestion?.isFetching || activePayment?.isFetching} 
                        onRefresh={() => {
                            tripSuggestion?.refetch()
                            activePayment?.refetch()
                        }} 
                    />
                }
            >
                <Categories navigation={navigation} />
                <ActivePayment navigation={navigation} activePayment={activePayment} />
                <TripSuggestion navigation={navigation} tripSuggestion={tripSuggestion} />
            </ScrollView>
        </Flex>
    )
}

export default Home