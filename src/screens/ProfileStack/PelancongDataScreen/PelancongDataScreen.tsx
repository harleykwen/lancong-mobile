import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from '../../../components'
import { getPelancongApi } from '../../../apis/pelancong.api'
import { useQuery, useQueryClient } from 'react-query'
import { 
    Button,
    Flex, 
    Icon, 
    Input, 
    Pressable, 
    Stack,
    Text, 
} from 'native-base'
import PelancongItem from './components/PelancongItem'

interface IPelancongDataScreen {
    navigation: any
}

const PelancongDataScreen = (props: IPelancongDataScreen) => {
    const { navigation } = props
    const queryClient = useQueryClient()

    const [search, setSearch] = useState<string>('')

    const pelancong = useQuery('get-pelancong', getPelancongApi)

    return (
        <Flex flex='1' backgroundColor='white' paddingBottom='100px'>
            <Header
                title='Data Pelancong'
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
                        console.log(pelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(e?.toLowerCase())))
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

            {pelancong?.data?.length === 0 &&
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

            {!search && pelancong?.data?.length !== 0 &&
                <Stack 
                    backgroundColor='white' 
                    padding='16px' 
                    space='8px'
                >
                    {pelancong?.data?.map((pelancong: any, index: number) => {
                        return <PelancongItem data={pelancong} key={index} />
                    })}
                </Stack>
            }

            {
                search && 
                pelancong?.data?.length !== 0 && 
                pelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length !== 0 && 
                    <Stack 
                        backgroundColor='white' 
                        padding='16px' 
                        space='8px'
                    >
                        {pelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.map((pelancong: any, index: number) => {
                            return <PelancongItem data={pelancong} key={index} />
                        })}
                    </Stack>
            }

            {
                search && 
                pelancong?.data?.length !== 0 && 
                pelancong?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length === 0 && 
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

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='16px'
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
                    onPress={() => navigation.push('add-data-pelancong', {
                        callbackSuccess: function() {
                            queryClient?.invalidateQueries('get-pelancong')
                        }
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

export default PelancongDataScreen