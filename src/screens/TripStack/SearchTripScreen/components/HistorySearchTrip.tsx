import React, { memo } from 'react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { ROUTE_NAME } from '../../../../router'
import { 
    IC_CALENDAR_MONTH, 
    IC_HIKING, 
    IC_LOCATION_ON, 
} from '../../../../assets'
import { 
    Center, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'

interface IHistorySearchTrip {
    historySearchTrip: any
    clearHistorySearchTrip: any
    navigation: any
}

const HistorySearchTrip: React.FC<IHistorySearchTrip> = (props: IHistorySearchTrip) => {
    const { 
        historySearchTrip, 
        clearHistorySearchTrip, 
        navigation, 
    } = props

    function clickHistory(history: any) {
        navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_LIST_STRIP, {
            type: history?.type,
            destination: history?.destination,
            group: history?.group,
            tripStart: new Date(history?.tripStart),
            participant: history?.participant,
        })
    }

    return (
        <Stack 
            rounded='xl'
            space='16px' 
            backgroundColor='lancBackgroundLight'
            shadow='3'
        >
            <Stack 
                direction='row' 
                alignItems='center' 
                justifyContent='space-between'
                marginX='16px' 
                marginTop='16px' 
                marginBottom={historySearchTrip === null ? '16px' : '0px'}
            >
                <Text fontFamily='Poppins-SemiBold'>Pencarian Terakhir</Text>
                {
                    historySearchTrip !== null &&
                    historySearchTrip?.length > 0 &&
                    <Pressable onPress={clearHistorySearchTrip}>
                        <Text 
                            fontFamily='Poppins-SemiBold' 
                            fontSize='10px' 
                            color='gray.400'
                        >Bersihkan</Text>
                    </Pressable>
                }
            </Stack>
            {
                historySearchTrip !== null &&
                historySearchTrip?.length > 0 &&
                <ScrollView horizontal={true}>
                    <Stack 
                        paddingX='16px' 
                        paddingBottom='16px' 
                        direction='row' 
                        space='8px'
                    >
                        {historySearchTrip?.map((history: any, index: number) => {
                            console.log(history)
                            return (
                                <Pressable key={index} onPress={() => clickHistory(history)}>
                                    <Stack 
                                        backgroundColor='white' 
                                        shadow='3'
                                        padding='8px'
                                        rounded='md'
                                    >
                                        <Stack 
                                            direction='row' 
                                            alignItems='center' 
                                            space='16px'
                                        >
                                            <Stack 
                                                direction='row' 
                                                alignItems='center' 
                                                space='2px'
                                            >
                                                <Image
                                                    alt='IC_LOCATION_ON'
                                                    source={IC_LOCATION_ON}
                                                    width='18px'
                                                    height='18px'
                                                    tintColor='gray.400'
                                                />
                                                <Text fontSize='10px' fontFamily='Poppins-SemiBold'>{history?.destination?.name??'-'}</Text>
                                            </Stack>
                                            <Center rounded='sm' backgroundColor='gray.100' padding='2px'>
                                                <Text 
                                                    fontSize='10px' 
                                                    textTransform='capitalize' 
                                                    fontFamily='Poppins-SemiBold'
                                                    color='gray.400'
                                                >{history?.group}</Text>
                                            </Center>
                                        </Stack>
                                        <Stack
                                            direction='row' 
                                            alignItems='center' 
                                            space='2px'
                                            marginTop='8px'
                                        >
                                            <Image
                                                alt='IC_CALENDAR_MONTH'
                                                source={IC_CALENDAR_MONTH}
                                                width='18px'
                                                height='18px'
                                                tintColor='gray.400'
                                            />
                                            <Text fontSize='10px' marginTop='3px'>{history?.tripStart ? format(new Date(history?.tripStart), 'dd MMM yyyy', { locale: id }) : '-'}</Text>
                                        </Stack>
                                        <Stack
                                            direction='row' 
                                            alignItems='center' 
                                            space='2px'
                                            marginTop='2px'
                                        >
                                            <Image
                                                alt='IC_HIKING'
                                                source={IC_HIKING}
                                                width='18px'
                                                height='18px'
                                                tintColor='gray.400'
                                            />
                                            <Text fontSize='10px' marginTop='3px' textTransform='capitalize'>{history?.participant !== "" ? history?.participant : '-'}</Text>
                                        </Stack>
                                    </Stack>
                                </Pressable>
                            )
                        })}
                    </Stack>
                </ScrollView>
            }
            {
                historySearchTrip !== null &&
                historySearchTrip?.length === 0 &&
                <Text 
                    color='gray.400' 
                    fontSize='12px'
                    marginX='16px' 
                    marginBottom='16px' 
                >Belum ada pencarian</Text>
            }
        </Stack>
    )
}

export default memo(HistorySearchTrip)