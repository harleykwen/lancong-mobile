import React, { memo } from 'react'
import { 
    Actionsheet, 
    Stack, 
    Text, 
} from 'native-base'

interface IActionSheetDetail {
    disclosure: any
    data: any
}

const ActionSheetDetail: React.FC<IActionSheetDetail> = (props: IActionSheetDetail) => {
    const { disclosure, data} = props

    const baseStylePressedTextComponent: object = {
        fontFamily: 'Poppins-Medium',
        marginLeft: '8px',
        fontSize: '11px',
        marginTop: '2px',
    }

    console.log(data)

    return (
        <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <Actionsheet.Content
                padding='16px'
                backgroundColor='lancBackgroundLight'
                alignItems='flex-start'
            >
                <Stack width='100%' space='20px'>
                    <Stack space='10px' width='100%'>
                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Daftar Pelancong</Text>
                        {data?.order?.participants?.map((v: any, i: number) => {
                            return (
                                <Text {...baseStylePressedTextComponent} key={i}>
                                    {i + 1}. {v?.name}
                                </Text>
                            )
                        })}
                    </Stack>

                    <Stack space='10px' width='100%'>
                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Permintaan Khusus</Text>
                        {data?.order?.special_requests?.find((x: any) => x?.amount !== 0) && data?.order?.special_requests?.map((v: any, i: number) => {
                            if (v?.amount) return (
                                <Text {...baseStylePressedTextComponent} key={i}>
                                    {v?.amount !== 0 && `${i+1}. ${v?.type} (${v?.amount} pcs)`}
                                </Text>
                            )
                            return null
                        })}

                        {!data?.order?.special_requests?.find((x: any) => x?.amount !== 0) &&
                            <Text {...baseStylePressedTextComponent}>-</Text>
                        }
                    </Stack>
                </Stack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetDetail)