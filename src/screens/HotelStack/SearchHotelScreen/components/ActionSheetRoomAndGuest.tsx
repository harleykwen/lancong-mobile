import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ActionSheetRoomAndGuestCounter from './ActionSheetRoomAndGuestCounter'
import { IFormSearchHotel } from '../SearchHotelScreen'
import { 
    Actionsheet, 
    Button, 
    Icon, 
    Stack, 
    Text, 
} from 'native-base'

interface IActionSheetRoomAndGuest {
    isOpen: boolean
    onClose: () => void
    formSearchHotel: IFormSearchHotel
    onSubmit: (props: IFormActionSheetRoomAndGuest) => void
}

export interface IFormActionSheetRoomAndGuest {
    room: number
    adult: number
    children: number
}

const ActionSheetRoomAndGuest = (props: IActionSheetRoomAndGuest) => {
    const { 
        isOpen, 
        onClose, 
        formSearchHotel, 
        onSubmit,
    } = props

    const [formActionSheetRoomAndGuest, setFormActionSheetRoomAndGuest] = useState<IFormActionSheetRoomAndGuest>({
        room: formSearchHotel.room,
        adult: formSearchHotel.adult,
        children: formSearchHotel.children,
    })

    useEffect(() => {
        if (!isOpen) return
        return setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
            return {
                ...prev,
                room: formSearchHotel.room,
                adult: formSearchHotel.adult,
                children: formSearchHotel.children,
            }
        })
    }, [isOpen])

    return (
        <Actionsheet 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <Actionsheet.Content alignItems='flex-start' padding='0px'>
                <Stack 
                    direction='column' 
                    space='16px'
                    padding='16px' 
                    width='100%' 
                    // height={Dimensions.get('window').height}
                    alignItems='flex-start'
                >
                    <Stack 
                        direction='row' 
                        alignItems='center' 
                        space='10px'
                        marginBottom='16px'
                    >
                        <Icon 
                            as={MaterialIcons} 
                            name='close' 
                            size='xl' 
                            color='black' 
                            onPress={onClose} 
                        />
                        <Text 
                            marginTop='1px' 
                            fontSize='18px' 
                            fontFamily='Poppins-SemiBold'
                        >Kamar dan Tamu</Text>
                    </Stack>
                    
                    {/* room counter */}
                    <ActionSheetRoomAndGuestCounter
                        label='Kamar'
                        value={formActionSheetRoomAndGuest.room}
                        max={8}
                        min={1}
                        onDecrease={() => {
                            if (formActionSheetRoomAndGuest.room === 1) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    room: Number(prev.room - 1)
                                }
                            })
                        }}
                        onIncrease={() => {
                            if (formActionSheetRoomAndGuest.room === 8) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    room: Number(prev.room + 1),
                                    adult: prev.adult <= prev.room ? Number(prev.room + 1) : prev.adult,
                                }
                            })
                        }}
                    />

                    {/* adult counter */}
                    <ActionSheetRoomAndGuestCounter
                        label='Dewasa'
                        value={formActionSheetRoomAndGuest.adult}
                        max={32}
                        min={1}
                        onDecrease={() => {
                            if (formActionSheetRoomAndGuest.adult === 1) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    adult: Number(prev.adult - 1)
                                }
                            })
                        }}
                        onIncrease={() => {
                            if (formActionSheetRoomAndGuest.adult === 32) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    adult: Number(prev.adult + 1),
                                }
                            })
                        }}
                    />

                    {/* children counter */}
                    <ActionSheetRoomAndGuestCounter
                        label='Anak (dibawah 17 tahun)'
                        value={formActionSheetRoomAndGuest.children}
                        max={10}
                        min={0}
                        onDecrease={() => {
                            if (formActionSheetRoomAndGuest.children === 0) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    children: Number(prev.children - 1)
                                }
                            })
                        }}
                        onIncrease={() => {
                            if (formActionSheetRoomAndGuest.children === 10) return
                            setFormActionSheetRoomAndGuest((prev: IFormActionSheetRoomAndGuest) => {
                                return {
                                    ...prev,
                                    children: Number(prev.children + 1),
                                }
                            })
                        }}
                    />

                    <Button 
                        height='50px'
                        marginTop='16px'
                        bottom='0'
                        width='full'
                        borderRadius='8px'
                        backgroundColor='xprimary.50'
                        onPress={() => {
                            onSubmit(formActionSheetRoomAndGuest)
                            onClose()
                        }}
                        _pressed={{
                            backgroundColor: 'xprimary.40'
                        }}
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='16px'
                            color='white'
                        >Selesai</Text>
                    </Button>
                </Stack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default ActionSheetRoomAndGuest