import React, { memo } from 'react'
import { 
    Actionsheet, 
    Button, 
    Stack, 
    ScrollView, 
    Text, 
} from 'native-base'

interface IRequestVerification {
    isOpen: boolean
    onClose: any
    onSubmit: any
}

const RequestVerification: React.FC<IRequestVerification> = (props: IRequestVerification) => {
    const { 
        isOpen, 
        onClose, 
        onSubmit, 
    } = props

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <ScrollView>
                    <Stack space='8px'>
                        <Text fontFamily='Poppins-SemiBold' fontSize='14px'>Verifikasi Diperlukan</Text>
                        <Text fontFamily='Poppins-Regular' fontSize='12px'>Demi keamanan akun anda, mohon lakukan verifikasi akun terlebih dahulu. Silahkan pilih di mana anda ingin menerima kode veirifikasi:</Text>
                        <Stack>
                            <Text fontFamily='Poppins-SemiBold' fontSize='12px'>Mobile Number</Text>
                            <Text fontFamily='Poppins-Regular' fontSize='12px'>********1009</Text>
                        </Stack>
                        <Stack space='8px'>
                            <Button size='lancSmall' variant='lancOutline'>Batal</Button>
                            <Button 
                                size='lancSmall' 
                                onPress={() => {
                                    onClose()
                                    onSubmit()
                                }
                            }>Kirim</Button>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(RequestVerification)