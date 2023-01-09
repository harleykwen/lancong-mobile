import React, { useState } from 'react'
import * as Unicons from 'react-native-unicons'
import { Button, Center, Flex, HStack, Icon, Image, Input, Pressable, Select, Text, VStack } from 'native-base'
import { Dimensions, Modal, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface ICompleteDate {
    navigation: any
}

const CompleteData = (props: ICompleteDate) => {
    const { navigation } = props

    const [modalVisitor, setModalVisitor] = useState(false)
    const [modalSpecialRequest, setModalSpecialRequest] = useState(false)
    const [modalChooseHotel, setModalChooseHotel] = useState(false)

    const [isCheckInDatePickerShow, setIsCheckInDatePickerShow] = useState(false)
    const [isCheckOutDatePickerShow, setIsCheckOutDatePickerShow] = useState(false)

    return (
        <Flex flex='1' backgroundColor='white'>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontWeight='semibold'>Complete Data</Text>
                <Text fontSize='12px' color='white'>1. Order Data - 2. Payment</Text>
                <Pressable position='absolute' left='10px'>
                    <Icon as={Unicons.ArrowLeft} color='white' />
                </Pressable>
            </Center>

            <VStack padding='10px' space='10px'>
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
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.User} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                2 Pax
                            </Text>
                        </HStack>
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.Moon} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                3 Days
                            </Text>
                        </HStack>
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.CalendarAlt} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                Wednesday, 24 November 2021
                            </Text>
                        </HStack>
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.CalendarAlt} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                Thursday, 25 November 2021
                            </Text>
                        </HStack>
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.Schedule} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                Reschedule Not Available
                            </Text>
                        </HStack>
                        <HStack alignItems='center' space='5px' marginTop='10px'>
                            <Icon as={Unicons.BringFront} color='gray.400' />
                            <Text fontSize='12px' flexWrap='wrap' color='gray.400'>
                                Free Refund
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
                <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                <VStack space='5px'>
                    <Text fontSize='14px' fontWeight='semibold'>
                        Order Data
                    </Text>
                    <HStack alignItems='center' space='10px'>
                        <Icon as={Unicons.User} color='gray.400' />
                        <VStack>
                            <Text fontWeight='semibold' fontSize='14px'>King</Text>
                            <Text color='gray.400' fontSize='12px'>king666@gmail.com</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                <VStack space='5px'>
                    <Text fontSize='14px' fontWeight='semibold'>
                        Visitor Details<Text color='red.400'>*</Text>
                    </Text>
                    <Pressable 
                        onPress={() => setModalVisitor(true)}
                    >
                        <HStack alignItems='center' space='10px' padding='5px' borderWidth='1px' borderColor='gray.300' rounded='sm'>
                            <Icon as={Unicons.User} color='gray.400' />
                            <Text fontSize='12px'>PAX 1</Text>
                            <Icon marginLeft='auto' as={Unicons.AngleRight} color='green.400' />
                        </HStack>
                    </Pressable>
                    <Pressable 
                        onPress={() => setModalSpecialRequest(true)}
                    >
                        <HStack alignItems='center' space='10px' padding='5px' borderWidth='1px' borderColor='gray.300' rounded='sm'>
                            <Icon as={Unicons.User} color='gray.400' />
                            <Text fontSize='12px'>PAX 1</Text>
                            <Icon marginLeft='auto' as={Unicons.AngleRight} color='green.400' />
                        </HStack>
                    </Pressable>
                </VStack>
                <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
                <VStack space='5px'>
                    <Text fontSize='14px' fontWeight='semibold'>
                        Hotel
                    </Text>
                    <Pressable onPress={() => setModalChooseHotel(true)}>
                        <HStack alignItems='center' space='10px' padding='5px' borderWidth='1px' borderColor='gray.300' rounded='sm'>
                            <Icon as={Unicons.User} color='gray.400' />
                            <Text fontSize='12px'>Choose Hotel</Text>
                            <Icon marginLeft='auto' as={Unicons.AngleRight} color='green.400' />
                        </HStack>
                    </Pressable>
                    <HStack alignItems='center' space='10px' padding='5px'>
                        <Icon as={Unicons.Notes} color='gray.400' />
                        <Text fontSize='12px'>Special Requests</Text>
                        <Icon marginLeft='auto' as={Unicons.AngleRight} color='green.400' />
                    </HStack>
                </VStack>
            </VStack>

            <VStack 
                position='absolute' 
                bottom='0' 
                backgroundColor='white' 
                padding='10px'
                shadow='9'
                width='100%'
                space='10px'
            >
                <HStack alignItems='center' justifyContent='space-between'>
                    <VStack>
                        <Text fontSize='12px'>Total Price</Text>
                        <Text fontSize='12px' color='gray.400'>2 Pax 2 Days</Text>
                    </VStack>
                    <Text fontSize='16px' color='green.500' fontWeight='semibold'>Rp. {(1040000).toLocaleString()}</Text>
                </HStack>
                <Button colorScheme='green' onPress={() => navigation?.push('payment')}>
                    Confirm Order
                </Button>
            </VStack>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisitor}
            >
                <Flex flex='1' backgroundColor='black' opacity='0.5' />
                <Flex
                    position='absolute'
                    bottom='0'
                    backgroundColor='white'
                    width={Dimensions.get('window').width}
                    shadow='9'
                    borderTopLeftRadius='20px'
                    borderTopRightRadius='20px'
                    padding='20px'
                    height='90%'
                >
                    <VStack space='20px'>
                        <HStack justifyContent='space-between'>
                            <Text fontSize='14px' fontWeight='semibold'>
                                Visitor Details
                            </Text>
                            <Pressable onPress={() => setModalVisitor(false)}>
                                <Text fontSize='14px' fontWeight='semibold' color='#038103'>
                                    Cancel
                                </Text>
                            </Pressable>
                        </HStack>
                        
                        <VStack marginTop='20px'>
                            <Text fontSize='12px' fontWeight='semibold'>
                                Nama Pengunjung
                            </Text>
                            <Input variant='underlined' />
                        </VStack>

                        <VStack>
                            <Text fontSize='12px' fontWeight='semibold'>
                                No. KTP
                            </Text>
                            <Input variant='underlined' />
                        </VStack>

                        <VStack space='10px'>
                            <Text fontSize='12px' fontWeight='semibold'>
                                Upload KTP
                            </Text>
                            <Pressable>
                                <HStack alignItems='center' space='10px'>
                                    <Icon as={Unicons.Upload} color='gray.400' />
                                    <Text fontSize='12px' color='gray.400'>
                                        Choose File
                                    </Text>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Button colorScheme='success'>
                            Done
                        </Button>
                    </VStack>
                </Flex>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSpecialRequest}
            >
                <Flex flex='1' backgroundColor='black' opacity='0.5' />
                <Flex
                    position='absolute'
                    bottom='0'
                    backgroundColor='white'
                    width={Dimensions.get('window').width}
                    shadow='9'
                    borderTopLeftRadius='20px'
                    borderTopRightRadius='20px'
                    padding='20px'
                    height='90%'
                >
                    <VStack space='20px'>
                        <HStack justifyContent='space-between'>
                            <Text fontSize='14px' fontWeight='semibold'>
                                Special Request
                            </Text>
                            <Pressable onPress={() => setModalSpecialRequest(false)}>
                                <Text fontSize='14px' fontWeight='semibold' color='#038103'>
                                    Cancel
                                </Text>
                            </Pressable>
                        </HStack>

                        <Flex marginX='-20px' backgroundColor='#c3e1c3' paddingX='20px' paddingY='10px'>
                            <Text fontSize='10px'>Special request mempengaruhi harga akhir sesuai jenis dan Jumlah yang dipilih.</Text>
                        </Flex>
                        
                        <HStack space='50px'>
                            <VStack flex='1'>
                                <Text fontSize='12px' fontWeight='semibold'>
                                    Jenis
                                </Text>
                                <Select variant='underlined'></Select>
                            </VStack>
                            <VStack flex='1'>
                                <Text fontSize='12px' fontWeight='semibold'>
                                    Jumlah
                                </Text>
                                <Input variant='underlined' />
                            </VStack>
                        </HStack>

                        <Pressable>
                            <HStack alignItems='center' space='10px'>
                                <Icon as={Unicons.Plus} color='#038103' />
                                <Text fontSize='12px' color='#038103'>
                                    Add More
                                </Text>
                            </HStack>
                        </Pressable>

                        <Button colorScheme='success'>
                            Done
                        </Button>
                    </VStack>
                </Flex>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalChooseHotel}
            >
                <Flex flex='1' backgroundColor='black' opacity='0.5' />
                <Flex
                    position='absolute'
                    bottom='0'
                    backgroundColor='white'
                    width={Dimensions.get('window').width}
                    shadow='9'
                    borderTopLeftRadius='20px'
                    borderTopRightRadius='20px'
                    padding='20px'
                    height='90%'
                >
                    <VStack space='20px'>
                        <HStack justifyContent='space-between'>
                            <Text fontSize='14px' fontWeight='semibold'>
                                Choose Hotel
                            </Text>
                            <Pressable onPress={() => setModalChooseHotel(false)}>
                                <Text fontSize='14px' fontWeight='semibold' color='#038103'>
                                    Cancel
                                </Text>
                            </Pressable>
                        </HStack>
                        
                        <HStack space='50px'>
                            <VStack flex='1'>
                                <Text fontSize='12px' fontWeight='semibold'>
                                    Check-in
                                </Text>
                                <TouchableOpacity 
                                    style={{ borderBottomColor: '#000', borderBottomWidth: 1, height: 40 }}
                                    onPress={() => setIsCheckInDatePickerShow(true)}
                                >
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isCheckInDatePickerShow}
                                    mode="date"
                                    onConfirm={(e: any) => setIsCheckInDatePickerShow(false)}
                                    onCancel={() => setIsCheckInDatePickerShow(false)}
                                />
                            </VStack>
                            <VStack flex='1'>
                                <Text fontSize='12px' fontWeight='semibold'>
                                    Check-out
                                </Text>
                                <TouchableOpacity style={{ borderBottomColor: '#000', borderBottomWidth: 1, height: 40 }}>
                                </TouchableOpacity>
                            </VStack>
                        </HStack>
                    </VStack>
                </Flex>
            </Modal>
        </Flex>
    )
}

export default CompleteData