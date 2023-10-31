import React from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { IC_CONTENT_COPY } from '../../../../assets'
import { 
    Actionsheet, 
    Flex, 
    HStack, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
    useClipboard, 
    useDisclose, 
} from 'native-base'

type TInstallmentCard = {
    data: any
    index: number
}

const InstallmentCard: React.FC<TInstallmentCard> = (props: TInstallmentCard) => {
    const { data, index } = props

    const actionSheetDetail = useDisclose()
    const { onCopy } = useClipboard()

    return (
        <Pressable
            onPress={() => {
                if (data?.method === null) return
                actionSheetDetail?.onOpen()
            }}
        >
            <Flex
                padding='16px' 
                backgroundColor='#ffffff'
                borderWidth='1px'
                borderColor='#e5e5e5'
            >
                <HStack alignItems='center' justifyContent='space-between'>
                    <Text 
                        fontFamily='Poppins-Regular' 
                        fontSize='12px'
                    >{index === 0 ? 'Down Payment' : `Termin ke - ${index}`}</Text>
                    <Flex 
                        padding='4px' 
                        borderRadius='0px'
                        backgroundColor={data?.status?.background}
                    >
                        <Text 
                            fontFamily='Poppins-Regular' 
                            fontSize='10px' 
                            color={data?.status?.color}
                        >{data?.status?.text?.toUpperCase()}</Text>
                    </Flex>
                </HStack>
                <Text
                    fontFamily='Poppins-Regular' 
                    color='orange.600' 
                    fontSize='12px'
                >Rp. {data?.amount?.toLocaleString('id')}</Text>
            </Flex>

            <Actionsheet isOpen={actionSheetDetail?.isOpen} onClose={actionSheetDetail?.onClose}>
                <Actionsheet.Content
                    padding='16px'
                    backgroundColor='lancBackgroundLight'
                    alignItems='flex-start'
                >
                    <Stack space='16px' width='full'>
                        <Stack>
                            <Text fontSize='12px' color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                {data[data?.method]?.bank_code} {data?.method?.replaceAll('_', ' ')?.toUpperCase()}
                            </Text>
                        </Stack>

                        <Stack width='full'>
                            <Text fontSize='12px' color='lancOutlineLight'>Total Pembayaran</Text>
                            <HStack alignItems='center' justifyContent='space-between'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    Rp. {data[data?.method]?.expected_amount?.toLocaleString('id')}
                                </Text>
                                {
                                    data?.status?.flag !== 'PAID' &&
                                    <Pressable
                                        onPress={() => onCopy(`${data[data?.method]?.expected_amount}`)}
                                    >
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            space='4px'
                                        >
                                            <Text 
                                                color='lancPrimaryLight'
                                                fontSize='12px'
                                                fontFamily='Poppins-SemiBold'
                                            >Salin</Text>
                                            <Image
                                                alt='IC_CONTENT_COPY'
                                                source={IC_CONTENT_COPY}
                                                width='24px'
                                                height='24px'
                                                tintColor='lancPrimaryLight'
                                            />
                                        </Stack>
                                    </Pressable>
                                }
                            </HStack>
                        </Stack>

                        {
                            data?.status?.flag !== 'PAID' &&
                            <Stack width='full'>
                                <Text fontSize='12px' color='lancOutlineLight'>Nomor Virtual Account</Text>
                                <HStack alignItems='center' justifyContent='space-between'>
                                    <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                        {data[data?.method]?.account_number}
                                    </Text>
                                    <Pressable
                                        onPress={() => onCopy(`${data[data?.method]?.account_number}`)}
                                    >
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            space='4px'
                                        >
                                            <Text 
                                                color='lancPrimaryLight'
                                                fontSize='12px'
                                                fontFamily='Poppins-SemiBold'
                                            >Salin</Text>
                                            <Image
                                                alt='IC_CONTENT_COPY'
                                                source={IC_CONTENT_COPY}
                                                width='24px'
                                                height='24px'
                                                tintColor='lancPrimaryLight'
                                            />
                                        </Stack>
                                    </Pressable>
                                </HStack>
                            </Stack>
                        }

                        <Stack>
                            <Text fontSize='12px' color='lancOutlineLight'>Status</Text>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                {data?.status?.text?.toUpperCase()}
                            </Text>
                        </Stack>

                        {
                            data?.status?.flag?.toUpperCase() === 'PAID' &&
                            <Stack>
                                <Text fontSize='12px' color='lancOutlineLight'>Tanggal Pembayaran</Text>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    {format(new Date(data?.payment_date), 'dd LLLL yyyy, HH:mm', { locale: id })} WIB
                                </Text>
                            </Stack>
                        }

                        {
                            data?.status?.flag?.toUpperCase() === 'EXPIRED' || data?.status?.flag?.toUpperCase() === 'AWAITING_PAYMENT' &&
                            <Stack>
                                <Text fontSize='12px' color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    {format(new Date(data?.expected_payment_date), 'dd LLLL yyyy, HH:mm', { locale: id })} WIB
                                </Text>
                            </Stack>
                        }
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>
        </Pressable>
    )
}

export default InstallmentCard