import React, { useState } from 'react'
import * as Unicons from "react-native-unicons"
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useQuery } from 'react-query'
import { getTripTypesApi } from '../../../apis/trip'
import { format, startOfToday } from 'date-fns'
import { 
    Button, 
    Center, 
    Flex, 
    HStack, 
    Icon, 
    Input, 
    Pressable, 
    Select, 
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

    const tripTypes = useQuery('trip-types', getTripTypesApi)

    return (
        <Flex backgroundColor='white' flex={1}>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontFamily='Poppins-SemiBold'>Trip</Text>
                <Pressable position='absolute' left='10px' onPress={() => navigation.goBack()}>
                    <Icon as={Unicons.ArrowLeft} color='white' />
                </Pressable>
            </Center>

            <VStack padding='20px' space='10px'>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.EllipsisV} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px' fontFamily='Poppins-SemiBold'>Tipe Destinasi</Text>
                        <Select 
                            dropdownIcon={<></>} 
                            height='30px' 
                            width='100%' 
                            variant='underlined'
                            selectedValue={type}
                            onValueChange={(e: any) => setType(e)}
                        >
                            {tripTypes?.data?.map((trip: any, index: number) => {
                                return <Select.Item key={index} label={trip?.name} value={trip?.id} fontFamily='Poppins-Medium' />
                            })}
                        </Select>
                    </VStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.LocationPinAlt} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px' fontFamily='Poppins-SemiBold'>Destinasi Lokasi</Text>
                        <Select 
                            dropdownIcon={<></>} 
                            height='30px' 
                            width='100%' 
                            variant='underlined'
                            selectedValue={destination}
                            onValueChange={(e: any) => setDestination(e)}
                        >
                            <Select.Item fontFamily='Poppins-Medium' label="Jakarta" value="Jakarta" />
                            <Select.Item fontFamily='Poppins-Medium' label="Bandung" value="Bandung" />
                            <Select.Item fontFamily='Poppins-Medium' label="Yogyakarta" value="Yogyakarta" />
                            <Select.Item fontFamily='Poppins-Medium' label="Bali" value="Bali" />
                            <Select.Item fontFamily='Poppins-Medium' label="Bogor" value="Bogor" />
                            <Select.Item fontFamily='Poppins-Medium' label="Bekasi" value="Bekasi" />
                        </Select>
                    </VStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.SocialDistancing} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px' fontFamily='Poppins-SemiBold'>Grup</Text>
                        <Select 
                            dropdownIcon={<></>} 
                            height='30px' 
                            width='100%' 
                            variant='underlined'
                            selectedValue={group}
                            onValueChange={(e: any) => setGroup(e)}
                        >
                            <Select.Item fontFamily='Poppins-Medium' label="Public" value="public" />
                            <Select.Item fontFamily='Poppins-Medium' label="Private" value="private" />
                        </Select>
                    </VStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <HStack flex={1} alignItems='center' space='10px'>
                        <Pressable onPress={() => setIsDatePickerStartVisible(true)}>
                            <Icon as={Unicons.CalendarAlt} color='gray.500' />
                        </Pressable>
                        <VStack flex={1}>
                            <Text color='gray.500' fontSize='10px' fontFamily='Poppins-SemiBold'>Mulai Trip</Text>
                            <Input 
                                keyboardType='numeric' 
                                height='30px' 
                                variant='underlined' 
                                value={tripStart && format(tripStart, 'd MMMM yyyy')}
                                isReadOnly
                            />
                        </VStack>
                    </HStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.UsersAlt} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px' fontFamily='Poppins-SemiBold'>Anggota</Text>
                        <Input 
                            keyboardType='numeric' 
                            height='30px' 
                            width='100%' 
                            variant='underlined' 
                            value={participant}
                            onChangeText={(e: any) => setParticipant(e)}
                        />
                    </VStack>
                </HStack>
                <Button 
                    marginTop='20px' 
                    colorScheme='success'
                    fontFamily='Poppins-SemiBold'
                    onPress={() => {
                        navigation.push('list-trip', {
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
                onConfirm={(e: any) => {
                    setTripStart(e)
                    setIsDatePickerStartVisible(false)
                }}
                onCancel={() => setIsDatePickerStartVisible(false)}
                // minimumDate={today}
            />
        </Flex>
    )
}

export default SearchTripScreen