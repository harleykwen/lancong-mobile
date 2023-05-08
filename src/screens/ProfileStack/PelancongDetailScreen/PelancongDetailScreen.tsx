import React, { useState } from 'react'
import { format } from 'date-fns'
import { deletePelancongApi } from '../../../apis/pelancong'
import { useMutation, useQueryClient } from 'react-query'
import { IC_ARROW_BACK, IC_CALENDAR_MONTH } from '../../../assets'
import { 
    Actionsheet,
    Button,
    Flex, 
    Image, 
    Input, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'

interface IPelancongDetailScreen {
    navigation?: any
    route?: any
}

const PelancongDetailScreen: React.FC<IPelancongDetailScreen> = (props: IPelancongDetailScreen) => {
    const { navigation, route } = props
    const { data } = route?.params

    const queryClient = useQueryClient()

    const [actionSheetConfirmationDelete, setActionSheetConfirmationDelete] = useState<boolean>(false)

    const deletePelancong = useMutation(deletePelancongApi, {
        onSuccess: async () => {
            await queryClient?.invalidateQueries('get-pelancong')
            navigation?.goBack()
        }
    })

    return (
        <Flex flex='1' backgroundColor='white'>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='white'
                space='8px'
                alignItems='center'
            >
                <Pressable 
                    isDisabled={deletePelancong?.isLoading}
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Stack>
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>Detail Pelancong</Text>
                </Stack>
            </Stack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack space='8px' backgroundColor='gray.100'>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Pelancong</Text>
                        <Input 
                            placeholder='nama'
                            isReadOnly={true}
                            value={data?.name}
                        />
                        <Input 
                            placeholder='email'
                            isReadOnly={true}
                            value={data?.email}
                        />
                        <Input 
                            placeholder='no. telepon'
                            isReadOnly={true}
                            value={data?.phone}
                        />
                        <Input 
                            placeholder='tanggal lahir'
                            isReadOnly
                            InputRightElement={
                                <Image
                                    marginRight='16px'
                                    alt='IC_CALENDAR_MONTH'
                                    source={IC_CALENDAR_MONTH}
                                    width='24px'
                                    height='24px'
                                    tintColor='lancSurfaceLight'
                                />
                            }
                            value={format(new Date(data?.birthdate), 'dd MMMM yyyy')}
                        />
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Kewarganegaraan</Text>
                        <Input 
                            placeholder='kewarganegaraan'
                            isReadOnly={true}
                            value={data?.identity?.citizenship}
                        />
                        <Input 
                            placeholder='no. KTP'
                            isReadOnly={true}
                            value={data?.identity?.id_number}
                        />
                    </Stack>
                    {
                        data?.identity?.citizenship !== 'Indonesia' &&
                        <Stack 
                            padding='24px' 
                            space='16px' 
                            backgroundColor='white'
                        >
                            <Text
                                fontFamily='Poppins-SemiBold' 
                                fontSize='15px'
                                color='gray.600'
                            >Informasi Passport</Text>
                            <Input 
                                placeholder='no. passport'
                                isReadOnly={true}
                                value={data?.passport?.passport_number}
                            />
                            <Input 
                                placeholder='tanggal penerbitan'
                                isReadOnly
                                InputRightElement={
                                    <Image
                                        marginRight='16px'
                                        alt='IC_CALENDAR_MONTH'
                                        source={IC_CALENDAR_MONTH}
                                        width='24px'
                                        height='24px'
                                        tintColor='lancSurfaceLight'
                                    />
                                }
                                value={data?.passport?.publication_date}
                            />
                            <Input 
                                placeholder='tanggal kadaluarsa'
                                isReadOnly
                                InputRightElement={
                                    <Image
                                        marginRight='16px'
                                        alt='IC_CALENDAR_MONTH'
                                        source={IC_CALENDAR_MONTH}
                                        width='24px'
                                        height='24px'
                                        tintColor='lancSurfaceLight'
                                    />
                                }
                                value={data?.passport?.expiration_date}
                            />
                        </Stack>
                    }
                    <Stack 
                        paddingY='16px'
                        paddingX='24px' 
                        space='8px' 
                        backgroundColor='white'
                    >
                        <Button 
                            onPress={() => navigation?.push(ROUTE_NAME?.PROFILE_NAVIGATOR_UPDATE_PELANCONG_DATA, { data })}
                        >
                            Edit Pelancong
                        </Button>
                        <Button colorScheme='lancError' onPress={() => setActionSheetConfirmationDelete(true)}>
                            Hapus Pelancong
                        </Button>
                    </Stack>
                </Stack>
            </ScrollView>

            <Actionsheet isOpen={actionSheetConfirmationDelete} onClose={() => setActionSheetConfirmationDelete(false)}>
                <Actionsheet.Content padding='16px' backgroundColor='white'>
                    <Stack width='100%' space='16px'>
                        <Text fontFamily='Poppins-SemiBold'>Kamu yakin mau hapus {data?.name} dari daftar pelancong?</Text>
                        <Stack space='8px'>
                            <Button 
                                onPress={() => {
                                    deletePelancong?.mutate({ id: data?.id })
                                }}
                                isLoading={deletePelancong?.isLoading}
                                variant='lancOutline'
                            >Yakin</Button>
                            <Button
                                isDisabled={deletePelancong?.isLoading}
                                onPress={() => setActionSheetConfirmationDelete(false)}
                            >Batal</Button>
                        </Stack>
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>
        </Flex>
    )
}

export default PelancongDetailScreen