import React from 'react'
import { Box, Button, Center, FormControl, Icon, Input, Stack, Text } from 'native-base'
import { Image } from 'react-native'
import { LOGO_GREEN } from '../../assets'
import * as Unicons from "react-native-unicons"

interface ILogin {
    navigation: any
}

const Login = (props: ILogin) => {
    const { navigation } = props

    function handleClickSignUp() {
        navigation.push('register')
    }

    function handleClickLogin() {
        navigation.replace('main')
    }

    return (
        <Center height={'100%'} padding={'10px'} backgroundColor='white'>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
            <FormControl marginTop='72px'>
                <Stack space={5}>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.Envelope} color={'gray.400'} marginLeft='10px' />} variant={'outline'} p={2} placeholder={'Email'} />
                    </Stack>
                    <Stack>
                        <Input leftElement={<Icon as={Unicons.Lock} color={'gray.400'} marginLeft='10px' />} type={'password'} variant={'outline'} p={2} placeholder={'Password'} />
                    </Stack>
                    <Stack>
                        <Button colorScheme={'success'} onPress={handleClickLogin}>Log In</Button>
                    </Stack>
                    <Stack alignItems={'center'} direction={'row'} space={'10px'}>
                        <Box height={'2px'} width={'45%'} backgroundColor={'#c0c0c0'}></Box>
                        <Text color={'#c0c0c0'}>Or</Text>
                        <Box height={'2px'} width={'45%'} backgroundColor={'#c0c0c0'}></Box>
                    </Stack>
                    <Stack>
                        <Button onPress={handleClickSignUp} colorScheme={'yellow'}>Sign Up</Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Center>
    )
}

export default Login