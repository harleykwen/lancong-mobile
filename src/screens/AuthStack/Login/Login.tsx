import React, { useState } from 'react'
import { ROUTE_NAME } from '../../../router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { loginApi } from '../../../apis/auth'
import { ASYNC_STORAGE_NAME, asyncStorageSaveitem } from '../../../asyncStorage'
import { 
    IC_EMAIL, 
    IC_ERROR, 
    IC_GOOGLE, 
    IC_LOCK, 
    IC_VISIBILITY_OFF, 
    IC_VISIBILITY_ON, 
} from '../../../assets'
import {
    Button,
    Stack,
    FormControl,
    Input,
    Image,
    useColorModeValue,
    Pressable,
    Text,
    Divider,
    Alert,
} from 'native-base'
import { ButtonLanguage } from '../../../components'

interface ILogin {
    navigation?: any
}

const Login: React.FC<ILogin> = (props: ILogin) => {
    const { navigation } = props

    const { t } = useTranslation()

    const defaultValidation: any = {
        email: false,
        password: false,
    }

    const [email, setEmail] = useState<string>('test6@gmail.co')
    const [password, setPassword] = useState<string>('tes123')

    const [securePassword, setSecurePassword] = useState<boolean>(true)

    const [isFormValid, setIsFormValid] = useState<any>(defaultValidation)

    const login = useMutation(loginApi, {
        onSuccess: (resp: any) => {
            asyncStorageSaveitem(ASYNC_STORAGE_NAME.AUTH_TOKEN, resp?.data?.tokenable?.token)
            asyncStorageSaveitem(ASYNC_STORAGE_NAME.AUTH_SECRET, resp?.data?.tokenable?.secret)
            navigation?.replace(ROUTE_NAME.MAIN_NAVIGATOR, { screen: ROUTE_NAME.MAIN_NAVIGATOR_HOME})
        }
    })

    function revalidateForm(name: string) {
        setIsFormValid((prev: any) => {
            return {
                ...prev,
                [name]: false
            }
        })
    }

    function handleClickLogin() {
        login?.reset()
        let validation: any = {
            email: email ? false : true,
            password: password ? false : true
        }
        setIsFormValid((prev: any) => {
            return {
                ...prev,
                ...validation,
            }
        })

        if (email && password) {
            login?.mutate({
                email,
                password,
                device_name: 'iPhone 14 Pro Max'
            })
        }
    }

    return (
        <Stack 
            flex={1} 
            backgroundColor={useColorModeValue('lancBackgroundLight', 'lancBackgroundDark')} 
            padding='24px'
            space='16px'
        >
            <Stack direction='row' justifyContent='space-between'>
                <Text fontFamily='Poppins-SemiBold' fontSize='24px'>{t('common:signin_title')}</Text>
                <Stack space='8px' direction='row'>
                    <ButtonLanguage />
                </Stack>
            </Stack>
            <FormControl marginTop='16px' isInvalid={isFormValid?.email}>
                <Stack>
                    <FormControl.Label>{t('common:signin_input_email_label')}</FormControl.Label>
                    <Input 
                        value={email} 
                        placeholder={`${t('common:signin_input_email_placeholder')}`}
                        onChangeText={(e) => {
                            setEmail(e)
                            revalidateForm('email')
                        }}
                        InputLeftElement={
                            <Image 
                                alt='IC_EMAIL'
                                source={IC_EMAIL} 
                                width='24px' 
                                height='24px' 
                                marginLeft='24px' 
                                marginRight='-8px'
                                tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                            />
                        }
                        isDisabled={login?.isLoading}
                    />
                    <FormControl.ErrorMessage >
                        {t('common:signin_input_email_error_message')}
                    </FormControl.ErrorMessage >
                </Stack>
            </FormControl>
            <FormControl isInvalid={isFormValid?.password}>
                <Stack>
                    <FormControl.Label>{t('common:signin_input_password_label')}</FormControl.Label>
                    <Input 
                        value={password} 
                        placeholder={`${t('common:signin_input_password_placeholder')}`}
                        type='password' 
                        secureTextEntry={securePassword}
                        onChangeText={(e) => {
                            setPassword(e)
                            revalidateForm('password')
                        }}
                        InputLeftElement={
                            <Image 
                                alt='IC_LOCK'
                                source={IC_LOCK} 
                                width='24px' 
                                height='24px' 
                                marginLeft='24px' 
                                marginRight='-8px'
                                tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                            />
                        }
                        InputRightElement={
                            <Stack>
                                {
                                    securePassword &&
                                    <Pressable onPress={() => setSecurePassword(!securePassword)}>
                                        <Image
                                            alt='IC_VISIBILITY_ON'
                                            source={IC_VISIBILITY_ON}
                                            width='24px'
                                            height='24px'
                                            marginRight='24px'
                                            marginLeft='-8px'
                                            tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                                        />
                                    </Pressable>
                                }
                                {
                                    !securePassword &&
                                    <Pressable onPress={() => setSecurePassword(!securePassword)}>
                                        <Image
                                            alt='IC_VISIBILITY_OFF'
                                            source={IC_VISIBILITY_OFF}
                                            width='24px'
                                            height='24px'
                                            marginRight='24px'
                                            marginLeft='-8px'
                                            tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                                        />
                                    </Pressable>
                                }
                            </Stack>
                        }
                        isDisabled={login?.isLoading}
                    />
                    <FormControl.ErrorMessage >
                        {t('common:signin_input_password_error_message')}
                    </FormControl.ErrorMessage >
                </Stack>
            </FormControl>

            <Alert 
                display={login?.isError ? 'flex' : 'none'} 
                alignItems='flex-start' 
                marginTop='16px' 
                variant='lancError'
            >
                <Stack direction='row' alignItems='center' space='8px'>
                    <Image
                        alt='IC_ERROR'
                        source={IC_ERROR}
                        width='24px'
                        height='24px'
                        tintColor={useColorModeValue('lancOnErrorContainerLight', 'lancOnErrorContainerDark')}
                    />
                    <Text 
                        color={useColorModeValue('lancOnErrorContainerLight', 'lancOnErrorContainerDark')}
                        fontFamily='Poppins-SemiBold'
                    >{`${login?.error}`}</Text>
                </Stack>
            </Alert>

            <Button 
                marginTop='16px' 
                onPress={handleClickLogin} 
                isLoading={login?.isLoading}
            >
                {t('common:singin_button_signin')}
            </Button>
            <Button 
                variant='lancText' 
                onPress={() => navigation?.navigate(ROUTE_NAME?.AUTH_NAVIGATOR_SIGN_UP)}
                isDisabled={login?.isLoading}
            >
                {t('common:signin_button_register')}
            </Button>

            <Stack 
                direction='row' 
                space='8px' 
                alignItems='center' 
                marginTop='16px'
            >
                <Divider />
                <Text 
                    fontSize='12px'
                    color={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                >{t('common:signin_divider_text')}</Text>
                <Divider />
            </Stack>

            <Button 
                marginTop='16px' 
                colorScheme='lancNeutral' 
                variant='lancGoogle'
                shadow='1'
                leftIcon={
                    <Image 
                        alt='IC_GOOGLE'
                        source={IC_GOOGLE} 
                        width='24px' 
                        height='24px' 
                        marginRight='16px'
                    />
                }
                isDisabled={login?.isLoading}
            >
                {t('common:signin_button_google')}
            </Button>
        </Stack>
    )
}

export default Login