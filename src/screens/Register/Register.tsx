import React, { useState } from 'react'
import { ROUTE_NAME } from '../../router'
import { useTranslation } from 'react-i18next'
import { ButtonLanguage } from '../../components'
import { useMutation } from 'react-query'
import { requestOtpApi } from '../../apis/register'
import { 
    IC_EMAIL, 
    IC_ERROR, 
    IC_HOME_PIN, 
    IC_LOCK, 
    IC_PHONE, 
    IC_USER, 
    IC_VISIBILITY_OFF, 
    IC_VISIBILITY_ON,
} from '../../assets'
import { 
    Button,
    Stack,
    FormControl,
    Input,
    ScrollView,
    Checkbox,
    Text,
    useColorModeValue,
    Image,
    Pressable,
    Alert, 
} from 'native-base'

interface IRegister {
    navigation?: any
}

const Register: React.FC<IRegister> = (props: IRegister) => {
    const { navigation } = props

    const { t } = useTranslation()

    const defaultValidation: any = {
        name: false,
        email: false,
        phone: false,
        address: false,
        password: false,
        confirmPassword: false,
        confirmPasswordNotMatch: false,
        tnc: false,
    }

    const [isFormValid, setIsFormValid] = useState<any>(defaultValidation)

    const [name, setName] = useState<string>('Pelancong Handal')
    const [email, setEmail] = useState<string>('harleykwen.test2@gmail.com')
    const [phone, setPhone] = useState<string>('085161361009')
    const [address, setAddress] = useState<string>('Bojong, Purwakarta')
    const [password, setPassword] = useState<string>('tes123')
    const [confirmPassword, setConfirmPassword] = useState<string>('tes123')

    const [tnc, setTnc] = useState<boolean>(false)
    const [securePassword, setSecurePassword] = useState<boolean>(true)
    const [secureConfirmPassword, setSecureConfirmPassword] = useState<boolean>(true)

    const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState<string>('')

    const requestOtp = useMutation(requestOtpApi, {
        onSuccess: (resp: any) => {
            navigation?.navigate(ROUTE_NAME.AUTH_SIGN_UP_OTP, {
                otpParams: resp,
                formRegisterParams: {
                    name,
                    phone,
                    address,
                    password,
                }
            })
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

    function handleClickRequestOtp() {
        requestOtp?.reset()
        let validation: any = {
            name: name ? false : true,
            email: email ? false : true,
            phone: phone ? false : true,
            address: address ? false : true,
            password: password ? false : true,
            confirmPassword: confirmPassword ? false : true,
            confirmPasswordNotMatch: password === confirmPassword ? false : true,
            tnc: tnc ? false : true,
        }
        setIsFormValid((prev: any) => {
            return {
                ...prev,
                ...validation,
            }
        })
        if (!confirmPassword) {
            setErrorMessageConfirmPassword('signup_input_confirm_password_error_message')
        } else if (password && confirmPassword && password !== confirmPassword) {
            setErrorMessageConfirmPassword('signup_input_confirm_password_not_match_error_message')
        }
        if (Object.keys(validation).find((key) => validation[key] === true) === undefined) requestOtp?.mutate({ email })
    }

    return (
        <ScrollView>
            <Stack 
                flex={1} 
                backgroundColor={useColorModeValue('lancBackgroundLight', 'lancBackgroundDark')} 
                padding='24px'
                space='16px'
            >
                <Stack direction='row' justifyContent='space-between'>
                    <Text fontFamily='Poppins-SemiBold' fontSize='24px'>{t('common:signup_title')}</Text>
                    <Stack space='8px' direction='row'>
                        <ButtonLanguage />
                        {/* <ButtonColorMode /> */}
                    </Stack>
                </Stack>
                <FormControl 
                    isRequired 
                    marginTop='16px'
                    isInvalid={isFormValid?.name}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_name_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_name_placeholder')}`}
                            value={name}
                            onChangeText={(e) => {
                                setName(e)
                                revalidateForm('name')
                            }}
                            InputLeftElement={
                                <Image 
                                    alt='IC_USER'
                                    source={IC_USER} 
                                    width='24px' 
                                    height='24px' 
                                    marginLeft='24px' 
                                    marginRight='-8px'
                                    tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                                />
                            }
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage >
                            {t('common:signup_input_name_error_message')}
                        </FormControl.ErrorMessage >
                    </Stack>
                </FormControl>
                <FormControl 
                    isRequired
                    isInvalid={isFormValid?.email}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_email_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_email_placeholder')}`}
                            value={email}
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
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage >
                            {t('common:signup_input_email_error_message')}
                        </FormControl.ErrorMessage >
                    </Stack>
                </FormControl>
                <FormControl 
                    isRequired
                    isInvalid={isFormValid?.phone}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_phone_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_phone_placeholder')}`}
                            value={phone}
                            keyboardType='phone-pad'
                            onChangeText={(e) => {
                                setPhone(e)
                                revalidateForm('phone')
                            }}
                            InputLeftElement={
                                <Image 
                                    alt='IC_PHONE'
                                    source={IC_PHONE} 
                                    width='24px' 
                                    height='24px' 
                                    marginLeft='24px' 
                                    marginRight='-8px'
                                    tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                                />
                            }
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage >
                            {t('common:signup_input_phone_error_message')}
                        </FormControl.ErrorMessage >
                    </Stack>
                </FormControl>
                <FormControl 
                    isRequired
                    isInvalid={isFormValid?.address}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_address_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_address_placeholder')}`}
                            value={address}
                            multiline
                            onChangeText={(e) => {
                                setAddress(e)
                                revalidateForm('address')
                            }}
                            InputLeftElement={
                                <Image 
                                    alt='IC_HOME_PIN'
                                    source={IC_HOME_PIN} 
                                    width='24px' 
                                    height='24px' 
                                    marginLeft='24px' 
                                    marginRight='-8px'
                                    tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')}
                                />
                            }
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage >
                            {t('common:signup_input_address_error_message')}
                        </FormControl.ErrorMessage >
                    </Stack>
                </FormControl>
                <FormControl 
                    isRequired
                    isInvalid={isFormValid?.password}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_password_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_password_placeholder')}`}
                            value={password}
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
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage>
                            {t('common:signup_input_password_error_message')}
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl 
                    isRequired
                    isInvalid={isFormValid?.confirmPassword || isFormValid?.confirmPasswordNotMatch}
                >
                    <Stack>
                        <FormControl.Label>{t('common:signup_input_confirm_password_label')}</FormControl.Label>
                        <Input 
                            placeholder={`${t('common:signup_input_confirm_password_placeholder')}`}
                            value={confirmPassword}
                            secureTextEntry={secureConfirmPassword}
                            onChangeText={(e) => {
                                setConfirmPassword(e)
                                revalidateForm('confirmPassword')
                                revalidateForm('confirmPasswordNotMatch')
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
                                        secureConfirmPassword &&
                                        <Pressable onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
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
                                        !secureConfirmPassword &&
                                        <Pressable onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
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
                            isDisabled={requestOtp?.isLoading}
                        />
                        <FormControl.ErrorMessage>
                            {t(`common:${errorMessageConfirmPassword}`)}
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>

                <Stack space='4px' marginTop='16px'>
                    <Text 
                        color={useColorModeValue('lancPrimaryLight', 'lancPrimaryDark')}
                        fontSize='12px'
                        fontFamily='Poppins-SemiBold'
                    >{t('common:signup_open_tnc')}</Text>

                    <FormControl
                        isRequired
                        isInvalid={isFormValid?.tnc}
                    >
                        <Stack>
                            <Checkbox 
                                value='tnc' 
                                size='lancSmall' 
                                isInvalid={isFormValid.tnc}
                                isChecked={tnc}
                                onChange={() => {
                                    setTnc(!tnc)
                                    revalidateForm('tnc')
                                }}
                                isDisabled={requestOtp?.isLoading}
                            >
                                {t('common:signup_read_and_aggree_tnc')}
                            </Checkbox>
                            <FormControl.ErrorMessage 
                                _text={{ fontSize: '12px', color: useColorModeValue('lancErrorLight', 'lancErrorDark') }}
                            >
                                {t('common:signup_read_and_aggree_tnc_error_message')}
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                </Stack>

                <Alert 
                    display={requestOtp?.isError ? 'flex' : 'none'} 
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
                        >{`${requestOtp?.error}`}</Text>
                    </Stack>
                </Alert>

                <Button 
                    marginTop='16px' 
                    onPress={handleClickRequestOtp}
                    isLoading={requestOtp?.isLoading}
                >
                    {t('common:signup_button_send_otp')}
                </Button>
                <Button 
                    variant='lancText' 
                    onPress={() => navigation?.navigate(ROUTE_NAME?.AUTH_SIGN_IN)}
                    isDisabled={requestOtp?.isLoading}
                >
                    {t('common:signup_button_have_an_accound')}
                </Button>
            </Stack>
        </ScrollView>
    )
}

export default Register