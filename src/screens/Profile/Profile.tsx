import React, { useEffect, useState } from 'react'
import { getUserData, removeAuthToken, removeUserData } from '../../apis/config'
import { Input, Stack, Text, Avatar, Flex, Button } from 'native-base'

interface IProfile {
    navigation: any
}

const Profile = (props: IProfile) => {
    const { navigation } = props

    const [user, setUser] = useState<any>(null)

    async function handleGetUserData() {
        const user = await getUserData()
        setUser(user)
    }

    async function handleLogout() {
        await removeAuthToken()
        await removeUserData()
        navigation.replace('login')
    }

    useEffect(() => {
        handleGetUserData()
    }, [])

    return (
        <Stack 
            padding='10px' 
            space='10px' 
            backgroundColor='white' 
            flex='1'
        >
            <Flex direction='row' alignItems='center' justifyContent='space-between'>
                <Avatar bg='gray.300' width='75px' height='75px' source={{ uri: user?.avatar !== '' ? user?.avatar : "https://bit.ly/broken-link" }}>
                    {user?.name ? user?.name[0].toUpperCase() : ''}
                </Avatar>
                <Button colorScheme='error' onPress={handleLogout}>Logout</Button>
            </Flex>
            <Stack space='5px' marginTop='10px'>
                <Text>Nama</Text>
                <Input isReadOnly value={user?.name??''} />
            </Stack>
            <Stack space='5px'>
                <Text>Email</Text>
                <Input isReadOnly value={user?.email??''} />
            </Stack>
            <Stack space='5px'>
                <Text>No. Telepon</Text>
                <Input isReadOnly value={user?.phone??''} />
            </Stack>
        </Stack>
    )
}

export default Profile