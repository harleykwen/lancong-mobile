import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useQuery } from 'react-query'
import { ROUTE_NAME } from '../../../router'
import { tripTypesApi } from '../../../apis/trip'
import { format, startOfToday } from 'date-fns'
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
    Text, 
    VStack 
} from 'native-base'

interface ISearchTripScreen {
    navigation: any
}

const SearchTripScreen = (props: ISearchTripScreen) => {
    const { navigation } = props
    const today = startOfToday()

    const [isDatePickerStartVisible, setIsDatePickerStartVisible] = useState(false)

    const [type, setType] = useState('')
    const [destination, setDestination] = useState('')
    const [group, setGroup] = useState('')
    const [tripStart, setTripStart] = useState<any>(null)
    const [participant, setParticipant] = useState('')

    const tripTypes = useQuery('trip-types', tripTypesApi)

    return (
        <Flex backgroundColor='white' flex={1}>
            <Stack 
                paddingY='16px'
                paddingX='24px'
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                direction='row'
                alignItems='center'
                space='16px'
            >
                <Pressable onPress={() => navigation?.goBack()}>
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Cari Trip</Text>
            </Stack>

            <VStack padding='24px' space='10px'>
                <Select
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
                
                <Select
                    placeholder='Destinasi Lokasi'
                    selectedValue={destination}
                    onValueChange={(e: any) => setDestination(e)}
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
                                alt='IC_LOCATION_ON'
                                source={IC_LOCATION_ON}
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
                    <Select.Item label="Jakarta" value="Jakarta" />
                    <Select.Item label="Bandung" value="Bandung" />
                    <Select.Item label="Yogyakarta" value="Yogyakarta" />
                    <Select.Item label="Bali" value="Bali" />
                    <Select.Item label="Bogor" value="Bogor" />
                    <Select.Item label="Bekasi" value="Bekasi" />
                </Select>

                <Select
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
                    marginTop='14px'
                    isDisabled={!type || !destination || !group || !tripStart || !participant}
                    onPress={() => {
                        navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_LIST_STRIP, {
                            type,
                            destination,
                            group,
                            tripStart,
                            participant,
                        })
                    }}
                >
                    Cari Trip
                </Button>
            </VStack>

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