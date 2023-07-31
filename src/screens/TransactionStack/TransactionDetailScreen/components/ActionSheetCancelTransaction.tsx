import React, { memo } from 'react'
import { 
    Actionsheet, 
    Button, 
    Stack, 
    Text, 
} from 'native-base'
import { ROUTE_NAME } from '../../../../router'
import { useMutation } from 'react-query'
import { cancelVaTransactionApi } from '../../../../apis/transaction'

interface IActionSheetCancelTransaction {
    isOpen: boolean
    onClose: any
    navigation: any
    transactionId: string
}

const ActionSheetCancelTransaction: React.FC<IActionSheetCancelTransaction> = (props: IActionSheetCancelTransaction) => {
    const { 
        isOpen, 
        onClose, 
        navigation, 
        transactionId,
    } = props

    const cancelTransaction = useMutation(cancelVaTransactionApi, {
        onSuccess: () => navigation?.replace(ROUTE_NAME.TRANSACTION_NAVIGATOR),
    })

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <Stack space='16px' width='full'>
                    <Text textAlign='center'>Kamu yakin mau batalin pesanan ini?</Text>
                    <Button size='lancSmall'>Ngga Jadi</Button>
                    <Button 
                        size='lancSmall' 
                        colorScheme='lancError' 
                        marginTop='-10px' 
                        onPress={() => cancelTransaction?.mutate({ transactionId })}
                        isLoading={cancelTransaction?.isLoading}
                    >Batalin</Button>
                </Stack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetCancelTransaction)