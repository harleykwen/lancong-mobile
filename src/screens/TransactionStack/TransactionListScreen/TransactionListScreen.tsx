import React from 'react'
import TransactionItemSkeleton from './components/TransactionItemSkeleton'
import TransactionItem from './components/TransactionItem'
import PendingCompleteData from './components/PendingCompleteData'
import { RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import { getTransactionDraftListApi, getTransactionListApi } from '../../../apis/transaction'
import { 
    Flex, 
    ScrollView, 
    Stack, 
    Text,
} from 'native-base'

interface ITransactionListScreen {
    navigation?: any
}

const TransactionListScreen: React.FC<ITransactionListScreen> = (props: ITransactionListScreen) => {
    const { navigation } = props

    const transactions = useQuery('transaction-list', getTransactionListApi)
    const transactionsDraft = useQuery('transaction-draft-list', getTransactionDraftListApi)

    return (
        <Flex flex='1' backgroundColor='#f7f7f7'>
            <Flex 
                direction='row' 
                paddingX='24px'
                paddingY='16px' 
                alignItems='center' 
                justifyContent='center'
                borderBottomWidth='1px'
                borderBottomColor='#e5e5e5'
                backgroundColor='#ffffff'
            >
                <Text 
                    fontSize='14px' 
                    color='#101010' 
                    fontFamily='Poppins-SemiBold'
                >Transaksi</Text>
            </Flex>
            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={transactions?.isFetching} 
                        onRefresh={() => {
                            transactions?.remove()
                            transactions?.refetch()
                            transactionsDraft?.remove()
                            transactionsDraft?.refetch()
                        }} 
                    />
                }
            >
                <Stack padding='16px' space='8px'>
                    {
                        transactionsDraft?.data?.data?.length !== 0 && 
                        !transactionsDraft?.isFetching &&
                        <PendingCompleteData navigation={navigation} transactionDraft={transactionsDraft} />
                    }

                    {
                        !transactions?.isFetching &&
                        transactions?.data?.data?.map((transaction: any, index: number) => {
                            return (
                                <TransactionItem
                                    key={index}
                                    navigation={navigation}
                                    transaction={transaction}
                                />
                            )
                    })}

                    {
                        transactions?.isFetching &&
                        [...Array(3)]?.map((_, index: number) => {
                            return <TransactionItemSkeleton key={index} />
                        })
                    }
                </Stack>
            </ScrollView>
        </Flex>
    )
}

export default TransactionListScreen