import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Header } from '../../../components'
import { 
    Button, 
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'
import { IC_ARROW_BACK } from '../../../assets'

interface ISpecialRequestScreen {
    navigation?: any
    route?: any
}

const SpecialRequestScreen: React.FC<ISpecialRequestScreen> = (props: ISpecialRequestScreen) => {
    const { navigation, route } = props
    const {
        id,
        specialRequests: data,
        setSpecialRequests: setData,
        participants,
        updateTripTransaction,
    } = route?.params

    const [specialRequests, setSpecialRequests] = useState([...data?.map((data: any) => {
        return { ...data }
    })])
    const [loading, setLoading] = useState(false)

    function handleCounter(index: number, type: 'minus' | 'plus') {
        const tempSpecialRequests = specialRequests
        if (type === 'minus') {
            tempSpecialRequests[index].amount = tempSpecialRequests[index].amount - 1
        } else {
            tempSpecialRequests[index].amount = tempSpecialRequests[index].amount + 1
        }
        return setSpecialRequests(() => {
            return [...tempSpecialRequests]
        })
    }

    async function handleApply() {
        setLoading(true)
        let payloadSpecialRequest: any[] = []
        specialRequests?.map((x: any) => {
            return payloadSpecialRequest?.push({
                id: x?.id,
                amount: x?.amount,
            })
        })
        await updateTripTransaction?.mutateAsync({
            id,
            participants,
            special_requests: payloadSpecialRequest,
        })
        setLoading(false)
        navigation.goBack()
    }

    return (
        <Flex flex='1' backgroundColor='white'>
            <Stack 
                paddingY='16px'
                paddingX='24px'
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                direction='row'
                alignItems='center'
                space='16px'
            >
                <Pressable onPress={() => navigation?.goBack()}>
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Special Request</Text>
            </Stack>
            <ScrollView>
                <Stack 
                    width='full' 
                    padding='24px'
                    paddingBottom='80px'
                    space='15px'
                >
                    <Stack space='30px'>
                        {specialRequests?.map((data: any, index: number) => {
                            return (
                                <Stack 
                                    key={index} 
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Stack>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>{data?.type}</Text>
                                        <Text fontFamily='Poppins-Regular' fontSize='11px' color='gray.400'>Harga per pcs Rp.{Number(data?.price)?.toLocaleString('id')}</Text>
                                        <Text fontFamily='Poppins-Regular' fontSize='11px' color='gray.400'>Lorem ipsum dolor sit amet</Text>
                                        <Text fontFamily='Poppins-Regular' fontSize='11px' marginTop='10px'>Rp.{Number(data?.price * data?.amount)?.toLocaleString('id')}</Text>
                                    </Stack>
                                    <Stack 
                                        direction='row' 
                                        space='15px' 
                                        alignItems='center'
                                        marginLeft='auto'
                                    >
                                        <Pressable>
                                            <Icon 
                                                as={SimpleLineIcons} 
                                                name='minus' 
                                                size='sm' 
                                                color={data?.amount == 0 ? 'gray.400' : 'lancPrimaryLight' }
                                                onPress={() => {
                                                    if (data?.amount == 0) return
                                                    else return handleCounter(index, 'minus')
                                                }}
                                            />
                                        </Pressable>
                                        <Text 
                                            fontFamily='Poppins-Bold' 
                                            fontSize='13px'
                                            width='25px'
                                            textAlign='center'
                                        >{data?.amount}</Text>
                                        <Pressable>
                                            <Icon 
                                                as={SimpleLineIcons} 
                                                name='plus' 
                                                size='sm' 
                                                color='lancPrimaryLight' 
                                                onPress={() => handleCounter(index, 'plus')}
                                            />
                                        </Pressable>
                                    </Stack>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Stack>
            </ScrollView>

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='10px'
                backgroundColor='white'
                alignItems='center'
                position='absolute'
                bottom='0px'
                left='0px'
                right='0px'
                shadow='5'
                space='15px'
            >
                <Flex flex='1'>
                    <Button 
                        variant='lancOutline'
                        onPress={() => navigation.goBack()}
                    >
                        Batal
                    </Button>
                </Flex>
                <Flex flex='1'>
                    <Button 
                        onPress={handleApply}
                        isLoading={loading}
                    >
                        Terapkan
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}

export default SpecialRequestScreen