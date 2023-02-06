import React from 'react'
import * as Unicons from 'react-native-unicons'
import { Button, Center, Flex, HStack, Icon, Image, Pressable, ScrollView, Text, VStack } from 'native-base'
import { useQuery } from 'react-query'
import { getTripTypeListApi } from '../../apis/trip'

interface IListTripType {
    route: any
    navigation: any
}

interface IListTripTypeItem {
    navigation: any
    data: any
}

const ListTripTypeItem = (props: IListTripTypeItem) => {
    const { navigation, data } = props

    return (
        <VStack padding='10px' borderWidth='1px' borderColor='gray.300' rounded='md' space='10px' backgroundColor='white'>
            <HStack space='10px' alignItems='center'>
                <Image 
                    rounded='lg' 
                    source={{uri: data?.images[0]?.url}} 
                    alt={data?.images[0]?.url}
                    height='100px' 
                    width='100px' 
                />
                <VStack flex='1'>
                    <Text fontSize='16px' fontWeight='semibold' flexWrap='wrap'>
                        {data?.name} {data?.options?.type === 'Private' ? data?.options?.range_person_max : data?.options?.max_participant} Pax
                    </Text>
                    <HStack alignItems='center'>
                        <Text fontSize='16px' color='green.600' fontWeight='semibold'>Detail</Text>
                        <Icon as={Unicons.AngleRight} color='green.600' />
                    </HStack>
                    <Text fontSize='16px' fontWeight='semibold'>
                        {data?.trip_duration_days}D{data?.trip_duration_night}N
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
                    {data?.facilities?.find((x: any) => x?.facility_type === 'Tenda') &&
                        <VStack alignItems='center'>
                            <Icon as={Unicons.HouseUser} color='blue.400' />
                            <Text fontSize='11px' color='blue.400'>Tent</Text>
                        </VStack>
                    }
                    {/* <VStack alignItems='center'>
                        <Icon as={Unicons.Utensils} color='yellow.400' />
                        <Text fontSize='11px' color='yellow.400'>Lunch</Text>
                    </VStack>
                    <VStack alignItems='center'>
                        <Icon as={Unicons.ParkingCircle} color='info.400' />
                        <Text fontSize='11px' color='info.400'>Parking Area</Text>
                    </VStack> */}
                </HStack>
            </VStack>
            <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
            <VStack>
                <Text fontSize='12px'>Meeting Point</Text>
                <HStack alignItems='center' space='5px'>
                    <Icon as={Unicons.MapMarker} />
                    <Text fontSize='11px'>{data?.meeting_point?.text}</Text>
                </HStack>
            </VStack>
            <Flex borderTopWidth='1px' borderTopColor='gray.300' width='100%' />
            <HStack alignItems='center' justifyContent='space-between'>
                <Text fontSize='14px' color='green.500' fontWeight='semibold'>Rp. {(300000).toLocaleString()}</Text>
                <Button colorScheme='green' onPress={() => navigation.push('trip-type-detail')}>
                    Select
                </Button>
            </HStack>
        </VStack>
    )
}

const ListTripType = (props: IListTripType) => {
    const { route, navigation } = props
    const { id, title, duration } = route.params

    const tripTypeList = useQuery('get-trip-type-list', () => getTripTypeListApi({ id }))

    return (
        <Flex backgroundColor='white' flex='1'>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontWeight='semibold'>{title}</Text>
                <Text fontSize='16px' color='white' fontWeight='semibold'>{duration}</Text>
                <Pressable position='absolute' left='10px'>
                    <Icon as={Unicons.ArrowLeft} color='white' onPress={() => navigation.goBack()} />
                </Pressable>
            </Center>
            <Flex flex='1'>
                <ScrollView>
                    <VStack padding='10px' space='10px'>
                        {tripTypeList?.data && tripTypeList?.data?.map((data: any, index: number) => {
                            return (
                                    <ListTripTypeItem key={index} navigation={navigation} data={data} />
                            )
                        })}
                    </VStack>
                </ScrollView>
            </Flex>
        </Flex>
    )
}

export default ListTripType