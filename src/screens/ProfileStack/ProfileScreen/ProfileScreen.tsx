import React, { useState } from 'react'
import ActionSheetLanguage from './components/ActionSheetLanguage'
import { useQuery } from 'react-query'
import { logoutApi } from '../../../apis/auth'
import { ROUTE_NAME } from '../../../router'
import { useTranslation } from 'react-i18next'
import { ASYNC_STORAGE_NAME, asyncStorageDeleteitem } from '../../../asyncStorage'
import { 
    IC_CHEVRON_RIGHT, 
    IC_GROUP, 
    IC_LANGUAGE, 
    IC_LOGOUT, } 
from '../../../assets'
import { 
    Flex, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface IProfileScreen {
    navigation: any
}

const ProfileScreen = (props: IProfileScreen) => {
    const { navigation } = props
    const { t } = useTranslation()

    const baseStylePressedComponent: object = {
        height:'50px',
        backgroundColor:'gray.200',
        paddingX:'16px',
        paddingY:'8px',
        flexDirection:'row',
        alignItems:'center',
        _pressed:{
            backgroundColor: 'gray.300'
        }
    }

    const baseStylePressedTextComponent: object = {
        fontFamily: 'Poppins-Medium',
        marginLeft: '8px',
        fontSize: '11px',
        marginTop: '2px',
    }

    const [isActionSheetLanguageVisible, setIsActionSheetLanguageVisible] = useState(false)

    const logout = useQuery('logout', logoutApi, { 
        enabled: false,
        onSuccess: async () => {
            await asyncStorageDeleteitem(ASYNC_STORAGE_NAME.AUTH_TOKEN)
            await asyncStorageDeleteitem(ASYNC_STORAGE_NAME.AUTH_SECRET)
            navigation?.replace(ROUTE_NAME.AUTH_NAVIGATOR, {
                screen: ROUTE_NAME.AUTH_NAVIGATOR_SIGN_IN,
            })
        } 
    })

    return (
        <Flex flex='1' backgroundColor='gray.100'>
            <Stack space='10px'>
                <Pressable
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={() => {
                        navigation?.push(ROUTE_NAME.PROFILE_NAVIGATOR, { 
                            screen: ROUTE_NAME.PROFILE_NAVIGATOR_PELANCONG_DATA,
                        })
                    }}
                    backgroundColor='white'
                    alignItems='center'
                >
                    <Image 
                        alt='IC_GROUP'
                        source={IC_GROUP} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancSurfaceLight'
                    />
                    <Text {...baseStylePressedTextComponent}>
                        {t('common:profile_add_pelancong_data')}
                    </Text>
                    <Image 
                        alt='IC_CHEVRON_RIGHT'
                        source={IC_CHEVRON_RIGHT} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancSurfaceLight'
                        marginLeft='auto'
                    />
                </Pressable>
                <Pressable
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={() => setIsActionSheetLanguageVisible(true)}
                    backgroundColor='white'
                    alignItems='center'
                >
                    <Image 
                        alt='IC_LANGUAGE'
                        source={IC_LANGUAGE} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancSurfaceLight'
                    />
                    <Text {...baseStylePressedTextComponent}>
                        {t('common:profile_change_language')}
                    </Text>
                    <Image 
                        alt='IC_CHEVRON_RIGHT'
                        source={IC_CHEVRON_RIGHT} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancSurfaceLight'
                        marginLeft='auto'
                    />
                </Pressable>
                <Pressable
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={() => logout?.refetch()}
                    backgroundColor='white'
                    alignItems='center'
                >
                    <Image 
                        alt='IC_LOGOUT'
                        source={IC_LOGOUT} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancErrorLight'
                    />
                    <Text {...baseStylePressedTextComponent} color='lancErrorLight'>
                        {t('common:profile_logout')}
                    </Text>
                    <Image 
                        alt='IC_CHEVRON_RIGHT'
                        source={IC_CHEVRON_RIGHT} 
                        width='24px' 
                        height='24px' 
                        tintColor='lancErrorLight'
                        marginLeft='auto'
                    />
                </Pressable>

                <ActionSheetLanguage isOpen={isActionSheetLanguageVisible} onClose={() => setIsActionSheetLanguageVisible(false)} />
            </Stack>
        </Flex>
    )
}

export default ProfileScreen