import React, { memo } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { 
    Actionsheet, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack,
    Text,
} from 'native-base'
import { 
    IC_CHECK_CIRCLE,
    LOGO_BCA, 
    LOGO_BJB, 
    LOGO_BNI, 
    LOGO_BRI, 
    LOGO_BSI, 
    LOGO_CIMB, 
    LOGO_MANDIRI, 
    LOGO_PERMATA, 
} from '../../../../assets'

interface IActionSheetPaymentMethod {
    disclosure: any
    data: any
    paymentMethodCicilan: any
    setPaymentMethodCicilan: any
}

const ActionSheetPaymentMethod: React.FC<IActionSheetPaymentMethod> = (props: IActionSheetPaymentMethod) => {
    const { 
        disclosure, 
        data, 
        paymentMethodCicilan,
        setPaymentMethodCicilan,
    } = props

    function generateIconBank(data: any) {
        switch(data?.code) {
            case 'BCA':
                return LOGO_BCA
            case 'BNI':
                return LOGO_BNI
            case 'MANDIRI':
                return LOGO_MANDIRI
            case 'PERMATA':
                return LOGO_PERMATA
            case 'BRI':
                return LOGO_BRI
            case 'CIMB':
                return LOGO_CIMB
            case 'BJB':
                return LOGO_BJB
            case 'BSI':
                return LOGO_BSI
        }
    }

    return (
        <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <Text fontFamily='Poppins-SemiBold' fontSize='14px'>Pilih Metode Pembayaran</Text>
                <ScrollView marginTop='16px'>
                    <Stack space='0px'>
                        {data?.map((va: any, index: number) => {
                            if (!va?.is_activated) return
                            return (
                                <Pressable 
                                    key={index} 
                                    onPress={() => {
                                        setPaymentMethodCicilan(va)
                                        disclosure?.onClose()
                                    }}
                                >
                                    <Stack
                                        direction='row' 
                                        alignItems='center'
                                        paddingY='16px'
                                        width='100%'
                                        borderBottomWidth='1px'
                                        borderBottomColor='gray.300'
                                        backgroundColor='white'
                                    >
                                        <Stack 
                                            direction='row' 
                                            alignItems='center' 
                                            space='10px'
                                        >
                                            <Image 
                                                source={generateIconBank(va)} 
                                                width='50px' 
                                                height='35.71px' 
                                                alt={va?.name}
                                            />
                                            <Text 
                                                fontSize='12px' 
                                                fontFamily='Poppins-Regular'
                                                color='black'
                                            >{va.name}</Text>
                                        </Stack>
                                        {
                                            paymentMethodCicilan?.code === va?.code
                                                ?   <Image
                                                        alt='IC_CHECK_CIRCLE'
                                                        source={IC_CHECK_CIRCLE}
                                                        width='18px'
                                                        height='18px'
                                                        tintColor='#38a169'
                                                        marginLeft='auto'
                                                    />
                                                :   <Icon 
                                                        as={MaterialIcons} 
                                                        name='chevron-right' 
                                                        marginLeft='auto'
                                                        color='black' 
                                                        size='md' 
                                                    />
                                        }
                                    </Stack>
                                </Pressable>
                            )
                        })}
                    </Stack>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetPaymentMethod)