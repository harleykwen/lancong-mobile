import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { 
    Actionsheet,
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    Stack, 
    Text,
    useDisclose, 
} from 'native-base'
import PackageTripCard from './PackageTripCard'

interface ITripCard {
    data: any
    group: any
    navigation: any
}

const TripCard = (props: ITripCard) => {
    const {
        data,
        group,
        navigation,
    } = props

    const { 
        isOpen, 
        onOpen, 
        onClose 
    } = useDisclose()

    return (
        <Flex flex={1} padding='5px'>
            <Stack 
                direction='column'
                rounded='lg' 
                borderWidth='1px' 
                borderColor='gray.200'
            >
                <Pressable 
                    onPress={() => navigation.push('detail-trip', { 
                        data: data,
                        group: group,
                    })}
                >
                    <Image 
                        source={{uri: data?.images[0]?.url}} 
                        alt={data?.images[0]?.url} 
                        height='100px' 
                        borderTopLeftRadius='lg'
                        borderTopRightRadius='lg'
                    />
                    <Stack 
                        direction='column' 
                        space='10px' 
                        padding='10px'
                    >
                        <Text 
                            fontSize='13px' 
                            fontFamily='Poppins-Medium' 
                            noOfLines={1}
                        >{data?.name}</Text>
                        <Stack>
                            <Text fontSize='11px' fontFamily='Poppins-Light'>Mulai dari</Text>
                            <Text 
                                fontSize='15px' 
                                fontFamily='Poppins-SemiBold' 
                                noOfLines={1}
                            >Rp. {Math.min(...data?.[group]?.map((packageTrip: any) => packageTrip.price))?.toLocaleString('id')}</Text>
                        </Stack>
                        <Stack direction='row'  alignItems='center'>
                            <Icon 
                                as={MaterialIcons} 
                                name='location-pin' 
                                color='xprimary.50' 
                                size='sm' 
                            />
                            <Text 
                                fontSize='11px' 
                                fontFamily='Poppins-Light' 
                                color='gray.500'
                                numberOfLines={1}
                            >{data?.location?.text}</Text>
                        </Stack>
                    </Stack>
                </Pressable>
                <Pressable 
                    flexDirection='row' 
                    padding='10px' 
                    justifyContent='space-between' 
                    alignItems='center'
                    borderTopColor='gray.200'
                    borderTopWidth='1px'
                    onPress={onOpen}
                >
                    <Text 
                        fontSize='11px' 
                        fontFamily='Poppins-SemiBold'
                        color='xprimary.50'
                    >Lihat Paket</Text>
                    <Icon 
                        as={MaterialIcons} 
                        name='keyboard-arrow-up' 
                        color='xprimary.50' 
                        size='sm' 
                    />
                </Pressable>
            </Stack>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content padding='16px' backgroundColor='white'>
                    <Stack width='100%' space='16px'>
                        <Stack 
                            direction='row' 
                            justifyContent='space-between' 
                            alignItems='center'
                        >
                            <Stack direction='row'>
                                <Text fontSize='13px' fontFamily='Poppins-Light'>Paket Trip</Text>
                                <Text fontSize='13px' fontFamily='Poppins-Medium'> {data?.name}</Text>
                            </Stack>
                            <Stack direction='row'>
                                <Text 
                                    color='xprimary.50' 
                                    fontSize='11px' 
                                    fontFamily='Poppins-Medium'
                                >{data?.[group]?.length}</Text>
                                <Text 
                                    color='xprimary.50' 
                                    fontSize='11px' 
                                    fontFamily='Poppins-Light'
                                > Paket</Text>
                            </Stack>
                        </Stack>
                        {data?.[group]?.map((packageTrip: any, index: number) => {
                            return (
                                <PackageTripCard 
                                    key={index} 
                                    trip={data}
                                    data={packageTrip} 
                                    group={group}
                                    onPress={() => navigation.push('trip-package-detail', { 
                                        data: packageTrip,
                                        group: group,
                                        trip: data
                                    })}
                                />
                            )
                        })}
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>
        </Flex>
    )
}

export default TripCard