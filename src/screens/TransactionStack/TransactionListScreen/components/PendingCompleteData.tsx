import React, { memo } from 'react'
import { ROUTE_NAME } from '../../../../router'
import { IC_CHEVRON_RIGHT } from '../../../../assets'
import { 
    Center, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface IPendingCompleteData {
    navigation: any
    transactionDraft: any
}

const PendingCompleteData: React.FC<IPendingCompleteData> = (props: IPendingCompleteData) => {
    const { navigation, transactionDraft } = props

    return (
        <Pressable
            onPress={() => {
                navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, {
                    screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_LIST_DRAFT,
                })
            }}
        >
            <Stack
                backgroundColor='white'
                shadow='5'
                rounded='md'
                padding='10px'
                space='10px'
                direction='row'
                alignItems='center'
            >
                <Center backgroundColor='red.600' width='24px' height='24px' rounded='full'>
                    <Text fontSize='10px' color='lancBackgroundLight' marginTop='2px'>
                        {transactionDraft?.data?.data?.length}
                    </Text>
                </Center>
                <Text fontSize='12px'>Menunggu kelengkapan data</Text>
                <Image
                    alt='IC_CHEVRON_RIGHT'
                    source={IC_CHEVRON_RIGHT}
                    width='24px'
                    height='24px'
                    tintColor='lancOnBackgroundLight'
                    marginLeft='auto'
                />
            </Stack>
        </Pressable>
    )
}

export default memo(PendingCompleteData)