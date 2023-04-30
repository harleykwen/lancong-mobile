import React from 'react'
import { IC_DARK_MODE, IC_LIGHT_MODE } from '../../assets'
import {
    Image,
    Pressable,
    Stack,
    useColorMode,
    useColorModeValue,
} from 'native-base'

const ButtonColorMode = () => {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
        <Stack>
            {
                colorMode === 'light' &&
                <Pressable
                    backgroundColor={useColorModeValue(`lancBackgroundLight`, `lancBackgroundDark`)}
                    shadow='1'
                    padding='4px'
                    rounded='full'
                    onPress={toggleColorMode}
                >
                    <Image
                        alt='IC_LIGHT_MODE'
                        source={IC_LIGHT_MODE}
                        width='26px'
                        height='26px'
                        margin='3px'
                        tintColor='yellow.400' 
                    /> 
                </Pressable>
            }
            {
                colorMode === 'dark' &&
                <Pressable
                    backgroundColor={useColorModeValue(`lancBackgroundLight`, `lancBackgroundDark`)}
                    shadow='1'
                    padding='4px'
                    rounded='full'
                    onPress={toggleColorMode}
                >
                    <Image
                        alt='IC_DARK_MODE'
                        source={IC_DARK_MODE}
                        width='32px'
                        height='32px'
                        tintColor={useColorModeValue('lancSurfaceLight', 'lancSurfaceDark')} 
                    /> 
                </Pressable>
            }
        </Stack>
    )
}

export default ButtonColorMode