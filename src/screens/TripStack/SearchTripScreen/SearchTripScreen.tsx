import React, { useState } from 'react'
import * as Unicons from "react-native-unicons"
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
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
                <Select
                    dropdownIcon={<></>} 
                    height='50px'
                    backgroundColor='white'
                    paddingX='16px'
                    paddingY='8px'
                    flexDirection='row'
                    alignItems='center'
                    placeholder='Tipe Destinasi'
                    placeholderTextColor='gray.400'
                    fontFamily='Poppins-Regular'
                    fontSize='15px'
                    color='gray.600'
                    fontStyle={group ? 'normal' : 'italic'}
                    width='full'
                    selectedValue={type}
                    onValueChange={(e: any) => setType(e)}
                    InputLeftElement={<Icon as={FontAwesome5} name='place-of-worship' color='gray.400' size='lg' marginLeft='15px' />}
                >
                    {tripTypes?.data?.map((trip: any, index: number) => {
                        return <Select.Item key={index} label={trip?.name} value={trip?.id} fontFamily='Poppins-Medium' />
                    })}
                </Select>
                
                <Select
                    dropdownIcon={<></>} 
                    height='50px'
                    backgroundColor='white'
                    paddingX='16px'
                    paddingY='8px'
                    flexDirection='row'
                    alignItems='center'
                    placeholder='Destinasi Lokasi'
                    placeholderTextColor='gray.400'
                    fontFamily='Poppins-Regular'
                    fontSize='15px'
                    color='gray.600'
                    fontStyle={group ? 'normal' : 'italic'}
                    width='full'
                    selectedValue={destination}
                    onValueChange={(e: any) => setDestination(e)}
                    InputLeftElement={<Icon as={MaterialIcons} name='location-on' color='gray.400' size='lg' marginLeft='15px' />}
                >
                    <Select.Item fontFamily='Poppins-Medium' label="Jakarta" value="Jakarta" />
                    <Select.Item fontFamily='Poppins-Medium' label="Bandung" value="Bandung" />
                    <Select.Item fontFamily='Poppins-Medium' label="Yogyakarta" value="Yogyakarta" />
                    <Select.Item fontFamily='Poppins-Medium' label="Bali" value="Bali" />
                    <Select.Item fontFamily='Poppins-Medium' label="Bogor" value="Bogor" />
                    <Select.Item fontFamily='Poppins-Medium' label="Bekasi" value="Bekasi" />
                </Select>

                <Select
                    dropdownIcon={<></>} 
                    height='50px'
                    backgroundColor='white'
                    paddingX='16px'
                    paddingY='8px'
                    flexDirection='row'
                    alignItems='center'
                    placeholder='Grup'
                    placeholderTextColor='gray.400'
                    fontFamily='Poppins-Regular'
                    fontSize='15px'
                    color='gray.600'
                    fontStyle={group ? 'normal' : 'italic'}
                    width='full'
                    selectedValue={group}
                    onValueChange={(e: any) => setGroup(e)}
                    InputLeftElement={<Icon as={MaterialIcons} name='public' color='gray.400' size='lg' marginLeft='15px' />}
                >
                    <Select.Item fontFamily='Poppins-Medium' label="Public" value="public" />
                    <Select.Item fontFamily='Poppins-Medium' label="Private" value="private" />
                </Select>

                <Pressable
                    height='50px'
                    backgroundColor='white'
                    paddingX='16px'
                    paddingY='8px'
                    flexDirection='row'
                    alignItems='center'
                    borderWidth='1px'
                    borderRadius='4px'
                    borderColor='gray.300'
                    onPress={() => setIsDatePickerStartVisible(true)}
                >
                    <Icon as={MaterialIcons} name='calendar-today' color='gray.400' size='lg' />
                    <Text
                        fontFamily='Poppins-Regular' 
                        fontSize='15px'
                        color={tripStart ? 'gray.600' : 'gray.400'}
                        fontStyle={tripStart ? 'normal' : 'italic'}
                        marginLeft='15px'
                    >{tripStart ? format(new Date(tripStart), 'dd MMMM yyyy') : 'Tanggal Berangkat'}</Text>
                </Pressable>

                <Input 
                    height='50px'
                    backgroundColor='white'
                    paddingX='16px'
                    paddingY='8px'
                    flexDirection='row'
                    alignItems='center'
                    placeholder='Jumlah Pelancong'
                    placeholderTextColor='gray.400'
                    fontFamily='Poppins-Regular'
                    fontSize='15px'
                    color='gray.600'
                    keyboardType='numeric'
                    fontStyle={participant ? 'normal' : 'italic'}
                    value={participant}
                    onChangeText={(e: any) => setParticipant(e)}
                    InputLeftElement={<Icon as={MaterialIcons} name='groups' color='gray.400' size='lg' marginLeft='15px' />}
                />

                <Button 
                    height='50px'
                    borderRadius='8px'
                    backgroundColor='xprimary.50'
                    marginTop='10px'
                    _pressed={{
                        backgroundColor: 'xprimary.40'
                    }}
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
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                        color='white'
                    >Cari Trip</Text>
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