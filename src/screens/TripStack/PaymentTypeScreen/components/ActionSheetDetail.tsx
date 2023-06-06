import React, { memo } from 'react'
import { 
    Actionsheet, 
    Image, 
    Link, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

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
                <ScrollView>
                    <Stack width='100%' space='20px'>
                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Waktu Trip</Text>
                            <Text {...baseStylePressedTextComponent}>
                                {format(new Date(data?.order?.trip_start), 'EEEE, dd MMMM yyyy', { locale: id })} - {format(new Date(data?.order?.trip_end), 'EEEE, dd MMMM yyyy', { locale: id })}
                            </Text>
                        </Stack>

                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Durasi Trip</Text>
                            <Text {...baseStylePressedTextComponent}>
                                {data?.order[data?.order?.group]?.duration?.day} hari {data?.order[data?.order?.group]?.duration?.day} malam
                            </Text>
                        </Stack>

                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Lokasi Trip</Text>
                            <Text {...baseStylePressedTextComponent}>
                                {data?.order?.trip?.location?.name}
                            </Text>
                            <Text {...baseStylePressedTextComponent} marginTop='-10px'>
                                {data?.order?.trip?.location?.address}
                            </Text>
                            <Link href={data?.order?.trip?.location?.maps_url}>
                                <Text 
                                    {...baseStylePressedTextComponent} 
                                    color='lancPrimaryLight' 
                                    fontFamily='Poppins-SemiBold'
                                >
                                    Lihat di Maps
                                </Text>
                            </Link>
                        </Stack>

                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Titik Berkumpul</Text>
                            <Text {...baseStylePressedTextComponent}>
                                {data?.order[data?.order?.group]?.meeting_point?.name}
                            </Text>
                            <Text {...baseStylePressedTextComponent} marginTop='-10px'>
                                {data?.order[data?.order?.group]?.meeting_point?.address}
                            </Text>
                            <Link href={data?.order[data?.order?.group]?.meeting_point?.maps_url}>
                                <Text 
                                    {...baseStylePressedTextComponent} 
                                    color='lancPrimaryLight' 
                                    fontFamily='Poppins-SemiBold'
                                >
                                    Lihat di Maps
                                </Text>
                            </Link>
                        </Stack>

                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Daftar Pelancong</Text>
                            <Stack space='0px'>
                                {data?.order?.participants?.map((v: any, i: number) => {
                                    return (
                                        <Text {...baseStylePressedTextComponent} key={i}>
                                            {i + 1}. {v?.name}
                                        </Text>
                                    )
                                })}
                            </Stack>
                        </Stack>

                        <Stack space='10px' width='100%'>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>Permintaan Khusus</Text>
                            <Stack space='0px'>
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
                    </Stack>
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetDetail)