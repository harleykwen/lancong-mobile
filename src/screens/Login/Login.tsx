import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LOGO_GREEN } from '../../assets'
import { loginApi } from '../../apis/auth'
import { useMutation } from 'react-query'
import { getModel } from 'react-native-device-info'
import { Alert, Image } from 'react-native'
import { saveAuthToken, saveUserData } from '../../apis/config'
import { 
    Button, 
    FormControl, 
    Heading, 
    Icon, 
    Input, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface ILogin {
    navigation: any
}

const Login = (props: ILogin) => {
    const { navigation } = props

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

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
        <Stack 
            flex='1'
            padding='10px' 
            backgroundColor='white'
            justifyContent='center'
            space='50px'
        >
            <Stack 
                width='100%' 
                direction='row' 
                justifyContent='space-between' 
                alignItems='center'
            >
                <Stack>
                    <Heading>Masuk</Heading>
                    <Stack direction='row' space='5px'>
                        <Text color='gray.400'>Belum punya akun?</Text>
                        <Pressable onPress={handleClickSignUp}>
                            <Text color='xprimary.40' fontWeight='semibold'>Yuk daftar!</Text>
                        </Pressable>
                    </Stack>
                </Stack>
                <Image source={LOGO_GREEN} style={{ width: 35, height: 45.6 }} />
            </Stack>

            <Stack width='100%' space='10px'>
                <FormControl>
                    <FormControl.Label color='gray.400'>Email</FormControl.Label>
                    <Input 
                        leftElement={
                            <Icon 
                                as={MaterialIcons} 
                                name='mail-outline'
                                color='gray.400' 
                                marginLeft='10px' 
                                size='6'
                            />
                        } 
                        placeholder='Email' 
                        value={email}
                        onChangeText={(e: any) => setEmail(e)}
                        
                        p={2} 
                        borderColor='gray.400'
                        _focus={{
                            backgroundColor: 'white',
                            borderColor: 'gray.400',
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label color='gray.400'>Kata Sandi</FormControl.Label>
                    <Input 
                        leftElement={
                            <Icon 
                                as={MaterialIcons} 
                                name='lock-outline'
                                color='gray.400' 
                                marginLeft='10px' 
                                size='6'
                            />
                        } 
                        rightElement={
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    marginRight='10px'
                                    size='6'
                                    color='gray.400'
                                />
                            </Pressable>
                        }
                        type='password' 
                        variant='outline' 
                        placeholder='Password'
                        value={password}
                        onChangeText={(e: any) => setPassword(e)}
                        secureTextEntry={!showPassword}
                        
                        p={2} 
                        borderColor='gray.400'
                        _focus={{
                            backgroundColor: 'white',
                            borderColor: 'gray.400',
                        }}
                    />
                </FormControl>
            </Stack>
            
            <Stack width='100%' space='10px'>
                <Button 
                    colorScheme={'success'} 
                    isDisabled={login.isLoading || !email || password.length < 6}
                    isLoading={login.isLoading}
                    onPress={() => login.mutate()}
                    width='full'
                >
                    Masuk
                </Button>
                <Button 
                    colorScheme='white'
                    width='full'
                    variant='ghost'
                    color='gray.400'
                    leftIcon={<Icon
                        as={FontAwesome}
                        name='google'
                        color='gray.400'
                    />}
                >
                    Masuk dengan Google
                </Button>
            </Stack>
        </Stack>
    )
}

export default Login