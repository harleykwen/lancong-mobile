import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ROUTE_NAME } from '../../../router'
import { 
    Actionsheet, 
    Button, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'

interface ILeaveConfirmationBottomSheet {
    disclosure: any
}

const LeaveConfirmationBottomSheet: React.FC<ILeaveConfirmationBottomSheet> = (props: ILeaveConfirmationBottomSheet) => {
    const navigation: any = useNavigation()
    const { disclosure } = props

    function handleLeave() {
        const { routes } = navigation?.getState()
        const listTripRoute = routes?.find((x: any) => x?.name === ROUTE_NAME.TRIP_NAVIGATOR_LIST_STRIP)
        navigation?.navigate(ROUTE_NAME?.TRIP_NAVIGATOR_LIST_STRIP, { ...listTripRoute?.params })
    }

    return (
        <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <ScrollView width='100%'>
                    <Stack paddingTop='20px' space='20px'>
                        <Text 
                            textAlign='center' 
                            marginX='auto' 
                            fontSize='16px'
                        >Kamu yakin mau keluar dari halaman ini?</Text>
                        <Stack space='4px'>
                            <Button size='lancSmall' onPress={disclosure?.onClose}>Tetap Dihalama Ini</Button>
                            <Button 
                                size='lancSmall' 
                                variant='lancOutline' 
                                onPress={handleLeave}
                            >Cari Trip Lain</Button>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(LeaveConfirmationBottomSheet)