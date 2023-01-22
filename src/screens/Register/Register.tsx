import React, { useState } from 'react'
import { Button, Center, FormControl, Input, Stack, Text, Icon } from 'native-base'
import { Image, Alert } from 'react-native'
import { LOGO_GREEN } from '../../assets'
import * as Unicons from "react-native-unicons"
import { requestOtpApi } from '../../apis/auth'
import { useMutation } from 'react-query'

interface IRegister {
    navigation: any
}

const Register = (props: IRegister) => {
    const { navigation } = props

    const [fullName, setFullName] = useState('harleykwen')
    const [email, setEmail] = useState('test2@gmail.com')
    const [phoneNumber, setPhoneNumber] = useState('081262480428')
    const [password, setPassword] = useState('tes123')

    async function handleRequestOtp() {
        return await requestOtpApi({ email })
    }

    const otp = useMutation(handleRequestOtp, {
        onSuccess: (data: any) => {
            navigation.push('otp', {
                fullName,
                email,
                phoneNumber,
                password,
                requestOtp: data,
            })
        },
        onError: (error: any) => Alert.alert(error)
    })

    function handleSignUp() {
        otp.mutate()
    }

    function handleDisableButton() {
        return !fullName || !email || !phoneNumber || !password || password.length < 6 || fullName.length < 3
    }

    return (
        <Center height={'100%'} padding={'10px'} backgroundColor='white'>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
            <FormControl marginTop='72px'>
                <Stack space={5}>
                    <Stack>
                        <Input 
                            leftElement={<Icon as={Unicons.User} 
                            color={'gray.400'} 
                            marginLeft='10px' />} 
                            type={'text'} 
                            variant={'outline'} 
                            p={2} 
                            placeholder={'Nama Lengkap'} 
                            value={fullName}
                            onChangeText={(e: any) => setFullName(e)}
                        />
                    </Stack>
                    <Stack>
                        <Input 
                            leftElement={<Icon as={Unicons.Envelope} 
                            color={'gray.400'} 
                            marginLeft='10px' />} 
                            type={'text'} 
                            variant={'outline'} 
                            p={2} 
                            placeholder={'Email'} 
                            value={email}
                            onChangeText={(e: any) => setEmail(e)}
                        />
                    </Stack>
                    <Stack>
                        <Input 
                            leftElement={<Icon as={Unicons.Phone} 
                            color={'gray.400'} 
                            marginLeft='10px' />} 
                            keyboardType={'numeric'} 
                            type={'text'} 
                            variant={'outline'} 
                            p={2} 
                            placeholder={'No. Telpon'} 
                            value={phoneNumber}
                            onChangeText={(e: any) => setPhoneNumber(e)}
                        />
                    </Stack>
                    <Stack>
                        <Input 
                            leftElement={<Icon as={Unicons.Lock} 
                            color={'gray.400'} 
                            marginLeft='10px' />} 
                            type={'password'} 
                            variant={'outline'} 
                            p={2} 
                            placeholder={'Password'} 
                            value={password}
                            onChangeText={(e: any) => setPassword(e)}
                        />
                    </Stack>
                    <Stack>
                        <Button 
                            colorScheme={'success'}
                            onPress={handleSignUp}
                            isLoading={otp.isLoading} 
                            isDisabled={handleDisableButton()}
                        >Sign Up</Button>
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