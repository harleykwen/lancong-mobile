import React from 'react'
import { Header, LInput } from '../../components'
import { 
    Button, 
    Center, 
    Flex, 
    HStack, 
    ScrollView, 
    Text, 
    VStack 
} from 'native-base'

interface IPayment {
    navigation: any
}

const Payment = (props: IPayment) => {
    const { navigation } = props

    return (
        <Flex flex='1'>
            <Header 
                title='Payment'
                subtitle='1. Order Data - 2. Payment'
                onPressBack={() => navigation?.goBack()}
            />

            <ScrollView>
                <VStack space='10px' padding='10px'>
                    <LInput 
                        label='Skema Pembayaran' 
                        type='select'
                        options={[{ label: 'Cicilan', value: 'cicilan' }]} 
                    />
                    <VStack>
                        <LInput 
                            label='Down Payment' 
                            type='number'
                        />
                        <Text 
                            color='#038103' 
                            fontSize='10px' 
                            textAlign='right'
                        >
                            15% of Total Payment
                        </Text>
                        <Text 
                            color='gray.400' 
                            fontSize='10px' 
                            textAlign='right'
                        >
                            Sudah termasuk biaya administrasi booking sebesar Rp. 7.000
                        </Text>
                    </VStack>
                    <HStack space='10px'>
                        <Flex width='50%'>
                            <LInput
                                label='Rencana Cicilan'
                                type='select'
                                options={[{label: '6x', value: '6x'}]}
                            />
                        </Flex>
                        <Flex width='50%'>
                            <LInput
                                label=' '
                                type='number'
                                options={[{label: '6x', value: '6x'}]}
                            />
                        </Flex>
                    </HStack>
                    <LInput 
                        label='Tanggal Pembayaran' 
                        type='radio'
                        options={[
                            { label: '2', value: '2' },
                            { label: '10', value: '10' },
                            { label: '25', value: '25' },
                            { label: '28', value: '28'}
                        ]} 
                    />
                    <Flex 
                        marginX='-10px' 
                        padding='10px' 
                        backgroundColor='#c5e2c5'
                    >
                        <Text fontSize='10px' color='#038103'>Rp. 151.625 x 6 Bulan</Text>
                        <Text fontSize='10px' color='gray.400'>Sudah termasuk biaya administrasi</Text>
                    </Flex>
                    <Text>Waktu Pembayaran</Text>
                    <VStack marginX='-10px'>
                        {[...Array(6)].map((cicilan: any, index: any) => {
                            return (
                                <HStack 
                                    key={index} 
                                    borderBottomColor='gray.400' 
                                    borderBottomWidth='1px' 
                                    padding='10px'
                                    space='10px'
                                    alignItems='center'
                                >
                                    <Center 
                                        rounded='full' 
                                        borderColor='gray.400' 
                                        borderWidth='1px'
                                        height='30px'
                                        width='30px'
                                    >
                                        <Text>{index+1}</Text>
                                    </Center>
                                    <Text>0{index+1} Juni 2021</Text>
                                    <Text fontWeight='bold' marginLeft='auto'>Rp. 151.000</Text>
                                </HStack>
                            )
                        })}
                    </VStack>
                    <Button 
                        marginTop='10px' 
                        colorScheme='success'
                        onPress={() => navigation.push('payment-method')}
                    >
                        Confirm Order
                    </Button>
                </VStack>
            </ScrollView>
        </Flex>
    )
}

export default Payment