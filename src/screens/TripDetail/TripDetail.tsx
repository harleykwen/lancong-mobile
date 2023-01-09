import React from 'react'
import * as Unicons from "react-native-unicons"
import { Box, Button, Flex, HStack, Icon, Image, Text, VStack } from 'native-base'

interface ITripDetail {
    route: any
    navigation: any
}

const TripDetail = (props: ITripDetail) => {
    const { route, navigation } = props
    const { id, title, refundable, meetingPoint, facilities, location, time, price, duration, image } = route.params

    return (
        <Flex flex='1' backgroundColor='white'>
            <Image source={{uri: image}} alt={image} height='175px' />
            <Flex padding='10px'>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Box padding='10px' backgroundColor='black' rounded='lg'>
                        <Text fontSize='14px' color='white'>{duration}</Text>
                    </Box>
                    <Icon as={Unicons.Bookmark} />
                </HStack>
            </Flex>
            <VStack space='5px' padding='10px'>
                <Text fontSize='14px' fontWeight='bold'>{title}</Text>
                <HStack alignItems='center' space='5px'>
                    <Icon as={Unicons.Star} color='yellow.400' />
                    <Text fontSize='14px'>4.1</Text>
                    <Text fontSize='14px'>(2500 reviews)</Text>
                </HStack>
                <HStack alignItems='center' space='5px'>
                    <Icon as={Unicons.LocationPinAlt} />
                    <Text fontSize='14px'>{location}</Text>
                </HStack>
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
                    <Text fontSize='12px'>Starting from</Text>
                    <Text fontSize='16px' color='green.500' fontWeight='semibold'>Rp. {price.toLocaleString()}</Text>
                </VStack>
                <Button colorScheme='green' onPress={() => navigation.push('list-trip-type', {
                    id, title, refundable, meetingPoint, facilities, location, time, price, duration, image
                })}>
                    Find Option
                </Button>
            </Flex>
        </Flex>
    )
}

export default TripDetail