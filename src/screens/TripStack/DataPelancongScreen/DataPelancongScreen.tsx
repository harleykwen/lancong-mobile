import React, { useEffect, useState } from 'react'
import PickPelancongItem from './components/PickPelancongItem'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from '../../../components'
import { useQuery } from 'react-query'
import { getPelancongApi } from '../../../apis/pelancong.api'
import 
{ 
    Button,
    Flex, 
    Icon, 
    Input, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'

interface IDataPelancongScreen {
    navigation: any
    route: any
}

const DataPelancongScreen = (props: IDataPelancongScreen) => {
    const { navigation, route } = props
    const { 
        pelancong,
        setPelancong,
        index, 
        onSelectPelancong,
    } = route?.params

    const [search, setSearch] = useState<string>('')

    const listPelancong = useQuery('get-pelancong', getPelancongApi)

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title='Pilih Pelancong'
                onPressBack={() => navigation.goBack()}
            />
            <Stack padding='16px'>
                <Input 
                    height='50px'
                    borderWidth='0px' 
                    backgroundColor='gray.100' 
                    rounded='full' 
                    fontSize='14px'
                    fontFamily='Poppins-Regular'
                    paddingY='8px'
                    placeholder='Cari pelancong ...'
                    InputLeftElement={<Icon as={MaterialIcons} name='search' color='gray.400' size='lg' marginLeft='16px' />}
                    value={search}
                    onChangeText={(e: any) => {
                        setSearch(e)
                        console.log(listPelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(e?.toLowerCase())))
                    }}
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

            <ScrollView>
                <Stack flex='1' paddingBottom='70px'>
                    {listPelancong?.data?.length === 0 &&
                        <Flex 
                            flex='1' 
                            justifyContent='center' 
                            alignItems='center'
                            padding='16px'
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

                    {!search && listPelancong?.data?.length !== 0 &&
                        <Stack 
                            backgroundColor='white' 
                            padding='16px' 
                            space='8px'
                        >
                            {listPelancong?.data?.map((p: any, i: number) => {
                                if (pelancong?.find((x: any) => x?.id === p?.id) === undefined) {
                                    return (
                                        <PickPelancongItem 
                                            key={i} 
                                            data={p} 
                                            onSelectPelancong={onSelectPelancong}
                                            index={index}
                                        />
                                    )
                                }
                            })}
                        </Stack>
                    }

                    {
                        search && 
                        listPelancong?.data?.length !== 0 && 
                        listPelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length !== 0 && 
                            <Stack 
                                backgroundColor='white' 
                                padding='16px' 
                                space='8px'
                            >
                                {listPelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.map((p: any, i: number) => {
                                    if (pelancong?.find((x: any) => x?.id === p?.id) === undefined) {
                                        return (
                                            <PickPelancongItem 
                                                key={i} 
                                                data={p} 
                                                onSelectPelancong={onSelectPelancong}
                                                index={index}
                                            />
                                        )
                                    }
                                })}
                            </Stack>
                    }

                    {
                        search && 
                        listPelancong?.data?.length !== 0 && 
                        listPelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length === 0 && 
                        <Flex 
                            flex='1' 
                            justifyContent='center' 
                            alignItems='center'
                            padding='16px'
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
                    height='50px'
                    borderRadius='8px'
                    backgroundColor='xprimary.50'
                    width='full'
                    _pressed={{
                        backgroundColor: 'xprimary.40'
                    }}
                    onPress={() => navigation.navigate('Akun', { 
                        screen: 'add-data-pelancong',
                        params: {
                            callbackSuccess: null
                        },
                    })}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                        color='white'
                    >Tambah Data Pelancong</Text>
                </Button>
            </Stack>
        </Flex>
    )
}

export default DataPelancongScreen