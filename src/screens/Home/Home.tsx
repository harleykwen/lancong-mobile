import React, { useEffect, useState } from 'react'
import * as Icon from "react-native-unicons"
import { 
    Box,
    Center, 
    Flex, 
    HStack, 
    Input, 
    InputGroup, 
    Pressable, 
    Text, 
    VStack,
} from 'native-base'
import { getUserData } from '../../apis/config'

interface IHome {
    navigation: any
}

const Home = (props: IHome) => {
    const { navigation } = props

    const [user, setUser] = useState<any>(null)
    
    async function handleGetUserData() {
        const user = await getUserData()
        console.log(user)
        setUser(user)
    }

    useEffect(() => {
        handleGetUserData()
    }, [])

    return (
        <Flex backgroundColor='white' flex={1}>
            <VStack padding={'20px'} backgroundColor={'#038103'} space={'10px'}>
                <InputGroup backgroundColor={'white'} rounded={'full'} alignItems='center'>
                    <Box marginLeft='20px'>
                        <Icon.Search color="black" width={16} />
                    </Box>
                    <Input 
                        flex={1} 
                        placeholder={'Mau ngelancong kemana?'} 
                        backgroundColor={'white'}
                        outlineColor='white'
                        borderColor='white'
                        focusOutlineColor='white'
                        marginRight='20px'
                    />
                </InputGroup>
                <HStack space={'10px'}>
                    <Center flex={1} padding={'5px'} backgroundColor={'white'} rounded={'md'}>
                        <Icon.User color="black" />
                        <Text fontSize='12px'>{user?.name??''}</Text>
                    </Center>
                    <Center flex={1} padding={'5px'} backgroundColor={'white'} rounded={'md'}>
                        <Icon.Wallet color="black" />
                        <Text fontSize='12px'>IDR 0</Text>
                    </Center>
                    <Center flex={1} padding={'5px'} backgroundColor={'white'} rounded={'md'}>
                        <Icon.Package color="black" />
                        <Text fontSize='12px'>GOLD</Text>
                    </Center>
                </HStack>
            </VStack>
            <HStack shadow='1' space={'10px'} margin={'20px'} backgroundColor={'white'} padding={'10px'} rounded={'lg'}>
                <VStack space={'5px'} justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Pressable 
                        alignItems='center' 
                        justifyContent='center' 
                        height={'50px'} 
                        width={'50px'} 
                        rounded={'full'} 
                        backgroundColor={'#131391'}
                        onPress={() => navigation.push('search-trip')}
                    >
                        <Icon.Map color="white" />
                    </Pressable>
                    <Text fontSize='12px'>Trip</Text>
                </VStack>
                <VStack space={'5px'} justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Center height={'50px'} width={'50px'} rounded={'full'} backgroundColor={'#e2c403'}>
                        <Icon.Building color="white" />
                    </Center>
                    <Text fontSize='12px'>Hotel</Text>
                </VStack>
                <VStack space={'5px'} justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Center height={'50px'} width={'50px'} rounded={'full'} backgroundColor={'#4ffc8e'}>
                        <Icon.Plane color="white" />
                    </Center>
                    <Text fontSize='12px'>Pesawat</Text>
                </VStack>
                <VStack space={'5px'} justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Center height={'50px'} width={'50px'} rounded={'full'} backgroundColor={'#6eaf17'}>
                        <Icon.Subway color="white" />
                    </Center>
                    <Text fontSize='12px'>Kereta</Text>
                </VStack>
            </HStack>
        </Flex>
    )
}

export default Home