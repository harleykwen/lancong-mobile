import React, { memo } from 'react'
import { Actionsheet } from 'native-base'

interface IActionSheetUploadIdCard {
    isOpen: boolean
    onClose: any
    launchCamera: any
    launchImageLibrary: any
}

const ActionSheetUploadIdCard: React.FC<IActionSheetUploadIdCard> = (props: IActionSheetUploadIdCard) => {
    const { 
        isOpen, 
        onClose, 
        launchCamera,
        launchImageLibrary,
    } = props

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Actionsheet.Item onPress={launchCamera}>Buka Kamera</Actionsheet.Item>
                <Actionsheet.Item onPress={launchImageLibrary}>Buka Galeri</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetUploadIdCard)