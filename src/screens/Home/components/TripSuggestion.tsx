import React, { memo, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { ROUTE_NAME } from '../../../router'
import { 
    Image, 
    Pressable, 
    Skeleton, 
    Stack, 
    Text, 
} from 'native-base'

type TTripSuggestion = {
    navigation: any
    tripSuggestion: any
}

const TripSuggestion: React.FC<TTripSuggestion> = (props: TTripSuggestion) => {
    const { navigation, tripSuggestion } = props

    const SCREEN_WIDTH: number = useMemo(() => Dimensions.get('window').width, [])
    const SCREEN_PADDING: number = useMemo(() => 16 * 2, [])
    const SCREEN_WIDTH_WITH_PADDING: number = useMemo(() => SCREEN_WIDTH - SCREEN_PADDING, [])
    const PLACE_PER_ROW: number = useMemo(() => 3, [])
    const PLACE_WIDTH: number = useMemo(() => (SCREEN_WIDTH_WITH_PADDING / PLACE_PER_ROW) - 6, [])

    return (
        <Stack padding='16px' space='8px'>
            <Text
                fontSize='14px'
                color='#101010'
                fontFamily='Poppins-SemiBold'
            >Rekomendasi Tempat</Text>
            <Stack
                direction='row'
                flex={1}
                flexWrap='wrap'
            >
                {
                    tripSuggestion?.isFetching
                        ?   [...Array(3)]?.map((_, index: number) => {
                                return (
                                    <Stack 
                                        key={index}
                                        backgroundColor='#ffffff'
                                        borderWidth='1px'
                                        borderColor='#e5e5e5'
                                        borderRadius='4px'
                                        overflow='hidden'
                                        marginLeft={index === 0 || index % 3 === 0 ? '0px' : '8px'}
                                        width={PLACE_WIDTH}
                                    >
                                        <Skeleton height={PLACE_WIDTH * 1.5} width={PLACE_WIDTH} />
                                        <Skeleton 
                                            height='18px' 
                                            width={PLACE_WIDTH / 3} 
                                            margin='8px' 
                                        />
                                    </Stack>
                                )
                            })
                        :   tripSuggestion?.data?.data?.map((place: any, placeIndex: number) => {
                                return (
                                    <Pressable 
                                        key={placeIndex} 
                                        onPress={() => {
                                            navigation.push(ROUTE_NAME.TRIP_NAVIGATOR, {
                                                screen: ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP,
                                                params: {
                                                    place: {
                                                        name: place?.name,
                                                        place_id: place?.place_id
                                                    },
                                                },
                                            })
                                        }}
                                    >
                                        <Stack 
                                            backgroundColor='#ffffff'
                                            borderWidth='1px'
                                            borderColor='#e5e5e5'
                                            borderRadius='4px'
                                            overflow='hidden'
                                            marginLeft={placeIndex === 0 || placeIndex % 3 === 0 ? '0px' : '8px'}
                                            width={PLACE_WIDTH}
                                        >
                                            <Image 
                                                source={{uri: place?.photo}} 
                                                alt={place?.photo} 
                                                height={PLACE_WIDTH * 1.5}
                                                width='100%'
                                            />
                                            <Text 
                                                fontFamily='Poppins-Regular' 
                                                fontSize='12px'
                                                margin='8px'
                                            >{place?.name}</Text>
                                        </Stack>
                                    </Pressable>
                                )
                            })
                }
            </Stack>
        </Stack>
    )
}

export default memo(TripSuggestion)