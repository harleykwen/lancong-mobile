import React, { memo } from 'react'
import { ROUTE_NAME } from '../../../../router'
import { 
    Center, 
    Divider, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface ITransactionItem {
    navigation: any
    transaction: any
}

const TransactionItem: React.FC<ITransactionItem> = (props: ITransactionItem) => {
    const { navigation, transaction } = props

    return (
        <Pressable
            onPress={() => {
                navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, {
                    screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                    params: {
                        transactionId: transaction?.id,
                    },
                })
            }}
        >
            <Stack
                backgroundColor='white'
                borderRadius='4px'
                borderWidth='1px'
                borderColor='#e5e5e5'
                padding='10px'
                space='10px'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Stack>
                        <Text
                            fontSize='13px'
                            fontFamily='Poppins-SemiBold'
                            color='gray.900'
                            textTransform='capitalize'
                        >{transaction?.transaction_type}</Text>
                    </Stack>
                    <Center
                        rounded='lg'
                        backgroundColor={transaction?.order?.status?.background}
                        padding='5px'
                    >
                        <Text
                            fontSize='11px'
                            fontFamily='Poppins-Regular'
                            color={transaction?.order?.status?.color}
                        >{transaction?.order?.status?.text}</Text>
                    </Center>
                </Stack>
                <Divider />
                <Stack
                    direction='row'
                    alignItems='center'
                    space='5px'
                >
                    <Image
                        source={{ uri: transaction?.order?.trip?.images[0]?.url }}
                        width='50px'
                        height='50px'
                        alt={transaction?.order?.trip?.images[0]?.name}
                        rounded='md'
                    />
                    <Stack>
                        <Text
                            fontSize='13px'
                            fontFamily='Poppins-SemiBold'
                            color='gray.900'
                            textTransform='capitalize'
                        >{transaction?.order?.trip?.name}</Text>
                        <Text
                            fontSize='11px'
                            fontFamily='Poppins-Regular'
                            color='gray.600'
                        >Total Harga</Text>
                        <Text
                            fontSize='11px'
                            fontFamily='Poppins-Regular'
                            color='gray.600'
                        >Rp. {transaction?.order?.total_price?.toLocaleString('id')}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Pressable>
    )
}

export default memo(TransactionItem)