import React from 'react'
import { Actionsheet, Flex, HStack, Image, Pressable, Stack, Text, useClipboard, useDisclose } from 'native-base'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { IC_CONTENT_COPY } from '../../../../assets'

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
                console.log({data})
                if (data?.method === null) return
                actionSheetDetail?.onOpen()
            }}
        >
            <Flex
                shadow='1' 
                backgroundColor='white' 
                padding='10px' 
                rounded='lg'
            >
                <HStack alignItems='center' justifyContent='space-between'>
                    <Text fontFamily='Poppins-SemiBold' fontSize='xs'>{index === 0 ? 'Down Payment' : `Termin ke - ${index}`}</Text>
                    <Flex 
                        paddingX='16px' 
                        paddingY='4px' 
                        borderRadius='xl'
                        backgroundColor={data?.status?.background}
                    >
                        <Text 
                            fontFamily='Poppins-SemiBold' 
                            fontSize='xs' 
                            color={data?.status?.color}
                        >{data?.status?.text?.toUpperCase()}</Text>
                    </Flex>
                </HStack>
                <Text fontFamily='Poppins-SemiBold' color='orange.600' fontSize='xs'>Rp. {data?.amount?.toLocaleString('id')}</Text>
            </Flex>

            <Actionsheet isOpen={actionSheetDetail?.isOpen} onClose={actionSheetDetail?.onClose}>
                <Actionsheet.Content
                    padding='16px'
                    backgroundColor='lancBackgroundLight'
                    alignItems='flex-start'
                >
                    <Stack space='16px' width='full'>
                        <Stack>
                            <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>
                                {data[data?.method]?.bank_code} {data?.method?.replaceAll('_', ' ')?.toUpperCase()}
                            </Text>
                        </Stack>

                        <Stack width='full'>
                            <Text color='lancOutlineLight'>Total Pembayaran</Text>
                            <HStack alignItems='center' justifyContent='space-between'>
                                <Text fontFamily='Poppins-SemiBold'>
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
                                <Text color='lancOutlineLight'>Nomor Virtual Account</Text>
                                <HStack alignItems='center' justifyContent='space-between'>
                                    <Text fontFamily='Poppins-SemiBold'>
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
                            <Text color='lancOutlineLight'>Status</Text>
                            <Text fontFamily='Poppins-SemiBold'>
                                {data?.status?.text?.toUpperCase()}
                            </Text>
                        </Stack>

                        {
                            data?.status?.flag?.toUpperCase() === 'PAID' &&
                            <Stack>
                                <Text color='lancOutlineLight'>Tanggal Pembayaran</Text>
                                <Text fontFamily='Poppins-SemiBold'>
                                    {format(new Date(data?.payment_date), 'dd LLLL yyyy, HH:mm', { locale: id })} WIB
                                </Text>
                            </Stack>
                        }

                        {
                            data?.status?.flag?.toUpperCase() === 'EXPIRED' || data?.status?.flag?.toUpperCase() === 'AWAITING_PAYMENT' &&
                            <Stack>
                                <Text color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                                <Text fontFamily='Poppins-SemiBold'>
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