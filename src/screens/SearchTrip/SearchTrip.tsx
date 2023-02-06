import React, { useState } from 'react'
import * as Unicons from "react-native-unicons"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Center, Flex, HStack, Icon, Input, Pressable, Select, Text, VStack } from 'native-base'
import { add, format, startOfToday } from 'date-fns'

interface ISearchTrip {
    navigation: any
}

const SearchTrip = (props: ISearchTrip) => {
    const today = startOfToday()
    const { navigation } = props

    const [isDatePickerStartVisible, setIsDatePickerStartVisible] = useState(false)
    const [isDatePickerEndVisible, setIsDatePickerEndVisible] = useState(false)

    const [type, setType] = useState('')
    const [destination, setDestination] = useState('')
    const [dateStart, setDateStart] = useState<any>(null)
    const [dateEnd, setDateEnd] = useState<any>(null)
    const [participant, setParticipant] = useState('')

    return (
        <Flex backgroundColor='white' flex={1}>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontWeight='semibold'>Trip</Text>
                <Pressable position='absolute' left='10px' onPress={() => navigation.goBack()}>
                    <Icon as={Unicons.ArrowLeft} color='white' />
                </Pressable>
            </Center>
            <VStack padding='20px' space='10px'>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.EllipsisV} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px'>Type</Text>
                        <Select 
                            dropdownIcon={<></>} 
                            height='30px' 
                            width='100%' 
                            variant='underlined'
                            selectedValue={type}
                            onValueChange={(e: any) => setType(e)}
                        >
                            <Select.Item label="Hiking" value="Hiking" />
                            <Select.Item label="Diving" value="Diving" />
                            <Select.Item label="City Tour" value="City Tour" />
                        </Select>
                    </VStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.LocationPinAlt} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px'>Location</Text>
                        <Select 
                            dropdownIcon={<></>} 
                            height='30px' 
                            width='100%' 
                            variant='underlined'
                            selectedValue={destination}
                            onValueChange={(e: any) => setDestination(e)}
                        >
                            <Select.Item label="Jakarta" value="Jakarta" />
                            <Select.Item label="Bandung" value="Bandung" />
                            <Select.Item label="Yogyakarta" value="Yogyakarta" />
                            <Select.Item label="Bali" value="Bali" />
                            <Select.Item label="Bogor" value="Bogor" />
                        </Select>
                    </VStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <HStack flex={1} alignItems='center' space='10px'>
                        <Pressable onPress={() => setIsDatePickerStartVisible(true)}>
                            <Icon as={Unicons.CalendarAlt} color='gray.500' />
                        </Pressable>
                        <VStack flex={1}>
                            <Text color='gray.500' fontSize='10px'>Search Date (Start)</Text>
                            <Input 
                                keyboardType='numeric' 
                                height='30px' 
                                variant='underlined' 
                                value={dateStart && format(dateStart, 'd MMMM yyyy')}
                                isReadOnly
                            />
                        </VStack>
                    </HStack>
                    <HStack flex={1} alignItems='center' space='10px'>
                        <Pressable onPress={() => dateStart && setIsDatePickerEndVisible(true)}>
                            <Icon as={Unicons.CalendarAlt} color='gray.500' />
                        </Pressable>
                        <VStack flex={1}>
                            <Text color='gray.500' fontSize='10px'>Search Date (End)</Text>
                            <Input 
                                keyboardType='numeric' 
                                height='30px' 
                                variant='underlined'
                                value={dateEnd && format(dateEnd, 'd MMMM yyyy')}
                                isReadOnly
                            />
                        </VStack>
                    </HStack>
                </HStack>
                <HStack alignItems='center' space='10px'>
                    <Icon as={Unicons.UsersAlt} color='gray.500' />
                    <VStack flex={1}>
                        <Text color='gray.500' fontSize='10px'>Participant (estimate)</Text>
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
                    onPress={() => {
                        console.log({
                            type, destination, dateStart, dateEnd, participant
                        })
                        navigation.push('list-trip', { type, destination, dateStart, dateEnd, participant })
                    }}
                >
                    Search
                </Button>
            </VStack>

            <DateTimePickerModal
                isVisible={isDatePickerStartVisible}
                mode="date"
                onConfirm={(e: any) => {
                    setDateStart(e)
                    setDateEnd(null)
                    setIsDatePickerStartVisible(false)
                }}
                onCancel={() => setIsDatePickerStartVisible(false)}
                // minimumDate={today}
            />

            <DateTimePickerModal
                isVisible={isDatePickerEndVisible}
                mode="date"
                onConfirm={(e: any) => {
                    setDateEnd(e)
                    setIsDatePickerEndVisible(false)
                }}
                onCancel={() => setIsDatePickerEndVisible(false)}
                // minimumDate={add(dateStart, { days: 1 })}
            />
        </Flex>
    )
}

export default SearchTrip