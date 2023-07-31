import React, { memo } from 'react'
import { 
    Actionsheet, 
    Button, 
    Stack, 
    ScrollView, 
    Text,
    Input, 
} from 'native-base'

interface ISubmitVerification {
    isOpen: boolean
    onClose: any
}

const SubmitVerification: React.FC<ISubmitVerification> = (props: ISubmitVerification) => {
    const { isOpen, onClose } = props

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <ScrollView>
                    <Stack space='8px'>
                        <Text fontFamily='Poppins-SemiBold' fontSize='14px'>Verifikasi Akun Anda</Text>
                        <Text fontFamily='Poppins-Regular' fontSize='12px'>Mohon masukan kode verifikasi yang telah dikirimkan ke ********1009</Text>
                        <Input size='lancSmall' placeholder='kode verifikasi' marginY='16px' />
                        <Stack space='8px'>
                            <Button size='lancSmall' variant='lancOutline'>Kirim Ulang Kode Verifikasi</Button>
                            <Button size='lancSmall'>Verifikasi</Button>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(SubmitVerification)