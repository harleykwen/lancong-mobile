import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
    Flex, 
    Icon, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'
import { removeAuthToken, removeUserData } from '../../../apis/config'

interface IProfileScreen {
    navigation: any
}

const ProfileScreen = (props: IProfileScreen) => {
    const { navigation } = props

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

    async function handleLogout() {
        await removeAuthToken()
        await removeUserData()
        navigation.replace('login')
    }

    return (
        <Flex flex='1' backgroundColor='gray.100'>
            <Stack space='10px'>
                <Pressable
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={() => navigation?.push('data-pelancong')}
                    backgroundColor='white'
                >
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='account-group' 
                        color='gray.400' 
                        size='lg' 
                    />
                    <Text {...baseStylePressedTextComponent}>
                        Simpan Data Pelancong
                    </Text>
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='chevron-right' 
                        color='gray.400' 
                        size='lg' 
                        marginLeft='auto'
                    />
                </Pressable>
                <Pressable
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={handleLogout}
                    backgroundColor='white'
                >
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='logout' 
                        color='red.400' 
                        size='lg' 
                    />
                    <Text {...baseStylePressedTextComponent} color='red.400'>
                        Keluar
                    </Text>
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='chevron-right' 
                        color='red.400' 
                        size='lg' 
                        marginLeft='auto'
                    />
                </Pressable>
            </Stack>
        </Flex>
    )
}

export default ProfileScreen