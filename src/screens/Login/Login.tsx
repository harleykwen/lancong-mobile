import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LOGO_GREEN } from '../../assets'
import { loginApi } from '../../apis/auth'
import { useMutation } from 'react-query'
import { getModel } from 'react-native-device-info'
import { Image } from 'react-native'
import { saveAuthToken, saveUserData } from '../../apis/config'
import { 
    Alert,
    Button, 
    FormControl, 
    Heading, 
    HStack, 
    Icon, 
    Input, 
    Pressable, 
    Stack, 
    Text,
    VStack, 
} from 'native-base'

interface ILogin {
    navigation: any
}

interface IResponseLoginSuccess {
    user: {
        _id: string,
        name: string,
        email: string,
        address: string,
        phone: string,
        avatar: {
            name: string,
            url: string,
        }
    },
    tokenable: {
        token: string,
        expires_at: number
    }
}

const Login = (props: ILogin) => {
    const { navigation } = props

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const login: any = useMutation(async () => {
        return await loginApi({ email, password, device_name: getModel() })
    },
    {
        onSuccess: async (response: IResponseLoginSuccess) => {
            await saveAuthToken(response?.tokenable?.token)
            await saveUserData(response?.user)
            navigation.replace('main')
        },
    })

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
                        <Pressable onPress={() => navigation.push('register')}>
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
                {login?.isError &&
                    <Alert 
                        width='100%' 
                        variant='subtle' 
                        colorScheme='success' 
                        status='error'
                        marginTop='5px'
                    >
                        <VStack 
                            space={2} 
                            flexShrink={1} 
                            width='100%'
                        >
                            <HStack 
                                flexShrink={1} 
                                space={2} 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <HStack 
                                    space={2} 
                                    flexShrink={1} 
                                    alignItems='center'
                                >
                                    <Alert.Icon />
                                    <Text color='coolGray.800'>
                                        {login?.error}
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                }
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