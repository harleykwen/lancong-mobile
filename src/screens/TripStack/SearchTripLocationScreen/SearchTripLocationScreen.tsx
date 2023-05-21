import React, { useEffect, useState } from 'react'
import ListPlacesAutoComplete from './components/ListPlacesAutoComplete'
import { useQuery } from 'react-query'
import { placeAutoCompleteApi } from '../../../apis/master'
import { IC_ARROW_BACK, IC_TRAVEL_EXPLORE } from '../../../assets'
import { 
    Flex, 
    Image, 
    Input, 
    Pressable, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'

interface ISearchTripLocationScreen {
    navigation?: any
    route?: any
}

const SearchTripLocationScreen: React.FC<ISearchTripLocationScreen> = (props: ISearchTripLocationScreen) => {
    const { navigation, route } = props
    const { handleSelectPlace } = route?.params

    const [search, setSearch] = useState<string>('')

    const placesAutoComplete = useQuery(`places-auto-complete-${search}`, () => placeAutoCompleteApi({ search }), {
        enabled: false,
    })

    function handleSearch(e: any) {
        setSearch(e)
    }

    useEffect(() => {
        if (!search) return
        const timeoutId = setTimeout(() => {
            placesAutoComplete?.refetch()
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search])

    return (
        <Flex flex='1' backgroundColor='white'>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack
                direction='row'
                paddingX='16px'
                paddingY='8px'
                shadow='3'
                backgroundColor='white'
                space='8px'
                alignItems='center'
            >
                <Pressable
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Stack>
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>Cari Lokasi Destinasi</Text>
                </Stack>
            </Stack>

            <Stack padding='16px' flex='1' space='16px'>
                <Input 
                    size='lancSmall' 
                    placeholder='Cari lokasi destinasi ...' 
                    value={search}
                    onChangeText={handleSearch}
                    InputLeftElement={
                        <Image
                            alt='IC_TRAVEL_EXPLORE'
                            source={IC_TRAVEL_EXPLORE}
                            width='24px'
                            height='24px'
                            marginLeft='24px'
                            tintColor='lancSurfaceLight'
                        />
                    }
                />
                <ListPlacesAutoComplete 
                    data={placesAutoComplete?.data?.data} 
                    isLoading={placesAutoComplete?.isFetching} 
                    handleSelectPlace={(data: any) => {
                        handleSelectPlace(data)
                        navigation?.goBack()
                    }}
                />
            </Stack>
        </Flex>
    )
}

export default SearchTripLocationScreen