import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonLanguage } from '../../../components'
import { useMutation } from 'react-query'
import { IC_ERROR } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { resendOtpApi, validateOtpApi } from '../../../apis/register'
import { intervalToDuration, isPast } from 'date-fns'
import { ASYNC_STORAGE_NAME, asyncStorageSaveitem } from '../../../asyncStorage'
import {
    Alert,
    Button,
    FormControl,
    Image,
    Input,
    ScrollView,
    Stack,
    Text,
    useColorModeValue,
} from 'native-base'

interface IOtp {
    navigation?: any
    route?: any
}

const Otp: React.FC<IOtp> = (props: IOtp) => {
    const { navigation, route } = props
    const { otpParams, formRegisterParams } = route?.params

    const { t } = useTranslation()

    const [otp, setOtp] = useState<any>(otpParams)
    const [resendOtpInterval, setResendOtpInterval] = useState<string>('')
    const [otpNumber, setOtpNumber] = useState<string>('')
    const [isFormValid, setIsFormValid] = useState(true)

    const resendOtp = useMutation(resendOtpApi, {
        onSuccess: (resp: any) => {
            setOtp(resp)
        }
    })
    const validateOtp = useMutation(validateOtpApi, {
        onSuccess: (resp: any) => {
            asyncStorageSaveitem(ASYNC_STORAGE_NAME.AUTH_TOKEN, resp?.data?.tokenable?.token)
            asyncStorageSaveitem(ASYNC_STORAGE_NAME.AUTH_SECRET, resp?.data?.tokenable?.secret)
            navigation?.replace(ROUTE_NAME.MAIN_NAVIGATOR, { screen: ROUTE_NAME.MAIN_NAVIGATOR_HOME})
        }
    })

    function runIntervalResendOtp() {
        const myResendOtpInterval = setInterval(handleUpdateResendOtpInterval, 1000)
        function handleUpdateResendOtpInterval() {
            if (isPast(new Date(otp?.data?.resend_after))) {
                clearInterval(myResendOtpInterval)
            } else {
                const interval = intervalToDuration({
                    start: new Date(),
                    end: new Date(otp?.data?.resend_after)
                })
                const generatedInterval = handleGenerateInterval(interval)
                setResendOtpInterval(generatedInterval)
            }
        }
    }

    function handleGenerateInterval(data: any) {
        const minuteArg = data?.minutes
        const secondArg = data?.seconds

        let minute
        let second

        if (minuteArg > 9) {
            minute = `${minuteArg}`
        } else if (minuteArg < 9 && minuteArg > 0) {
            minute = `0${minuteArg}`
        } else {
            minute = '00'
        }

        if (secondArg > 9) {
            second = `${secondArg}`
        } else if (secondArg < 9 && secondArg > 0) {
            second = `0${secondArg}`
        } else {
            second = '00'
        }

        return minute + ':' + second
    }

    useEffect(() => {
        runIntervalResendOtp()
    }, [otp])

    return (
        <ScrollView backgroundColor={useColorModeValue('lancBackgroundLight', 'lancBackgroundDark')}>
            <Stack
                flex={1}
                padding='24px'
                space='16px'
            >
                <Stack direction='row' justifyContent='space-between'>
                    <Text fontFamily='Poppins-SemiBold' fontSize='24px'>{t('common:signup_otp_title')}</Text>
                    <Stack space='8px' direction='row'>
                        <ButtonLanguage />
                        {/* <ButtonColorMode /> */}
                    </Stack>
                </Stack>
                
                <Text>{t('common:signup_otp_subtitle')}</Text>

                <FormControl isInvalid={!isFormValid} marginY='24px'>
                    <Stack>
                        <Input 
                            rounded='md' 
                            placeholder={`${t('common:signup_otp_input_otp_placeholder')}`} 
                            textAlign='center' 
                            maxLength={6}
                            keyboardType='number-pad'
                            fontSize='18px'
                            fontFamily='Poppins-SemiBold'
                            isDisabled={resendOtp?.isLoading || validateOtp?.isLoading}
                            value={otpNumber}
                            onChangeText={(e) => {
                                setIsFormValid(true)
                                setOtpNumber(e)
                            }}
                        />
                        <FormControl.ErrorMessage >
                            {t('common:signup_otp_input_error_message')}
                        </FormControl.ErrorMessage >
                    </Stack>
                </FormControl>

                <Alert 
                    display={resendOtp?.isError || validateOtp?.isError ? 'flex' : 'none'} 
                    alignItems='flex-start' 
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
                        >{`${resendOtp?.error || validateOtp?.error}`}</Text>
                    </Stack>
                </Alert>

                <Stack space='16px'>
                    <Button 
                        isDisabled={resendOtp?.isLoading}
                        isLoading={validateOtp?.isLoading}
                        onPress={() => {
                            resendOtp?.reset()
                            validateOtp?.reset()
                            if (otpNumber) {
                                validateOtp?.mutate({
                                    otp: otpNumber,
                                    otp_id: otp?.data?.otp_id,
                                    user: {
                                        ...formRegisterParams,
                                        avatar: {
                                            filename: null,
                                            content: null,
                                        }
                                    },
                                    device_name: 'Samsung Galaxy S22'
                                })
                            } else {
                                setIsFormValid(false)
                            }
                        }}
                    >
                        {t('common:signup_otp_button_create_account')}
                    </Button>
                    <Button 
                        variant='lancText' 
                        isLoading={resendOtp?.isLoading}
                        isDisabled={resendOtpInterval !== '00:00' || validateOtp?.isLoading}
                        onPress={() => {
                            validateOtp?.reset()
                            resendOtp?.reset()
                            resendOtp?.mutate({ otp_id: otp?.data?.otp_id })
                        }}
                    >
                        {`${t('common:signup_otp_button_resend_otp')} ${resendOtpInterval === '00:00' ? '' : `(${resendOtpInterval})`}`}
                    </Button>
                </Stack>
            </Stack>
        </ScrollView>
    )
}

export default Otp