import React, { memo } from 'react'
import { Actionsheet, Stack, Text } from 'native-base'

interface ISearchLocationBottomSheet {
    isOpen: boolean
    onClose: any
}

const SearchLocationBottomSheet: React.FC<ISearchLocationBottomSheet> = (props: ISearchLocationBottomSheet) => {
    const { isOpen, onClose } = props

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content alignItems='flex-start' paddingBottom='100px'>
                <Stack bg='red.100' width='100%'>
                    <Text>Cari Lokasi</Text>
                </Stack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(SearchLocationBottomSheet)