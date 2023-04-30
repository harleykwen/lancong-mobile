import React from 'react'
import { ROUTE_NAME } from '../routeName'
import {
    Text,
    Flex,
    Pressable,
    Image,
    useColorModeValue,
} from 'native-base'

const MainNavigatorTabItem: React.FC<any> = (props: any) => {
    const {
        state,
        descriptors,
        navigation,
    } = props

    return (
        <Flex
            height='75px'
            shadow='9'
            backgroundColor={useColorModeValue('lancBackgroundLight', 'lancBackgroundDark')}
            flexDirection='row'
        >
            {
                state?.routes?.map((route: any, index: number) => {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name

                    const isFocused = state.index === index

                    const handlePress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true })
                        }
                    }

                    return (
                        <Pressable
                            key={index}
                            flex={1}
                            onPress={handlePress}
                            height='75px'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Image 
                                alt={`${options.tabBarIcon}`}
                                source={options.tabBarIcon} 
                                width='24px' 
                                height='24px'
                                marginBottom='4px'
                                tintColor={
                                    isFocused
                                        ?   useColorModeValue('lancPrimaryLight', 'lancPrimaryDark')
                                        :   useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')
                                }
                            />
                            <Text 
                                fontSize='12px'
                                color={
                                    isFocused
                                        ?   useColorModeValue('lancOnBackgroundLight', 'lancOnBackgroundDark')
                                        :   useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')
                                }
                            >{label}</Text>
                        </Pressable>
                    )
                })
            }
        </Flex>
    )
}

export default MainNavigatorTabItem