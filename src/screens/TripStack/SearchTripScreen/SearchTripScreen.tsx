import React, { useCallback, useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import HistorySearchTrip from './components/HistorySearchTrip'
import { useQuery } from 'react-query'
import { ROUTE_NAME } from '../../../router'
import { tripTypesApi } from '../../../apis/trip'
import { format, startOfToday } from 'date-fns'
import { 
    ASYNC_STORAGE_NAME, 
    asyncStorageDeleteitem, 
    asyncStorageGetitem, 
    asyncStorageSaveitem, 
} from '../../../asyncStorage'
import { 
    IC_ARROW_BACK, 
    IC_ARROW_DROP_DOWN, 
    IC_CALENDAR_MONTH, 
    IC_GROUP, 
    IC_HIKING, 
    IC_LOCATION_ON, 
    IC_TRANSFER_WITH_A_STATION, 
} from '../../../assets'
import { 
    Button,  
    Flex, 
    Image, 
    Input, 
    Pressable, 
    Select, 
    Stack, 
    StatusBar, 
    Text,
} from 'native-base'

interface ISearchTripScreen {
    navigation: any
    route: any
}

const SearchTripScreen = (props: ISearchTripScreen) => {
    const { navigation, route } = props
    const { place } = route.params
    const today = startOfToday()

    const [historySearchTrip, setHistorySearchTrip] = useState<any>(null)
    const [isDatePickerStartVisible, setIsDatePickerStartVisible] = useState(false)

    const [type, setType] = useState('')
    const [destination, setDestination] = useState<any>(
        place
            ?   { place_id: place?.place_id, name: place?.name }
            :   ''
    )
    const [group, setGroup] = useState('')
    const [tripStart, setTripStart] = useState<any>(null)
    const [participant, setParticipant] = useState('')

    const tripTypes = useQuery('trip-types', tripTypesApi)

    const clearHistorySearchTrip = useCallback( async () => {
        await asyncStorageDeleteitem(ASYNC_STORAGE_NAME?.HISTORY_SEARCH_TRIP)
        await saveHistorySearchTripToState()
    }, [])

    async function handleSearchTrip() {
        let tempHistorySearchTrip = await asyncStorageGetitem(ASYNC_STORAGE_NAME.HISTORY_SEARCH_TRIP)
        let currentHistorySearchTrip = {
            type,
            destination,
            group,
            tripStart,
            participant,
        }
        let newHistorySearchTrip;
        if (tempHistorySearchTrip === null) {
            newHistorySearchTrip = [currentHistorySearchTrip]
        } else {
            newHistorySearchTrip = [...tempHistorySearchTrip, currentHistorySearchTrip]
        }
        await asyncStorageSaveitem(ASYNC_STORAGE_NAME.HISTORY_SEARCH_TRIP, newHistorySearchTrip)
        await saveHistorySearchTripToState()

        navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_LIST_STRIP, {
            type,
            destination,
            group,
            tripStart,
            participant,
        })
    }

    async function saveHistorySearchTripToState() {
        let tempHistorySearchTrip = await asyncStorageGetitem(ASYNC_STORAGE_NAME.HISTORY_SEARCH_TRIP)
        if (tempHistorySearchTrip !== null) {
            tempHistorySearchTrip?.reverse()
            setHistorySearchTrip((prev: any[]) => {
                return [...tempHistorySearchTrip]
            })
        } else {
            setHistorySearchTrip([])
        }
    }

    useEffect(() => {
        saveHistorySearchTripToState()
    }, [navigation])

    return (
        <Flex backgroundColor='lancBackgroundLight' flex={1}>
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
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>Cari Trip</Text>
                </Stack>
            </Stack>

            <Stack 
                padding='16px' 
                space='16px' 
                backgroundColor='coolGray.100' 
                flex='1'
            >
                <Stack 
                    rounded='xl'
                    padding='16px' 
                    space='8px' 
                    backgroundColor='lancBackgroundLight'
                    shadow='3'
                >
                    <Select
                        size='lancSmall'
                        placeholder='Tipe Destinasi'
                        selectedValue={type}
                        onValueChange={(e: any) => setType(e)}
                        paddingLeft='74px'
                        dropdownIcon={
                            <Stack
                                direction='row'
                                width='full'
                                position='absolute'
                                top='0'
                                bottom='0'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Image
                                    alt='IC_HIKING'
                                    source={IC_HIKING}
                                    width='24px'
                                    height='24px'
                                    marginLeft='24px'
                                    tintColor='lancSurfaceLight'
                                />
                                <Image
                                    alt='IC_ARROW_DROPDOWN'
                                    source={IC_ARROW_DROP_DOWN}
                                    width='32px'
                                    height='32px'
                                    marginRight='16px'
                                    tintColor='lancSurfaceLight'
                                />
                            </Stack>
                        }
                    >
                        {tripTypes?.data?.data?.map((trip: any, index: number) => {
                            return <Select.Item key={index} label={trip?.name} value={trip?.id} fontFamily='Poppins-Medium' />
                        })}
                    </Select>

                    <Pressable 
                        onPress={() => {
                            navigation?.push(ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP_LOCATION, {
                                handleSelectPlace: setDestination
                            })
                        }}
                    >
                        <Input
                            isReadOnly
                            size='lancSmall'
                            placeholder='Destinasi Lokasi'
                            value={destination ? `${destination?.name}` : ''}
                            InputLeftElement={
                                <Image
                                    alt='IC_LOCATION_ON'
                                    source={IC_LOCATION_ON}
                                    width='24px'
                                    height='24px'
                                    marginLeft='24px'
                                    tintColor='lancSurfaceLight'
                                />
                            }
                        />
                    </Pressable>

                    <Select
                        size='lancSmall'
                        placeholder='Grup'
                        selectedValue={group}
                        onValueChange={(e: any) => setGroup(e)}
                        paddingLeft='74px'
                        dropdownIcon={
                            <Stack
                                direction='row'
                                width='full'
                                position='absolute'
                                top='0'
                                bottom='0'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Image
                                    alt='IC_TRANSFER_WITH_A_STATION'
                                    source={IC_TRANSFER_WITH_A_STATION}
                                    width='24px'
                                    height='24px'
                                    marginLeft='24px'
                                    tintColor='lancSurfaceLight'
                                />
                                <Image
                                    alt='IC_ARROW_DROPDOWN'
                                    source={IC_ARROW_DROP_DOWN}
                                    width='32px'
                                    height='32px'
                                    marginRight='16px'
                                    tintColor='lancSurfaceLight'
                                />
                            </Stack>
                        }
                    >
                        <Select.Item label="Public" value="public" />
                        <Select.Item label="Private" value="private" />
                    </Select>

                    <Pressable onPress={() => setIsDatePickerStartVisible(true)}>
                        <Input
                            isReadOnly
                            size='lancSmall'
                            placeholder='Tanggal Berangkat'
                            value={tripStart ? format(new Date(tripStart), 'dd MMMM yyyy') : ''}
                            onChangeText={(e: any) => setParticipant(e)}
                            InputLeftElement={
                                <Image
                                    alt='IC_CALENDAR_MONTH'
                                    source={IC_CALENDAR_MONTH}
                                    width='24px'
                                    height='24px'
                                    marginLeft='24px'
                                    tintColor='lancSurfaceLight'
                                />
                            }
                        />
                    </Pressable>

                    <Input
                        size='lancSmall'
                        placeholder='Jumlah Pelancong'
                        keyboardType='numeric'
                        value={participant}
                        onChangeText={(e: any) => setParticipant(e)}
                        InputLeftElement={
                            <Image
                                alt='IC_GROUP'
                                source={IC_GROUP}
                                width='24px'
                                height='24px'
                                marginLeft='24px'
                                tintColor='lancSurfaceLight'
                            />
                        }
                    />

                    <Button
                        size='lancSmall'
                        marginTop='14px'
                        // isDisabled={!type || !destination || !group || !tripStart || !participant}
                        isDisabled={!group}
                        onPress={handleSearchTrip}
                    >
                        Cari Trip
                    </Button>
                </Stack>
                <HistorySearchTrip 
                    historySearchTrip={historySearchTrip} 
                    clearHistorySearchTrip={clearHistorySearchTrip} 
                    navigation={navigation} 
                />
            </Stack>

            <DateTimePickerModal
                isVisible={isDatePickerStartVisible}
                mode="date"
                minimumDate={today}
                onCancel={() => setIsDatePickerStartVisible(false)}
                onConfirm={(e: any) => {
                    setTripStart(e)
                    setIsDatePickerStartVisible(false)
                }}
            />
        </Flex>
    )
}

export default SearchTripScreen