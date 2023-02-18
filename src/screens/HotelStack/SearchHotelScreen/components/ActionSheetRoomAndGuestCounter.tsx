import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { 
    Icon, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface IActionSheetRoomAndGuestCounter {
    label: string
    value: number
    max: number
    min: number
    onDecrease: () => void
    onIncrease: () => void
}

const ActionSheetRoomAndGuestCounter = (props: IActionSheetRoomAndGuestCounter) => {
    const {
        label,
        value,
        max,
        min,
        onDecrease,
        onIncrease,
    } = props

    return (
        <Stack 
            alignItems='center' 
            direction='row' 
            space='16px'
            width='full'
        >
            <Text fontFamily='Poppins-Regular' fontSize='14px'>{label}</Text>
            <Stack 
                direction='row' 
                space='24px' 
                alignItems='center'
                marginLeft='auto'
            >
                <Pressable onPress={onDecrease}>
                    <Icon 
                        as={SimpleLineIcons} 
                        name='minus' 
                        size='xl' 
                        color={value <= min ? 'gray.400' : 'xprimary.50' }
                    />
                </Pressable>
                <Text 
                    fontFamily='Poppins-Bold' 
                    fontSize='16px'
                    width='25px'
                    textAlign='center'
                >{value}</Text>
                <Pressable onPress={onIncrease}>
                    <Icon 
                        as={SimpleLineIcons} 
                        name='plus' 
                        size='xl' 
                        color={value >= max ? 'gray.400' : 'xprimary.50' } 
                    />
                </Pressable>
            </Stack>
        </Stack>
    )
}

export default ActionSheetRoomAndGuestCounter