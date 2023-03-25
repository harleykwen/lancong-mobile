import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useMutation, useQuery } from 'react-query'
import { getFacilitiesApi } from '../../../apis/master.api'
import { Header } from '../../../components'
import { facilityIcon } from './facilityIcon'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { 
    Button,
    Center, 
    FlatList, 
    Flex, 
    Icon, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'
import { createTransactionTripApi } from '../../../apis/transaction.api'

interface IPackageTripDetailScreen {
    navigation: any
    route: any
}

const PackageTripDetailScreen = (props: IPackageTripDetailScreen) => {
    const { navigation, route } = props
    const { data, group, trip } = route?.params

    const facilityIconProvider: any = {
        '63d7bf7af149922b4404f60f': Fontisto,
        '63d7bf7af149922b4404f610': MaterialIcons,
        '63d7bf7af149922b4404f611': FontAwesome5,
        '63d7bf7af149922b4404f612': MaterialIcons,
        '63d7bf7af149922b4404f613': Ionicons,
        '63d7bf7af149922b4404f614': Fontisto,
        '63d7bf7bf149922b4404f615': Ionicons,
        '63d7bf7bf149922b4404f616': FontAwesome5,
        '63d7bf7bf149922b4404f617': FontAwesome5,
        '63d7bf7bf149922b4404f618': MaterialIcons,
        '63d7bf7bf149922b4404f619': FontAwesome5,
        '63d7bf7bf149922b4404f61a': MaterialCommunityIcons,
        '63d7bf7bf149922b4404f61b': MaterialIcons,
        '63d7bf7bf149922b4404f61c': Fontisto,
        '63d7bf7bf149922b4404f61d': Ionicons,
    }

    const facilities = useQuery('facilities', getFacilitiesApi)
    const createTransaction = useMutation(createTransactionTripApi, {
        onSuccess: () => {
            navigation.push('trip-package-checkout', { 
                data: data,
                group: group,
                trip: trip
            })
        }
    })

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title={`${trip?.name} - ${data?.duration?.day}D${data?.duration?.night}N`}
                onPressBack={() => navigation.goBack()}
            />
            <Flex flex='1' paddingBottom='70px'>
                <ScrollView>
                    <Stack padding='10px' space='20px'>
                        <Stack>
                            <Text 
                                fontFamily='Poppins-Medium' 
                                fontSize='15px'
                                marginBottom='5px'
                            >Ketersediaan Trip</Text>
                            <Stack>
                                <Text fontFamily='Poppins-Light' fontSize='11px'>Trip ini tersedia pada tanggal:</Text>
                                {group === 'private'
                                    ?   <Stack direction='row'>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.availability?.open), 'dd MMMM yyyy', { locale: id })} </Text>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>{data?.person?.min}sampai </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.availability?.close), 'dd MMMM yyyy', { locale: id })}</Text>
                                        </Stack>
                                    :   <Stack direction='row'>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.trip_start), 'dd MMMM yyyy', { locale: id })} </Text>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>{data?.person?.min}sampai </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.trip_end), 'dd MMMM yyyy', { locale: id })}</Text>
                                        </Stack>
                                }
                            </Stack>
                        </Stack>
                        <Stack>
                            <Text 
                                fontFamily='Poppins-Medium' 
                                fontSize='15px' 
                                marginBottom='5px'
                            >Rencana Perjalanan</Text>
                            <Stack space='5px'>
                                {data?.itineraries?.map((itinerary: any, index: number) => {
                                    return (
                                        <Stack 
                                            key={index} 
                                            padding='10px' 
                                            space='10px'
                                            borderRadius='6px'
                                            borderColor='gray.300'
                                            borderWidth='1px'
                                        >
                                            <Center 
                                                padding='8px' 
                                                borderTopLeftRadius='0px'
                                                borderBottomLeftRadius='0px'
                                                borderBottomRightRadius='full'
                                                borderTopRightRadius='full'
                                                backgroundColor='xprimary.50'
                                                width='100px'
                                                marginLeft='-10px'
                                            >
                                                <Text 
                                                    fontFamily='Poppins-Medium' 
                                                    fontSize='11px'
                                                    color='white'
                                                >Hari ke - {itinerary?.day}</Text>
                                            </Center>
                                            {itinerary?.itinerary?.map((itinerary: any, index: number) => {
                                                return (
                                                    <Stack 
                                                        key={index} 
                                                        direction='row' 
                                                        space='5px'
                                                    >
                                                        <Text fontFamily='Poppins-Medium' fontSize='11px'>{itinerary?.start_time}</Text>
                                                        <Text fontFamily='Poppins-Light' fontSize='11px'> - </Text>
                                                        <Text fontFamily='Poppins-Medium' fontSize='11px'>{itinerary?.end_time} </Text>
                                                        <Text 
                                                            fontFamily='Poppins-Light' 
                                                            fontSize='11px'
                                                            flex='1'
                                                        >{itinerary?.description}</Text>
                                                    </Stack>
                                                )
                                            })}
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </Stack>
                        {group === 'private'
                            ?   <Stack>
                                    <Text 
                                        fontFamily='Poppins-Medium' 
                                        fontSize='15px'
                                        marginBottom='5px'
                                    >Batas Penumpang</Text>
                                    <Stack>
                                        <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>minimal: </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.person?.min} orang</Text>
                                        </Stack>
                                        <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>maksimal: </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.person?.max} orang</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            :   <Stack>
                                    <Text 
                                        fontFamily='Poppins-Medium' 
                                        fontSize='15px'
                                        marginBottom='5px'
                                    >Kuota Penumpang</Text>
                                    <Stack>
                                        <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>{data?.quota - data?.current_participant}</Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'> orang</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                        }
                        <Stack>
                            <Text 
                                fontFamily='Poppins-Medium' 
                                fontSize='15px'
                                marginBottom='5px'
                            >Titik Berkumpul</Text>
                            <Stack direction='row'>
                                <Text fontFamily='Poppins-Light' fontSize='11px'>Titik berkumpul trip ini berada di </Text>
                                <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.meeting_point?.text}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Flex>

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='10px'
                backgroundColor='white'
                alignItems='center'
                position='absolute'
                bottom='0px'
                left='0px'
                right='0px'
                shadow='5'
            >
                <Stack>
                    <Text fontFamily='Poppins-Light' fontSize='11px'>Harga per orang</Text>
                    <Text 
                        color='xprimary.50' 
                        fontFamily='Poppins-Medium' 
                        fontSize='13px'
                    >Rp. {data?.price?.toLocaleString('id')}</Text>
                </Stack>
                <Button 
                    height='50px'
                    width='125px'
                    borderRadius='8px'
                    backgroundColor='xprimary.50'
                    isLoading={createTransaction?.isLoading}
                    _pressed={{
                        backgroundColor: 'xprimary.40'
                    }}
                    onPress={() => {
                        // createTransaction?.mutate({
                        //     trip_id: trip?.id,
                        //     package_id: data?.id,
                        //     group,
                        // })
                        navigation.push('trip-package-checkout', { 
                            data: data,
                            group: group,
                            trip: trip
                        })
                    }}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                        color='white'
                    >Pilih Paket</Text>
                </Button>
            </Stack>
        </Flex>
    )
}

export default PackageTripDetailScreen