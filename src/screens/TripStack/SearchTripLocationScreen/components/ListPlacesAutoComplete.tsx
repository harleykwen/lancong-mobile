import React, { memo } from 'react'
import { IC_LOCATION_ON } from '../../../../assets'
import { 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack,
    Text, 
} from 'native-base'

interface IListPlacesAutoComplete {
    data: any[]
    isLoading: boolean
    handleSelectPlace: any
} 

const ListPlacesAutoComplete: React.FC<IListPlacesAutoComplete> = (props: IListPlacesAutoComplete) => {
    const { 
        data, 
        isLoading, 
        handleSelectPlace,
    } = props

    return (
        <ScrollView>
            {data && !isLoading && data?.map((v: any, i: number) => {
                return (
                    <Pressable 
                        key={i} 
                        onPress={() => {
                            handleSelectPlace(v)
                        }
                    }>
                        <Stack
                            direction='row'
                            space='8px'
                            marginBottom='16px'
                            borderBottomWidth='0.5px'
                            borderBottomColor='gray.300'
                            paddingBottom='16px'
                        >
                            <Flex
                                height='37px'
                                width='37px'
                                justifyContent='center'
                                alignItems='center'
                                backgroundColor='lancPrimary.95'
                                rounded='full'
                            >
                                <Image
                                    alt='IC_LOCATION_ON'
                                    source={IC_LOCATION_ON}
                                    width='24px'
                                    height='24px'
                                    tintColor='lancPrimaryLight'
                                />
                            </Flex>
                            <Stack flex='1'>
                                <Text fontFamily='Poppins-SemiBold'>{v?.name}</Text>
                                <Text textBreakStrategy='highQuality' fontFamily='Poppins-Light' fontSize='12px'>{v?.address}</Text>
                            </Stack>
                        </Stack>
                    </Pressable>
                )
            })}

            {isLoading && [...Array(3)]?.map((_, index: number) => {
                return (
                    <Stack
                        key={index}
                        direction='row'
                        space='8px'
                        marginBottom='16px'
                        borderBottomWidth='0.5px'
                        borderBottomColor='gray.300'
                        paddingBottom='16px'
                    >
                        <Flex
                            height='48px'
                            width='48px'
                            justifyContent='center'
                            alignItems='center'
                            backgroundColor='lancPrimary.95'
                            rounded='full'
                        >
                            <Image
                                alt='IC_LOCATION_ON'
                                source={IC_LOCATION_ON}
                                width='24px'
                                height='24px'
                                tintColor='lancPrimaryLight'
                            />
                        </Flex>
                        <Stack width='100%' space='8px'>
                            <Skeleton height='24px' width='50%' />
                            <Stack space='4px'>
                                <Skeleton height='16px' />
                                <Skeleton height='16px' />
                                <Skeleton height='16px' width='75%' />
                            </Stack>
                        </Stack>
                    </Stack>
                )
            })}
        </ScrollView>
    )
}

export default memo(ListPlacesAutoComplete)