import React, { memo, useMemo } from 'react'
import * as Icon from 'react-native-unicons'
import { Dimensions } from 'react-native'
import { ROUTE_NAME } from '../../../router'
import { 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

type TCategories = {
    navigation: any
}

type TCategory = {
    label: string
    icon: React.ReactElement
    onPress: () => void
}

const Categories: React.FC<TCategories> = (props: TCategories) => {
    const { navigation } = props

    const SCREEN_WIDTH: number = useMemo(() => Dimensions.get('window').width, [])
    const SCREEN_PADDING: number = useMemo(() => 16 * 2, [])
    const SCREEN_WIDTH_WITH_PADDING: number = useMemo(() => SCREEN_WIDTH - SCREEN_PADDING, [])
    const CATEGORY_PER_ROW: number = useMemo(() => 3, [])
    const CATEGORY_WIDTH: number = useMemo(() => (SCREEN_WIDTH_WITH_PADDING / CATEGORY_PER_ROW) - 6, [])

    const categories: TCategory[] = useMemo(() => [
        {
            label: 'Trip',
            icon: <Icon.Map color="#006e01" />,
            onPress: () => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR, { 
                screen: ROUTE_NAME.TRIP_NAVIGATOR_SEARCH_STRIP,
                params: {
                    place: '',
                },
            }),
        },
        {
            label: 'Hotel',
            icon: <Icon.Building color="#006e01" />,
            onPress: () => null,
        },
        {
            label: 'Kereta',
            icon: <Icon.Plane color="#006e01" />,
            onPress: () => null,
        },
        {
            label: 'Pesawat',
            icon: <Icon.Subway color="#006e01" />,
            onPress: () => null,
        },
    ], [])

    return (
        <Stack padding='16px'>
            <Text
                fontSize='14px'
                color='#101010'
                fontFamily='Poppins-SemiBold'
            >Kategori</Text>
            <Stack
                direction='row'
                flex={1}
                flexWrap='wrap'
            >
                {
                    categories?.map((category: TCategory, categoryIndex: number) => {
                        return (
                            <Pressable
                                key={categoryIndex}
                                onPress={category?.onPress && category?.onPress}
                            >
                                <Stack
                                    space='4px'
                                    marginTop='8px'
                                    backgroundColor='#ffffff'
                                    borderWidth='1px'
                                    borderColor='#e5e5e5'
                                    borderRadius='4px'
                                    justifyContent='center'
                                    alignItems='center'
                                    marginLeft={categoryIndex === 0 || categoryIndex % 3 === 0 ? '0px' : '8px'}
                                    width={CATEGORY_WIDTH}
                                    height={CATEGORY_WIDTH}
                                >
                                    {category?.icon}
                                    <Text
                                        fontSize='12px'
                                        color='#101010'
                                        fontFamily='Poppins-Regular'
                                    >{category?.label}</Text>
                                </Stack>
                            </Pressable>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}

export default memo(Categories)