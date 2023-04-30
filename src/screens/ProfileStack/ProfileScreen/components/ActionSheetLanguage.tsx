import React, { memo } from 'react'
import { IC_EN, IC_ID } from '../../../../assets'
import {
    Actionsheet,
    Image,
    Pressable,
    Stack,
    Text,
} from 'native-base'
import i18next from 'i18next'

interface IActionSheetLanguage {
    isOpen: boolean
    onClose: any
}

const ActionSheetLanguage: React.FC<IActionSheetLanguage> = (props: IActionSheetLanguage) => {
    const { isOpen, onClose } = props

    function setLanguage(code: any) {
        i18next.changeLanguage(code)
        return onClose()
    }

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <Pressable padding='16px' onPress={() => setLanguage('id')}>
                    <Stack 
                        direction='row' 
                        alignItems='center' 
                        space='16px'
                    >
                        <Image
                            alt='IC_ID'
                            source={IC_ID}
                            width='32px'
                            height='32px'
                        />
                        <Text textAlign='left'>Bahasa</Text>
                    </Stack>
                </Pressable>
                <Pressable padding='16px' onPress={() => setLanguage('en')}>
                    <Stack 
                        direction='row' 
                        alignItems='center' 
                        space='16px'
                    >
                        <Image
                            alt='IC_EN'
                            source={IC_EN}
                            width='32px'
                            height='32px'
                        />
                        <Text textAlign='left'>English</Text>
                    </Stack>
                </Pressable>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetLanguage)