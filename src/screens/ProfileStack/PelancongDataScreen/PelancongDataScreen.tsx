import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PelancongItem from './components/PelancongItem'
import { ROUTE_NAME } from '../../../router'
import { IC_ARROW_BACK } from '../../../assets'
import { useTranslation } from 'react-i18next'
import { getPelancongApi } from '../../../apis/pelancong'
import { useQuery, useQueryClient } from 'react-query'
import { 
    Button,
    Flex, 
    Icon, 
    Image, 
    Input, 
    Pressable, 
    Stack,
    Text, 
} from 'native-base'

interface IPelancongDataScreen {
    navigation: any
}

const PelancongDataScreen = (props: IPelancongDataScreen) => {
    const { navigation } = props
    const queryClient = useQueryClient()
    const {t } = useTranslation()

    const [search, setSearch] = useState<string>('')

    const pelancong = useQuery('get-pelancong', getPelancongApi)

    return (
        <Flex flex='1' backgroundColor='white' paddingBottom='100px'>
            <Stack 
                paddingY='16px'
                paddingX='24px'
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                direction='row'
                alignItems='center'
                space='16px'
            >
                <Pressable onPress={() => navigation?.goBack()}>
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>{t('common:list_pelancong_title')}</Text>
            </Stack>
            <Stack padding='24px'>
                <Input 
                    height='50px'
                    borderWidth='0px' 
                    backgroundColor='gray.100' 
                    rounded='full' 
                    fontSize='14px'
                    fontFamily='Poppins-Regular'
                    paddingY='8px'
                    placeholder={`${t('common:list_pelancong_input_search_placeholder')}`}
                    InputLeftElement={<Icon as={MaterialIcons} name='search' color='gray.400' size='lg' marginLeft='16px' />}
                    value={search}
                    onChangeText={(e: any) => {
                        setSearch(e)
                        console.log(pelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(e?.toLowerCase())))
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

            {pelancong?.data?.data?.length === 0 &&
                <Flex 
                    flex='1' 
                    justifyContent='center' 
                    alignItems='center'
                    padding='24px'
                    marginTop='-24px'
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
                        >{t('common:list_pelancong_empty')}</Text>
                    </Stack>
                </Flex>
            }

            {!search && pelancong?.data?.data?.length !== 0 &&
                <Stack 
                    backgroundColor='white' 
                    padding='24px'
                    marginTop='-24px' 
                    space='8px'
                >
                    {pelancong?.data?.data?.map((pelancong: any, index: number) => {
                        return <PelancongItem data={pelancong} key={index} />
                    })}
                </Stack>
            }

            {
                search && 
                pelancong?.data?.data?.length !== 0 && 
                pelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length !== 0 && 
                    <Stack 
                        backgroundColor='white' 
                        padding='24px'
                        marginTop='-24px' 
                        space='8px'
                    >
                        {pelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.map((pelancong: any, index: number) => {
                            return <PelancongItem data={pelancong} key={index} />
                        })}
                    </Stack>
            }

            {
                search && 
                pelancong?.data?.data?.length !== 0 && 
                pelancong?.data?.data?.filter((x: any) => x?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.length === 0 && 
                <Flex 
                    flex='1' 
                    justifyContent='center' 
                    alignItems='center'
                    padding='24px'
                    marginTop='-24px'
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
                        >{t('common:list_pelancong_search_not_found', { key: search })}</Text>
                    </Stack>
                </Flex>
            }

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='24px'
                backgroundColor='white'
                alignItems='center'
                position='absolute'
                bottom='0px'
                left='0px'
                right='0px'
                shadow='5'
            >
                <Button 
                    onPress={() => navigation.push(ROUTE_NAME.PROFILE_NAVIGATOR_ADD_PELANCONG_DATA, {
                        callbackSuccess: function() {
                            queryClient?.invalidateQueries('get-pelancong')
                        }
                    })}
                >
                    {t('common:list_pelancong_button_add_pelancong')}
                </Button>
            </Stack>
        </Flex>
    )
}

export default PelancongDataScreen