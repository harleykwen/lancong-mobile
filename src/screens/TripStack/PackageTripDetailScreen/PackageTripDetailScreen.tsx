import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useQuery } from 'react-query'
import { getFacilitiesApi } from '../../../apis/master'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { 
    Button,
    Center,  
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'
import { IC_ARROW_BACK } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { Dimensions } from 'react-native'

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

    return (
        <Flex flex='1' backgroundColor='lancBackgroundLight'>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                space='8px'
                alignItems='center'
            >
                <Pressable 
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Stack 
                    direction='row' 
                    alignItems='center' 
                    space='8px'
                >
                    <Center 
                        backgroundColor='gray.100' 
                        paddingX='8px' 
                        paddingY='2px' 
                        rounded='sm'
                    >
                        <Text 
                            fontSize='12px' 
                            fontFamily='Poppins-SemiBold' 
                            color='gray.400'
                        >{data?.duration?.day}D{data?.duration?.night}N</Text>
                    </Center>
                    <Text 
                        fontSize='16px' 
                        fontFamily='Poppins-SemiBold' 
                        numberOfLines={1}
                        maxWidth={Dimensions.get('window').width * 80 / 100}
                    >{trip?.name}</Text>
                </Stack>
            </Stack>
            <Flex flex='1' paddingBottom='70px'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack padding='16px' space='20px'>
                        <Stack space='4px'>
                            <Text fontFamily='Poppins-SemiBold' fontSize='12px'>Ketersediaan Trip</Text>
                            <Stack>
                                <Text fontSize='10px'>Trip ini tersedia pada tanggal:</Text>
                                {group === 'private'
                                    ?   <Stack direction='row'>
                                            <Text fontSize='10px'>
                                                {format(new Date(data?.availability?.open), 'dd MMMM yyyy', { locale: id })}
                                                {' '} sampai {' '}
                                                {format(new Date(data?.availability?.close), 'dd MMMM yyyy', { locale: id })}
                                            </Text>
                                        </Stack>
                                    :   <Stack direction='row'>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.trip_start), 'dd MMMM yyyy', { locale: id })} </Text>
                                            <Text fontSize='11px'>{data?.person?.min}sampai </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{format(new Date(data?.trip_end), 'dd MMMM yyyy', { locale: id })}</Text>
                                        </Stack>
                                }
                            </Stack>
                        </Stack>
                        <Stack space='4px'>
                            <Text fontFamily='Poppins-SemiBold' fontSize='12px'>Rencana Perjalanan</Text>
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
                                                backgroundColor='lancPrimaryLight'
                                                width='100px'
                                                marginLeft='-10.5px'
                                            >
                                                <Text 
                                                    fontFamily='Poppins-SemiBold' 
                                                    fontSize='10px'
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
                                                        <Text fontSize='10px'>
                                                            {itinerary?.start_time} {' - '} {itinerary?.end_time} { ' ' }
                                                        </Text>
                                                        <Text fontSize='10px'flex='1'>{itinerary?.description}</Text>
                                                    </Stack>
                                                )
                                            })}
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </Stack>
                        {group === 'private'
                            ?   <Stack space='4px'>
                                    <Text fontFamily='Poppins-SemiBold' fontSize='12px'>Batas Penumpang</Text>
                                    <Stack>
                                        <Text fontFamily='Poppins-Light' fontSize='10px'>minimal: {data?.person?.min} orang</Text>
                                        <Text fontFamily='Poppins-Light' fontSize='10px'>maksimal: {data?.person?.max} orang</Text>
                                    </Stack>
                                </Stack>
                            :   <Stack space='4px'>
                                    <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Kuota Penumpang</Text>
                                    <Text fontFamily='Poppins-Light' fontSize='10px'>{data?.quota - data?.current_participant} orang</Text>
                                </Stack>
                        }
                        <Stack>
                            <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Titik Berkumpul</Text>
                            <Text fontFamily='Poppins-Light' fontSize='10px'>Titik berkumpul trip ini berada di {data?.meeting_point?.text}</Text>
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
                width='100%'
                flex='1'
            >
                <Stack>
                    <Text fontFamily='Poppins-Regular' fontSize='11px'>Harga per orang</Text>
                    <Text 
                        color='orange.400' 
                        fontFamily='Poppins-SemiBold' 
                        fontSize='13px'
                    >Rp. {data?.price?.toLocaleString('id')}</Text>
                </Stack>
                <Button 
                    width='125px'
                    onPress={() => {
                        navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_PACKAGE_CHECKOUT, { 
                            data: data,
                            group: group,
                            trip: trip
                        })
                    }}
                >
                    Pilih Paket
                </Button>
            </Stack>
        </Flex>
    )
}

export default PackageTripDetailScreen