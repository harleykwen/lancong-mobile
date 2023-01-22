import React, { useEffect, useState } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { StyleSheet, Alert } from 'react-native'
import { Button, Center, Text } from 'native-base'
import { resendOtpApi, validateOtpApi } from '../../apis/auth'
import { useMutation } from 'react-query'
import { differenceInSeconds } from 'date-fns'
import { getModel } from 'react-native-device-info'

interface IOtp {
    route: any
    navigation: any
}

const Otp = (props: IOtp) => {
    const { route, navigation } = props
    const { fullName, email, phoneNumber, password, requestOtp } = route.params

    const [otp, setOtp] = useState('')
    const [resendIntervalBase, setresendIntervalBase] = useState(requestOtp.resend_after)
    const [resendInterval, setResendInterval] = useState(0)
    const [isShowResendOtp, setIsShowResendOtp] = useState(false)

    async function handleResendOtp() {
        return await resendOtpApi({ otp_id: requestOtp.otp_id })
    }

    async function handleValidateOtp() {
        return await validateOtpApi({
            otp_id: requestOtp.otp_id,
            otp: otp,
            device_name: getModel(),
            user: {
                name: fullName,
                phone: phoneNumber,
                password: password,
                address: '',
                avatar: '',
            }
        })
    }

    const resendOtp = useMutation(handleResendOtp, {
        onSuccess: (response: any) => {
            setresendIntervalBase(response.resend_after)
            setIsShowResendOtp(false)
        },
        onError: (error: any) => Alert.alert(error)
    })
    const validateOtp = useMutation(handleValidateOtp, {
        onError: (error: any) => Alert.alert(error),
        onSuccess: (response: any) => {
            console.log(response)
            // Alert.alert('Register successfull')
            navigation.replace('main')
        } 
    })

    function calculateIntervalResendOtp() {
        const interval = setInterval(calculate, 1000)
        function calculate() {
            if (new Date().getTime() < resendIntervalBase) {
                setResendInterval(differenceInSeconds(resendIntervalBase, new Date()))
            } else {
                clearInterval(interval)
                setIsShowResendOtp(true)
            }
        }
    }

    function handleSubmitOtp() {
        validateOtp.mutate()
    }

    useEffect(() => {
        console.log({ fullName, email, phoneNumber, password, requestOtp })
    }, [])

    useEffect(() => {
        calculateIntervalResendOtp() 
    }, [resendIntervalBase])
    

    return (
        <Center backgroundColor='white' flex='112' padding='10px'>
            <Text fontWeight='semibold' fontSize='lg'>Enter Verification Code</Text>
            <Text color='gray.400'>We sent verification code to {email}</Text>
            <OTPInputView
                keyboardType='number-pad'
                style={{width: '80%', height: 100}}
                pinCount={6}
                code={otp}
                onCodeChanged = {(code: any) => setOtp(code)}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                // onCodeFilled = {handleSubmitOtp}
            />
            <Button 
                colorScheme={'success'}
                width='80%'
                isLoading={validateOtp.isLoading}
                isDisabled={otp.length < 6 || resendOtp.isLoading}
                onPress={handleSubmitOtp}
                marginBottom='10px'
            >Validate OTP</Button>
            {isShowResendOtp
                ?   <Button 
                        colorScheme={'info'}
                        width='80%'
                        isLoading={resendOtp.isLoading}
                        onPress={() => resendOtp.mutate()}
                    >
                        Resend OTP
                    </Button>
                :   <Text color='gray.400'>Resend OTP {resendInterval}(s)</Text>
            }
        </Center>
    )
}

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
  
    borderStyleHighLighted: {
      borderColor: "#038103",
    },
  
    underlineStyleBase: {
      width: 45,
      height: 45,
      borderWidth: 1,
      color: '#000000',
      borderRadius: 4,
    },
  
    underlineStyleHighLighted: {
      borderColor: "#0381031",
    },
});

export default Otp