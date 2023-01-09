import React, { useState } from 'react'
import * as Unicons from 'react-native-unicons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button, Center, Flex, HStack, Icon, Image, Input, Pressable, Text, VStack } from 'native-base'
import { format, startOfToday } from 'date-fns'

interface ITripTypeDetail {
    navigation: any
}

const TripTypeDetail = (props: ITripTypeDetail) => {
    const { navigation } = props

    const [selectedDate, setSelectedDate] = useState(null)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

    return (
        <Flex flex='1' backgroundColor='white'>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontWeight='semibold'>Berjuang Bersama Semeru</Text>
                <Text fontSize='16px' color='white' fontWeight='semibold'>3D2N</Text>
                <Pressable position='absolute' left='10px'>
                    <Icon as={Unicons.ArrowLeft} color='white' />
                </Pressable>
            </Center>

            <VStack padding='10px' space='10px'>
                <VStack space='10px' padding='10px' shadow='1' rounded='md' backgroundColor='white'>
                    <VStack>
                        <Text fontSize='14px' fontWeight='semibold'>Selected Date</Text>
                    </VStack>
                    <HStack justifyContent='space-between'>
                        <Text>{selectedDate ? format(selectedDate, 'iiii, dd MMMM yyyy') : '-'}</Text>
                        <Pressable onPress={() => setIsDatePickerVisible(true)}>
                            <Icon as={Unicons.CalendarAlt} />
                        </Pressable>
                    </HStack>
                </VStack>

                <VStack padding='10px' borderWidth='1px' borderColor='gray.300' rounded='md' space='10px' backgroundColor='white'>
                    <HStack space='10px' alignItems='center'>
                        <Image
                            rounded='lg'
                            source={{ uri: 'https://static.republika.co.id/uploads/member/images/news/qrqv2fsv0p.jpg' }}
                            alt='https://static.republika.co.id/uploads/member/images/news/qrqv2fsv0p.jpg'
                            height='100px'
                            width='100px'
                        />
                        <VStack flex='1'>
                            <Text fontSize='16px' fontWeight='semibold' flexWrap='wrap'>
                                Berjuang Bersama Semeru 2 Pax
                            </Text>
                            <HStack alignItems='center'>
                                <Text fontSize='16px' color='green.600' fontWeight='semibold'>Detail</Text>
                                <Icon as={Unicons.AngleRight} color='green.600' />
                            </HStack>
                            <Text fontSize='16px' fontWeight='semibold'>
                                3D2N
                            </Text>
                        </VStack>
                    </HStack>
                    <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                    <VStack>
                        <Text fontSize='14px'>
                            Information
                        </Text>
                        <HStack space='5px'>
                            <Icon as={Unicons.Phone} />
                            <Text fontSize='12px'>
                                Make a reservation at least 1 day(s) ahead
                            </Text>
                        </HStack>
                        <HStack space='5px'>
                            <Icon as={Unicons.BringFront} />
                            <Text fontSize='12px'>
                                Free Refund
                            </Text>
                        </HStack>
                    </VStack>
                    <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                    <VStack padding='5px'>
                        <Text fontSize='14px'>Facilities</Text>
                        <HStack marginTop='5px' margin='auto' space='5px'>
                            <VStack alignItems='center'>
                                <Icon as={Unicons.HouseUser} color='blue.400' />
                                <Text fontSize='11px' color='blue.400'>Tent</Text>
                            </VStack>
                            <VStack alignItems='center'>
                                <Icon as={Unicons.Utensils} color='yellow.400' />
                                <Text fontSize='11px' color='yellow.400'>Lunch</Text>
                            </VStack>
                            <VStack alignItems='center'>
                                <Icon as={Unicons.ParkingCircle} color='info.400' />
                                <Text fontSize='11px' color='info.400'>Parking Area</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                    <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                    <VStack>
                        <Text fontSize='12px'>Meeting Point</Text>
                        <HStack alignItems='center' space='5px'>
                            <Icon as={Unicons.MapMarker} />
                            <Text fontSize='11px'>07:00 Berkumpul di meeting point</Text>
                        </HStack>
                    </VStack>
                    <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                    <VStack>
                        <Text fontSize='12px'>Pax</Text>
                        <HStack alignItems='center' justifyContent='space-between'>
                            <Text fontSize='14px' fontWeight='semibold' color='green.500'>Rp. {(520000).toLocaleString()}</Text>
                            <HStack space='3px'>
                                <Button 
                                    variant='outline' 
                                    height='30px' 
                                    width='30px' 
                                    padding='0px' 
                                    justifyContent='center' 
                                    alignItems='center'
                                    colorScheme='dark'
                                >-</Button>
                                <Center borderWidth='1px' height='30px' width='30px' rounded='sm' borderColor='gray.300'>
                                    <Text color='gray.400'>2</Text>
                                </Center>
                                <Button 
                                    variant='outline' 
                                    height='30px' 
                                    width='30px' 
                                    padding='0px' 
                                    justifyContent='center' 
                                    alignItems='center'
                                    colorScheme='dark'
                                >+</Button>
                            </HStack>
                        </HStack>
                    </VStack>
                </VStack>

            </VStack>

            <Flex 
                position='absolute' 
                bottom='0' 
                backgroundColor='white' 
                width='100%' 
                flexDirection='row' 
                justifyContent='space-between' 
                padding='10px'
                shadow='9'
            >
                <VStack>
                    <Text fontSize='12px'>Total Price</Text>
                    <Text fontSize='16px' color='green.500' fontWeight='semibold'>Rp. {(1040000).toLocaleString()}</Text>
                    <Text fontSize='10px'>Inclusive of taces and fees</Text>
                </VStack>
                <Button colorScheme='green' onPress={() => navigation.push('complete-data')}>
                    Continue
                </Button>
            </Flex>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(e: any) => {
                    setSelectedDate(e)
                    setIsDatePickerVisible(false)
                }}
                onCancel={() => setIsDatePickerVisible(false)}
                minimumDate={startOfToday()}
            />
        </Flex>
    )
}

export default TripTypeDetail