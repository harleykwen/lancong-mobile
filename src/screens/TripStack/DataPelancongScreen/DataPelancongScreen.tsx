import React, { useState } from 'react'
import PickPelancongItem from './components/PickPelancongItem'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from '../../../components'
import { useQuery, useQueryClient } from 'react-query'
import { getPelancongApi } from '../../../apis/pelancong'
import { 
    Button,
    Flex, 
    Icon, 
    Input, 
    Modal, 
    Pressable, 
    ScrollView, 
    Spinner, 
    Stack, 
    Text, 
} from 'native-base'

interface IDataPelancongScreen {
    navigation: any
    route: any
}

const DataPelancongScreen = (props: IDataPelancongScreen) => {
    const { navigation, route } = props
    const queryClient = useQueryClient()
    const { 
        pelancong,
        index, 
        onSelectPelancong,
        updateTripTransaction,
        specialRequests,
        transactionId,
    } = route?.params

    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const listPelancong = useQuery('get-pelancong', getPelancongApi)

    async function handleAddPelancong(index: any, data: any) {
        setLoading(true)
        let currentPelancong = pelancong?.map((x: any) => x?.id)
        currentPelancong[index] = data?.id
        let payloadPelancong = currentPelancong?.filter((x: any) => x !== null && x !== undefined)
        await updateTripTransaction?.mutateAsync({
            id: transactionId,
            participants: payloadPelancong,
            special_requests: specialRequests,
        })
        setLoading(false)
        onSelectPelancong()
    }

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title='Pilih Pelancong'
                onPressBack={() => navigation.goBack()}
            />
            <Stack padding='24px'>
                <Input 
                    placeholder='Cari pelancong ...'
                    value={search}
                    onChangeText={(e: any) => {
                        setSearch(e)
                    }}
                    InputLeftElement={
                        <Icon 
                            as={MaterialIcons} 
                            name='search' 
                            color='gray.400' 
                            size='lg' 
                            marginLeft='16px' 
                        />
                    }
                    InputRightElement={
                        <Pressable onPress={() => setSearch('')}>
                            <Icon 
                                as={Ionicons} 
                                name='close-circle' 
                                color='gray.400' 
                                size='md' 
                                marginRight='16px' 
                            />
                        </Pressable>
                    }
                />
            </Stack>

            <ScrollView marginTop='-24px'>
                <Stack flex='1' paddingBottom='70px'>
                    {listPelancong?.data?.data?.length === 0 &&
                        <Flex 
                            flex='1' 
                            justifyContent='center' 
                            alignItems='center'
                            padding='24px'
                        >
                            <Stack 
                                direction='row' 
                                space='4px' 
                                alignItems='center'
                            >
                                <Icon 
                                    as={MaterialIcons} 
                                    name='info' 
                                    color='gray.600' 
                                    size='md' 
                                />
                                <Text
                                    fontFamily='Poppins-SemiBold' 
                                    fontSize='11px'
                                    color='gray.600'
                                    textAlign='center'
                                >Belum ada pelancong</Text>
                            </Stack>
                        </Flex>
                    }

                    {!search && listPelancong?.data?.data?.length !== 0 &&
                        <Stack 
                            backgroundColor='white' 
                            padding='24px' 
                            space='8px'
                        >
                            {listPelancong?.data?.data?.map((p: any, i: number) => {
                                if (pelancong?.find((x: any) => x?.id === p?.id) === undefined) {
                                    return (
                                        <PickPelancongItem 
                                            key={i} 
                                            data={p} 
                                            onSelectPelancong={handleAddPelancong}
                                            index={index}
                                        />
                                    )
                                }
                            })}
                        </Stack>
                    }

                    {
                        search && 
                        listPelancong?.data?.data?.length !== 0 && 
                        listPelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length !== 0 && 
                            <Stack 
                                backgroundColor='white' 
                                padding='24px' 
                                space='8px'
                            >
                                {listPelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.map((p: any, i: number) => {
                                    if (pelancong?.find((x: any) => x?.id === p?.id) === undefined) {
                                        return (
                                            <PickPelancongItem 
                                                key={i} 
                                                data={p} 
                                                onSelectPelancong={handleAddPelancong}
                                                index={index}
                                            />
                                        )
                                    }
                                })}
                            </Stack>
                    }

                    {
                        search && 
                        listPelancong?.data?.data?.length !== 0 && 
                        listPelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length === 0 && 
                        <Flex 
                            flex='1' 
                            justifyContent='center' 
                            alignItems='center'
                            padding='24px'
                        >
                            <Stack 
                                direction='row' 
                                space='4px' 
                                alignItems='center'
                            >
                                <Icon 
                                    as={MaterialIcons} 
                                    name='info' 
                                    color='gray.600' 
                                    size='md' 
                                />
                                <Text
                                    fontFamily='Poppins-SemiBold' 
                                    fontSize='11px'
                                    color='gray.600'
                                    textAlign='center'
                                >Pelancong dengan kata kunci {search} tidak ditemukan</Text>
                            </Stack>
                        </Flex>
                    }
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
            >
                <Button 
                    onPress={() => navigation.navigate('Akun', { 
                        screen: 'add-data-pelancong',
                        params: {
                            callbackSuccess: () => queryClient?.invalidateQueries('get-pelancong')
                        },
                    })}
                >
                    Tambah Data Pelancong
                </Button>
            </Stack>

            <Modal isOpen={loading} avoidKeyboard size="sm">
                <Modal.Content>
                    <Modal.Body>
                        <Stack 
                            direction='row' 
                            alignItems='center' 
                            justifyContent='center'
                            space='10px'
                        >
                            <Spinner color='lancPrimaryLight' size='sm' />
                            <Text
                                fontFamily='Poppins-Regular' 
                                fontSize='13px'
                                color='lancPrimaryLight'
                            >Menambahkan pelancong ...</Text>
                        </Stack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Flex>
    )
}

export default DataPelancongScreen