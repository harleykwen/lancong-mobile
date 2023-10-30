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

    console.log(data)

    return (
        <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <Text fontFamily='Poppins-SemiBold' fontSize='15px'>Pilih Metode Pembayaran</Text>
                <ScrollView marginTop='16px'>
                    <Stack space='0px'>
                        {data?.map((va: any, index: number) => {
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
                                        padding='12px'
                                        width='100%'
                                        borderBottomWidth='1px'
                                        borderBottomColor='gray.300'
                                        backgroundColor={paymentMethodCicilan?.code === va?.code ? 'lancPrimaryLight' : 'white'}
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
                                                fontFamily='Poppins-Medium'
                                                color={paymentMethodCicilan?.code === va?.code ? 'white' : 'black'}
                                            >{va.name}</Text>
                                        </Stack>
                                        <Icon 
                                            as={MaterialIcons} 
                                            name='chevron-right' 
                                            marginLeft='auto'
                                            color={paymentMethodCicilan?.code === va?.code ? 'white' : 'gray.600'} 
                                            size='md' 
                                        />
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