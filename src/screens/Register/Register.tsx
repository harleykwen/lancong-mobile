import React from 'react'
import { Button, Center, FormControl, Input, Stack, Text, Icon } from 'native-base'
import { Image } from 'react-native'
import { LOGO_GREEN } from '../../assets'
import * as Unicons from "react-native-unicons"

const Register = () => {
    return (
        <Center height={'100%'} padding={'10px'} backgroundColor='white'>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
            <FormControl marginTop='72px'>
                <Stack space={5}>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.User} color={'gray.400'} marginLeft='10px' />} type={'text'} variant={'outline'} p={2} placeholder={'Nama Lengkap'} />
                    </Stack>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.Envelope} color={'gray.400'} marginLeft='10px' />} type={'text'} variant={'outline'} p={2} placeholder={'Email'} />
                    </Stack>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.Phone} color={'gray.400'} marginLeft='10px' />} keyboardType={'numeric'} type={'text'} variant={'outline'} p={2} placeholder={'No. Telpon'} />
                    </Stack>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.Lock} color={'gray.400'} marginLeft='10px' />} type={'password'} variant={'outline'} p={2} placeholder={'Password'} />
                    </Stack>
                    <Stack>
                        <Button colorScheme={'success'}>Sign Up</Button>
                    </Stack>
                    <Stack>
                        <Text textAlign={'center'}>Dengan mendaftar, saya menyetujui <Text color={'#038103'} fontWeight={'bold'}>Syarat dan Ketentuan</Text> serta <Text color={'#038103'} fontWeight={'bold'}>Kebijakan Privasi</Text></Text>
                    </Stack>
                </Stack>
            </FormControl>
        </Center>
    )
}

export default Register