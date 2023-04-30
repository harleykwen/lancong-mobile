import React from 'react'
import { useTranslation } from 'react-i18next'
import { IC_EN, IC_ID } from '../../assets'
import {
    Image,
    Pressable,
    Stack,
    useColorModeValue,
} from 'native-base'

const ButtonLanguage: React.FC = () => {
    const { i18n } = useTranslation()
    const selectedLanguageCode = i18n.language

    function setLanguage(code: any) {
        return i18n.changeLanguage(code)
    }

    return (
        <Stack>
            {
                selectedLanguageCode === 'id' &&
                <Pressable
                    backgroundColor={useColorModeValue(`lancBackgroundLight`, `lancBackgroundDark`)}
                    shadow='1'
                    padding='4px'
                    rounded='full'
                    onPress={() => setLanguage('en')}
                >
                    <Image
                        alt='IC_ID'
                        source={IC_ID}
                        width='32px'
                        height='32px'
                    /> 
                </Pressable>
            }
            {
                selectedLanguageCode === 'en' &&
                <Pressable
                    backgroundColor={useColorModeValue(`lancBackgroundLight`, `lancBackgroundDark`)}
                    shadow='1'
                    padding='4px'
                    rounded='full'
                    onPress={() => setLanguage('id')}
                >
                    <Image
                        alt='IC_EN'
                        source={IC_EN}
                        width='32px'
                        height='32px'
                    /> 
                </Pressable>
            }
        </Stack>
    )
}

export default ButtonLanguage