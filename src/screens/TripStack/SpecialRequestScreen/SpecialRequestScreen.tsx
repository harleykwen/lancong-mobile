import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Header } from '../../../components'
import { 
    Button, 
    Flex, 
    Icon, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'

interface ISpecialRequestScreen {
    navigation?: any
    route?: any
}

const SpecialRequestScreen: React.FC<ISpecialRequestScreen> = (props: ISpecialRequestScreen) => {
    const { navigation, route } = props
    const {
        data,
        setData,
    } = route?.params

    const [specialRequests, setSpecialRequests] = useState([...data?.map((data: any) => {
        return { ...data }
    })])

    function handleCounter(index: number, type: 'minus' | 'plus') {
        const tempSpecialRequests = specialRequests
        if (type === 'minus') {
            tempSpecialRequests[index].qty = tempSpecialRequests[index].qty - 1
        } else {
            tempSpecialRequests[index].qty = tempSpecialRequests[index].qty + 1
        }
        return setSpecialRequests(() => {
            return [...tempSpecialRequests]
        })
    }

    function handleApply() {
        setData(specialRequests?.map((data: any) => data))
        navigation.goBack()
    }

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title='Permintaan Khusus'
                onPressBack={() => navigation.goBack()}
            />
            <ScrollView>
                <Stack 
                    width='full' 
                    padding='15px'
                    paddingBottom='80px'
                    space='15px'
                >
                    <Stack space='15px'>
                        {specialRequests?.map((data: any, index: number) => {
                            return (
                                <Stack 
                                    key={index} 
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Stack>
                                        <Text fontFamily='Poppins-Medium' fontSize='13px'>{data?.type}</Text>
                                        <Text fontFamily='Poppins-Regular' fontSize='11px'>Rp.{Number(data?.price * data?.qty)?.toLocaleString('id')}</Text>
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
                                                color={data?.qty == 0 ? 'gray.400' : 'xprimary.50' }
                                                onPress={() => {
                                                    if (data?.qty == 0) return
                                                    else return handleCounter(index, 'minus')
                                                }}
                                            />
                                        </Pressable>
                                        <Text 
                                            fontFamily='Poppins-Bold' 
                                            fontSize='13px'
                                            width='25px'
                                            textAlign='center'
                                        >{data?.qty}</Text>
                                        <Pressable>
                                            <Icon 
                                                as={SimpleLineIcons} 
                                                name='plus' 
                                                size='sm' 
                                                color='xprimary.50' 
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
                        colorScheme="success" 
                        variant='outline' 
                        borderRadius='8px'
                        borderColor='xprimary.50'
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='xprimary.50'
                        >Batal</Text>
                    </Button>
                </Flex>
                <Flex flex='1'>
                    <Button 
                        colorScheme="success" 
                        borderRadius='8px' 
                        onPress={handleApply}
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='white'
                        >Terapkan</Text>
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}

export default SpecialRequestScreen