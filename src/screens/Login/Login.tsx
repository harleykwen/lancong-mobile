import React, { useState } from 'react'
import { Box, Button, Center, FormControl, Icon, Input, Stack, Text } from 'native-base'
import { Alert, Image } from 'react-native'
import { LOGO_GREEN } from '../../assets'
import * as Unicons from "react-native-unicons"
import { loginApi } from '../../apis/auth'
import { useMutation } from 'react-query'
import { getModel } from 'react-native-device-info'
import { TextInput, Button as PaperButton } from 'react-native-paper'
import { View } from 'react-native'
import { saveAuthToken, saveUserData } from '../../apis/config'

interface ILogin {
    navigation: any
}

const Login = (props: ILogin) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        return await loginApi({ email, password, device_name: getModel() })
    }

    const login = useMutation(handleLogin, {
        onError: (error: any) => Alert.alert(error),
        onSuccess: async (response: any) => {
            console.log(response)
            await saveAuthToken(response?.tokenable?.token)
            await saveUserData(response?.user)
            navigation.replace('main')
        },
    })

    function handleClickSignUp() {
        navigation.push('register')
    }

    return (
        <Center height={'100%'} padding={'10px'} backgroundColor='white'>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
            <FormControl marginTop='72px'>
                <Stack space={5}>
                    <Stack>
                        <Input 
                            leftElement={<Icon 
                            as={Unicons.Envelope} 
                            color={'gray.400'} 
                            marginLeft='10px' />} 
                            variant={'outline'} 
                            p={2} 
                            placeholder={'Email'} 
                            value={email}
                            onChangeText={(e: any) => setEmail(e)}
                        />
                    </Stack>
                    <Stack>
                        <Input 
                            leftElement={<Icon 
                            as={Unicons.Lock} 
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
                            isDisabled={login.isLoading || !email || password.length < 6}
                            isLoading={login.isLoading}
                            onPress={() => login.mutate()}
                        >
                            Log In
                        </Button>
                    </Stack>
                    <Stack alignItems={'center'} direction={'row'} space={'10px'}>
                        <Box height={'2px'} width={'45%'} backgroundColor={'#c0c0c0'}></Box>
                        <Text color={'#c0c0c0'}>Or</Text>
                        <Box height={'2px'} width={'45%'} backgroundColor={'#c0c0c0'}></Box>
                    </Stack>
                    <Stack>
                        <Button 
                            onPress={handleClickSignUp} 
                            colorScheme={'yellow'}
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Center>
        // <View style={{ flex: 1, backgroundColor: 'white', padding: 10, justifyContent: 'center',  }}>
        //     <TextInput
        //         label='Email'
        //         left={<TextInput.Icon icon='email' />}
        //         mode='outlined'
        //     />
        //     <TextInput
        //         label='Password'
        //         secureTextEntry
        //         right={<TextInput.Icon icon='eye' />}
        //         left={<TextInput.Icon icon='lock' />}
        //         mode='outlined'
        //     />
        //     <PaperButton 
        //         mode="contained" 
        //         disabled={login.isLoading || !email || password.length < 6}
        //         loading={login.isLoading}
        //         onPress={() => login.mutate()}
        //     >
        //         Log in
        //     </PaperButton>
        //     <PaperButton 
        //         mode="contained" 
        //         onPress={handleClickSignUp}
        //     >
        //         Sign up
        //     </PaperButton>
        // </View>
    )
}

export default Login