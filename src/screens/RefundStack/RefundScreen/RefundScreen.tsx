import React from 'react'
import { IC_ARROW_BACK, IC_CHECK_CIRCLE } from '../../../assets'
import { 
    Actionsheet,
    Button,
    Center,
    Divider,
    Flex, 
    HStack, 
    Image, 
    Link, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text,
    useDisclose, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface RefundScreenInterface {
    navigation?: any
}

const RefundScreen: React.FC<RefundScreenInterface> = (props: RefundScreenInterface) => {
    const { navigation } = props

    const baseStylePressedTextComponent: object = {
        fontFamily: 'Poppins-Medium',
        marginLeft: '8px',
        fontSize: '11px',
        marginTop: '2px',
    }

    const logs = [
        {
            label: 'Refund Request Submitted',
            date: '19:45 | 20 August 2023',
        },
        {
            label: 'Lancong is Reviewing Your Request',
            date: '20:45 | 20 August 2023',
        },
        {
            label: 'Refund Approved',
            date: '07:00 | 15 Sept 2023',
        },
        {
            label: 'Sending Refund',
            date: '9:45 | 15 Sept 2023',
        },
        {
            label: 'Refund Transferred',
            date: '15:30 | 21 Sept 2023',
        },
    ]

    const data: any = {
        "id": "655dec4781dcb2c24a020e67",
        "transaction_type": "trip",
        "order": {
            "id": "655dec4781dcb2c24a020e68",
            "group": "public",
            "pax": 1,
            "trip_start": 1705708800000,
            "trip_end": 1705708800000,
            "participants": [
                {
                    "id": "654149dccbcfe9648c072b19",
                    "name": "Harli Fauzi Ramli",
                    "birthdate": 950034941000,
                    "email": "harleykwen@mailinator.com",
                    "phone": "085161361009",
                    "identity": {
                        "citizenship": "Indonesia",
                        "id_number": "3214110902000005",
                        "id_card": {
                            "name": "dummy-image.jpeg",
                            "url": "https://lancong-storage-dev.s3.ap-southeast-3.amazonaws.com/pelancong/deLMY67G-ka99HoLa-1698777564-dummy-image.jpeg"
                        }
                    },
                    "passport": {
                        "passport_number": "",
                        "publication_date": null,
                        "expiration_date": null
                    },
                    "created_at": 1698777564000
                }
            ],
            "special_requests": [
                {
                    "id": "01H9K5A2JFQZPFS9B0PZV3N9YS",
                    "type": "Jaket",
                    "description": "Ukuran S, L",
                    "price": 30000,
                    "amount": 0,
                    "total_price": 0
                },
                {
                    "id": "01H9K5A2JFQZPFS9B0PZV3N9YT",
                    "type": "Tenda",
                    "description": "",
                    "price": 76000,
                    "amount": 0,
                    "total_price": 0
                },
                {
                    "id": "01H9K5A2JFQZPFS9B0PZV3N9YV",
                    "type": "Sleeping bag",
                    "description": "Nyaman buat tidur",
                    "price": 27000,
                    "amount": 0,
                    "total_price": 0
                },
                {
                    "id": "01H9K5A2JFQZPFS9B0PZV3N9YW",
                    "type": "Senter",
                    "description": "Senter sangat terang, bisa menerangi masa depan",
                    "price": 15000,
                    "amount": 0,
                    "total_price": 0
                }
            ],
            "pax_price": 330000,
            "sr_price": 0,
            "total_price": 330000,
            "status": {
                "flag": "DRAFT",
                "text": "Draft",
                "color": "#000",
                "background": "#FFF"
            },
            "trip": {
                "id": "64577ec1f97b4f407a0f28c1",
                "name": "Lets Go Healing",
                "location": {
                    "place_id": "ChIJ0VnY2-Naei4RLVqVJTug5xk",
                    "name": "Candi Prambanan",
                    "address": "Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55571, Indonesia",
                    "maps_url": "https://maps.google.com/?cid=1866636746462419501",
                    "latitude": -7.752020600000001,
                    "longitude": 110.4914674
                },
                "highlight": "Lorem ipsum dolor sit amet consectetur",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fugit sit consequuntur numquam quia?",
                "images": [
                    {
                        "name": "trip-image.jpeg",
                        "url": "https://lancong-storage-dev.s3.ap-southeast-3.amazonaws.com/trip/thumbnails/3SeDnd8c-Mw6oaxRi-1683183161-trip-image.jpeg"
                    },
                    {
                        "name": "trip-image.webp",
                        "url": "https://lancong-storage-dev.s3.ap-southeast-3.amazonaws.com/trip/thumbnails/n7Lndn6e-r9Dr78bE-1683183161-trip-image.webp"
                    },
                    {
                        "name": "trip-image.png",
                        "url": "https://lancong-storage-dev.s3.ap-southeast-3.amazonaws.com/trip/thumbnails/Dw3lbKuz-F6xWYe6Q-1683183161-trip-image.png"
                    }
                ]
            },
            "public": {
                "id": "64f7618b7cfac0500f0b43ad",
                "trip_start": 1705708800000,
                "trip_end": 1705881600000,
                "duration": {
                    "day": 3,
                    "night": 3
                },
                "quota": 20,
                "itineraries": [
                    {
                        "day": "1",
                        "itinerary": [
                            {
                                "start_time": "07:00",
                                "end_time": "08:00",
                                "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, sequi?"
                            }
                        ]
                    },
                    {
                        "day": "2",
                        "itinerary": [
                            {
                                "start_time": "07:00",
                                "end_time": "08:00",
                                "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, sequi?"
                            }
                        ]
                    },
                    {
                        "day": "3",
                        "itinerary": [
                            {
                                "start_time": "07:00",
                                "end_time": "08:00",
                                "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, sequi?"
                            }
                        ]
                    }
                ],
                "meeting_point": {
                    "place_id": "ChIJrZu_OKSNaS4Rjor29-S7ouc",
                    "name": "Solaria - Bekasi Cyber Park",
                    "address": "Lantai LG, Solaria, Bks Cyber Park, Jl. Ahmad Yani, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17144, Indonesia",
                    "maps_url": "https://maps.google.com/?cid=16691109761075546766",
                    "latitude": -6.246519600000001,
                    "longitude": 106.9918618
                },
                "facilities": [
                    {
                        "type": "Tenda",
                        "description": "Tenda untuk 4 orang",
                        "quantity": 1
                    },
                    {
                        "type": "Sleeping bag",
                        "description": "Nyaman buat tidur",
                        "quantity": 2
                    },
                    {
                        "type": "Jaket",
                        "description": "Ukuran S, L",
                        "quantity": 2
                    }
                ],
                "special_requests": [
                    {
                        "id": "01H9K5A2JFQZPFS9B0PZV3N9YS",
                        "type": "Jaket",
                        "description": "Ukuran S, L",
                        "price": 30000
                    },
                    {
                        "id": "01H9K5A2JFQZPFS9B0PZV3N9YT",
                        "type": "Tenda",
                        "description": "",
                        "price": 76000
                    },
                    {
                        "id": "01H9K5A2JFQZPFS9B0PZV3N9YV",
                        "type": "Sleeping bag",
                        "description": "Nyaman buat tidur",
                        "price": 27000
                    },
                    {
                        "id": "01H9K5A2JFQZPFS9B0PZV3N9YW",
                        "type": "Senter",
                        "description": "Senter sangat terang, bisa menerangi masa depan",
                        "price": 15000
                    }
                ],
                "hotel": [
                    "H001",
                    "H001"
                ],
                "price": 330000,
                "is_published": true
            }
        }
    }

    const disclosure = useDisclose()

    return (
        <Flex backgroundColor='white' flex={1}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='white'
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
                <Text
                    fontSize='16px' 
                    fontFamily='Poppins-SemiBold'
                >Refund</Text>
            </Stack>

            <ScrollView>
                <Flex padding='16px'>
                    {/* <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        // rounded='md'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Berjuang Bersama Semeru</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular' marginTop='8px'>Kamis, 22 Desember 2023</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>2 Pax</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>3 Hari 2 Malam</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>Gunung Semeru</Text>
                        <Button 
                            variant='lancSolid' 
                            size='sm'
                            marginTop='8px'
                            rounded='none'
                            _text={{ fontSize: '12px' }}
                        >E-Card has been issued</Button>
                    </Flex> */}

                    {/* <Flex 
                        padding='16px' 
                        shadow='3' 
                        backgroundColor='white'
                        marginTop='16px'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Kebijakan Refund</Text>
                        <Stack space='16px' marginTop='16px'>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Refund mungkin tidak berlaku untuk alasan</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Jumlah refund tergantung pada alasan dan tanggal pengajuan refund, dihitung berdasarkan tarif dasar.</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Sebagai informasi, refund dapat dikembalikan dalam bentuk uang tunai, Kupon Lancong, atau Lancong Poin.</Text>  
                        </Stack>
                        <Flex 
                            borderColor='gray.300' 
                            borderWidth='1px' 
                            padding='16px' 
                            marginTop='16px'
                        > 
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Kurang dari 45 Hari S/d 30 hari sebelum Waktu keberangkatan.</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Sebelum 22 November 2023 (15:30 waktu Jakarta)</Text>  
                            <Flex
                                alignItems='center'
                                justifyContent='space-between'
                                marginTop='16px'
                                direction='row'
                            >
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Adult</Text>  
                                <Text fontSize='12px' fontFamily='Poppins-Regular'>IDR 125.000 / pax</Text> 
                            </Flex>
                        </Flex>
                    </Flex> */}

                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Refund ID</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>3281001</Text>
                    </Flex>

                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        marginTop='16px'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Refund Progress</Text>
                        <Stack marginTop='8px'>
                            {
                                logs?.map((log: any, i: number) => {
                                    return (
                                        <Flex
                                            key={i}
                                            borderLeftWidth='1px'
                                            borderColor='green.600'
                                            paddingLeft='16px'
                                            position='relative'
                                            marginLeft='12px'
                                            paddingBottom='12px'
                                        >
                                            <Center 
                                                height='24px' 
                                                width='24px' 
                                                rounded='full' 
                                                backgroundColor='green.600'
                                                position='absolute'
                                                left='-12px'
                                            >
                                                <Image
                                                    alt='IC_CHECK_CIRCLE'
                                                    source={IC_CHECK_CIRCLE}
                                                    width='18px'
                                                    height='18px'
                                                    tintColor='white'
                                                />
                                            </Center>
                                            <Text fontSize='12px' fontFamily='Poppins-SemiBold' color='green.600' marginTop='4px'>{log?.label}</Text>
                                            <Text fontSize='12px' fontFamily='Poppins-Regular'>{log?.date}</Text>
                                        </Flex>
                                    )
                                })
                            }
                            <Divider marginTop='16px' />
                            <Text marginTop='16px' fontSize='14px' fontFamily='Poppins-SemiBold'>Refund Reason</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Canceled by Users</Text>
                        </Stack>
                    </Flex>

                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        marginTop='16px'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Refund Amount</Text>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='8px'>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Amount from Vendor</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Rp 1.465.000</Text>
                        </HStack>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='4px'>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Refund Fee</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Rp 35.000</Text>
                        </HStack>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='4px'>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Refund Fee</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>(Rp 10.000)</Text>
                        </HStack>
                        <Divider marginTop='4px' />
                        <HStack justifyContent='space-between' alignItems='center' marginTop='4px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Total</Text>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp 1.500.000</Text>
                        </HStack>
                    </Flex>

                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        marginTop='16px'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Bank Detail</Text>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='8px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Bank Name</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>PT BANK CENTRAL ASIA</Text>
                        </HStack>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='4px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Account Holder Name</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>M IQBAL RIZALDI</Text>
                        </HStack>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='4px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Account Number</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>4550002193101</Text>
                        </HStack>
                    </Flex>

                    <Pressable
                        onPress={disclosure.onOpen}
                    >
                        <Flex 
                            padding='16px' 
                            backgroundColor='white' 
                            shadow='3' 
                            marginTop='16px'
                        >
                            <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Trip Detail</Text>
                            <Stack padding='16px' borderRadius='8px' borderColor='gray.300' borderWidth='1px' marginTop='8px' space='4px'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>TRIP - Berjuang Bersama Semeru</Text>
                                <Text fontSize='12px' fontFamily='Poppins-Regular'>Rabu, 10 September 2023</Text>
                                <Text fontSize='12px' fontFamily='Poppins-Regular'>3D2N</Text>
                            </Stack>
                        </Flex>
                    </Pressable>

                    {/* <Flex marginTop='16px'>
                        <Button 
                            variant='lancSolid'
                            onPress={() => {
                                navigation?.push(ROUTE_NAME?.REFUND_NAVIGATOR_INFORMATION)
                            }}
                        >Mulai Refund</Button>
                    </Flex> */}
                </Flex>

                <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
                    <Actionsheet.Content
                        padding='16px'
                        backgroundColor='lancBackgroundLight'
                        alignItems='flex-start'
                    >
                        <ScrollView>
                            <Stack space='14px'>
                                <Stack
                                    width='100%'
                                    space='14px'
                                    padding='14px'
                                    bg='gray.100'
                                    rounded='md'
                                >
                                    <Text fontFamily='Poppins-SemiBold' fontSize='15px'>Detail Trip</Text>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Waktu Trip</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {format(new Date(data?.order?.trip_start), 'EEEE, dd MMMM yyyy', { locale: id })} - {format(new Date(data?.order?.trip_end), 'EEEE, dd MMMM yyyy', { locale: id })}
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Durasi Trip</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {data?.order[data?.order?.group]?.duration?.day} hari {data?.order[data?.order?.group]?.duration?.day} malam
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Lokasi Trip</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {data?.order?.trip?.location?.name}
                                        </Text>
                                        <Text {...baseStylePressedTextComponent} marginTop='-10px'>
                                            {data?.order?.trip?.location?.address}
                                        </Text>
                                        <Link href={data?.order?.trip?.location?.maps_url}>
                                            <Text
                                                {...baseStylePressedTextComponent}
                                                color='lancPrimaryLight'
                                                fontFamily='Poppins-SemiBold'
                                            >
                                                Lihat di Maps
                                            </Text>
                                        </Link>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Titik Berkumpul</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {data?.order[data?.order?.group]?.meeting_point?.name}
                                        </Text>
                                        <Text {...baseStylePressedTextComponent} marginTop='-10px'>
                                            {data?.order[data?.order?.group]?.meeting_point?.address}
                                        </Text>
                                        <Link href={data?.order[data?.order?.group]?.meeting_point?.maps_url}>
                                            <Text
                                                {...baseStylePressedTextComponent}
                                                color='lancPrimaryLight'
                                                fontFamily='Poppins-SemiBold'
                                            >
                                                Lihat di Maps
                                            </Text>
                                        </Link>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Daftar Pelancong</Text>
                                        <Stack space='0px'>
                                            {data?.order?.participants?.map((v: any, i: number) => {
                                                return (
                                                    <Text {...baseStylePressedTextComponent} key={i}>
                                                        {i + 1}. {v?.name}
                                                    </Text>
                                                )
                                            })}
                                        </Stack>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Permintaan Khusus</Text>
                                        <Stack space='0px'>
                                            {data?.order?.special_requests?.find((x: any) => x?.amount !== 0) && data?.order?.special_requests?.map((v: any, i: number) => {
                                                if (v?.amount) return (
                                                    <Text {...baseStylePressedTextComponent} key={i}>
                                                        {v?.amount !== 0 && `${i + 1}. ${v?.type} (${v?.amount} pcs)`}
                                                    </Text>
                                                )
                                                return null
                                            })}

                                            {!data?.order?.special_requests?.find((x: any) => x?.amount !== 0) &&
                                                <Text {...baseStylePressedTextComponent}>-</Text>
                                            }
                                        </Stack>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Sub Total Trip</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            Rp. {data?.order?.total_price?.toLocaleString('id')}
                                        </Text>
                                    </Stack>
                                </Stack>

                                <Stack
                                    width='100%'
                                    space='14px'
                                    padding='14px'
                                    bg='gray.100'
                                    rounded='md'
                                >
                                    <Text fontFamily='Poppins-SemiBold' fontSize='15px'>Detail Hotel</Text>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Waktu Check in</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {format(new Date(data?.order?.trip_start), 'EEEE, dd MMMM yyyy', { locale: id })} - {format(new Date(data?.order?.trip_end), 'EEEE, dd MMMM yyyy', { locale: id })}
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Waktu Check out</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {format(new Date(data?.order?.trip_start), 'EEEE, dd MMMM yyyy', { locale: id })} - {format(new Date(data?.order?.trip_end), 'EEEE, dd MMMM yyyy', { locale: id })}
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Tipe Kamar</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            Deluxe
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Jumlah Kamar</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            2 Kamar
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Special Request</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            1 Extra Bed
                                        </Text>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Lokasi Hotel</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            {data?.order?.trip?.location?.name}
                                        </Text>
                                        <Text {...baseStylePressedTextComponent} marginTop='-10px'>
                                            {data?.order?.trip?.location?.address}
                                        </Text>
                                        <Link href={data?.order?.trip?.location?.maps_url}>
                                            <Text
                                                {...baseStylePressedTextComponent}
                                                color='lancPrimaryLight'
                                                fontFamily='Poppins-SemiBold'
                                            >
                                                Lihat di Maps
                                            </Text>
                                        </Link>
                                    </Stack>

                                    <Stack space='10px' width='100%'>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Sub Total Hotel</Text>
                                        <Text {...baseStylePressedTextComponent}>
                                            Rp. 923.000
                                        </Text>
                                    </Stack>
                                </Stack>

                                <Stack padding='14px' bg='gray.100'>
                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Sub Total</Text>
                                        <Text {...baseStylePressedTextComponent}>Rp. {Number(data?.order?.total_price + 923000)?.toLocaleString('id')}</Text>
                                    </Stack>

                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Biaya Layanan</Text>
                                        <Text {...baseStylePressedTextComponent}>Rp. 7.500</Text>
                                    </Stack>

                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                        marginTop='14px'
                                    >
                                        <Text fontFamily='Poppins-SemiBold' fontSize='13px'>TOTAL</Text>
                                        <Text {...baseStylePressedTextComponent}>Rp. {Number(data?.order?.total_price + 7500 + 923000).toLocaleString('id')}</Text>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </ScrollView>
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>
        </Flex>
    )
}

export default RefundScreen