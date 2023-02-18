import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native'
import ActionSheetRoomAndGuest, { IFormActionSheetRoomAndGuest } from './components/ActionSheetRoomAndGuest'
import { add, format, startOfToday } from 'date-fns'
import { 
    Actionsheet, 
    Button, 
    Flex, 
    Icon, 
    Image, 
    Input, 
    Pressable, 
    ScrollView, 
    Select, 
    Stack, 
    Text 
} from 'native-base'

export interface IFormSearchHotel {
    location: string
    checkIn: Date
    checkOut: Date
    room: number
    adult: number
    children: number
}

const SearchHotelScreen = () => {
    const [formSearchHotel, setFormSearchHotel] = useState<IFormSearchHotel>({
        location: 'Jakarta',
        checkIn: startOfToday(),
        checkOut: add(startOfToday(), { days: 1 }),
        room: 1,
        adult: 1,
        children: 0,
        
    })
    const [destinationActionSheet, setDestinationActionSheet] = useState<boolean>(false)
    const [roomAndGuestActionSheet, setRoomAndGuestActionSheet] = useState<boolean>(false)

    const baseStylePressedComponent: object = {
        height:'50px',
        backgroundColor:'gray.200',
        paddingX:'16px',
        paddingY:'8px',
        flexDirection:'row',
        alignItems:'center',
        _pressed:{
            backgroundColor: 'gray.300'
        }
    }

    const baseStylePressedTextComponent: object = {
        fontFamily: 'Poppins-SemiBold',
        marginLeft: '8px',
        fontSize: '16px',
        marginTop: '2px',
    }

    function handleShowRoomAndGuestActionSheet(): void {
        return setRoomAndGuestActionSheet(true)
    }

    function handleHideRoomAndGuestActionSheet(): void {
        return setRoomAndGuestActionSheet(false)
    }

    function handleSubmitRoomAndGuestActionSheet(props: IFormActionSheetRoomAndGuest): void {
        const { room, adult, children } = props
        return setFormSearchHotel((prev: IFormSearchHotel) => {
            return { ...prev, room, adult, children }
        })
    }

    return (
        <Flex flex={1}>
            <Image 
                source={{
                    uri: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                }} 
                alt="Hotel Room" 
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height / 4}
            />
            <Stack 
                flex={1} 
                backgroundColor='white' 
                borderTopLeftRadius='16px'
                borderTopRightRadius='16px'
                marginTop='-16px'
                space='8px'
                padding='16px'
            >
                {/* search destination */}
                <Pressable 
                    {...baseStylePressedComponent}
                    marginTop='16px'
                    borderRadius='8px'
                    onPress={() => setDestinationActionSheet(true)}
                >
                    <Icon as={MaterialIcons} name='search' color='gray.400' size='lg' />
                    <Text {...baseStylePressedTextComponent}>Jakarta</Text>
                    <Icon 
                        as={MaterialIcons} 
                        name='my-location' 
                        color='xprimary.50' 
                        size='md' 
                        marginLeft='auto'
                    />
                </Pressable>

                {/* check-in check-out */}
                <Pressable {...baseStylePressedComponent}  borderRadius='8px'>
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='calendar-range' 
                        color='gray.400' 
                        size='lg' 
                    />
                    <Text {...baseStylePressedTextComponent}>
                        {format(formSearchHotel.checkIn, 'dd MMM yyyy')}
                        {" - "}
                        {format(formSearchHotel.checkOut, 'dd MMM yyyy')}
                    </Text>
                </Pressable>

                <Stack direction='row' width='full' justifyContent='space-evenly'>
                    {/* room */}
                    <Pressable 
                        {...baseStylePressedComponent} 
                        onPress={handleShowRoomAndGuestActionSheet}
                        flex={1}
                        justifyContent='center'
                        borderTopLeftRadius='8px'
                        borderBottomLeftRadius='8px'
                    >
                        <Icon 
                            as={MaterialCommunityIcons} 
                            name='door-closed' 
                            color='gray.400' 
                            size='lg' 
                        />
                        <Text {...baseStylePressedTextComponent}>{formSearchHotel.room}</Text>
                    </Pressable>

                    {/* guest */}
                    <Pressable 
                        {...baseStylePressedComponent} 
                        onPress={handleShowRoomAndGuestActionSheet}
                        flex={1}
                        justifyContent='center'
                    >
                        <Icon 
                            as={MaterialIcons} 
                            name='group' 
                            color='gray.400' 
                            size='lg' 
                        />
                        <Text {...baseStylePressedTextComponent}>{formSearchHotel.adult}</Text>
                    </Pressable>

                    {/* children */}
                    <Pressable 
                        {...baseStylePressedComponent}
                        onPress={handleShowRoomAndGuestActionSheet}
                        flex={1}
                        justifyContent='center'
                        borderTopRightRadius='8px'
                        borderBottomRightRadius='8px'
                    >
                        <Icon 
                            as={MaterialIcons} 
                            name='group' 
                            color='gray.400' 
                            size='lg' 
                        />
                        <Text {...baseStylePressedTextComponent}>{formSearchHotel.children}</Text>
                    </Pressable>
                </Stack>

                {/* button search hotel */}
                <Button 
                    height='50px'
                    marginTop='16px'
                    borderRadius='8px'
                    backgroundColor='xprimary.50'
                    _pressed={{
                        backgroundColor: 'xprimary.40'
                    }}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='16px'
                        color='white'
                    >Cari</Text>
                </Button>
            </Stack>

            {/* search location action sheet */}
            <Actionsheet 
                isOpen={destinationActionSheet} 
                onClose={() => setDestinationActionSheet(false)}
            >
                <Actionsheet.Content alignItems='flex-start' padding='0px'>
                    <Flex padding='16px' width='100%' height={Dimensions.get('window').height}>
                        <Stack direction='column' space='20px'>
                            <Stack direction='row' alignItems='center' space='10px'>
                                <Icon as={MaterialIcons} name='close' size='xl' color='black' onPress={() => setDestinationActionSheet(false)} />
                                <Text marginTop='1px' fontSize='18px' fontFamily='Poppins-SemiBold'>Mau nginep dimana nih?</Text>
                            </Stack>
                            <Input 
                                borderWidth='0px' 
                                backgroundColor='gray.200' 
                                rounded='full' 
                                fontSize='12px'
                                fontFamily='Poppins-Regular'
                                InputLeftElement={<Icon as={MaterialIcons} name='search' color='gray.400' size='lg' marginLeft='0.5rem' />}
                                InputRightElement={
                                    <Pressable>
                                        <Icon as={Ionicons} name='close-circle' color='gray.400' size='md' marginRight='0.65rem' />
                                    </Pressable>
                                }
                            />
                            {/* <Flex height={Dimensions.get('window').height - 301}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {[...Array(100)].map((_, index) => {
                                        return <Text>halo {index}</Text>
                                    })}
                                </ScrollView>
                            </Flex> */}
                        </Stack>
                    </Flex>
                </Actionsheet.Content>
            </Actionsheet>

            {/* room and guest action sheet */}
            <ActionSheetRoomAndGuest 
                isOpen={roomAndGuestActionSheet} 
                onClose={handleHideRoomAndGuestActionSheet} 
                formSearchHotel={formSearchHotel}
                onSubmit={handleSubmitRoomAndGuestActionSheet}
            />
        </Flex>
    )
}

export default SearchHotelScreen