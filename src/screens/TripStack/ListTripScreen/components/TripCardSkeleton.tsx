import React, { memo } from 'react'
import { 
    Flex, 
    Skeleton, 
    Stack, 
} from 'native-base'

const TripCardSkeleton: React.FC = () => {
    return (
        <Flex 
            rounded='lg' 
            shadow='3' 
            backgroundColor='white'
        >
            <Stack direction='row' rounded='lg'>
                <Skeleton 
                    height='150px' 
                    width='40%' 
                    borderTopLeftRadius='lg' 
                    borderBottomLeftRadius='lg' 
                />
                <Stack 
                    padding='8px'
                    width='60%'
                    borderTopRightRadius='lg' 
                    borderBottomRightRadius='lg'
                    space='4px'
                >
                    <Skeleton height='20px' width='60%' />
                    <Skeleton height='12px' width='20%' />
                    <Skeleton height='12px' width='40%' />
                    <Stack 
                        alignItems='flex-end' 
                        justifyContent='space-between' 
                        direction='row'
                        marginTop='auto'
                    >
                        <Stack space='4px' width='50%'>
                            <Skeleton height='12px' width='40%' />
                            <Skeleton height='12px' width='80%' />
                        </Stack>
                        <Skeleton height='12px' width='40%' />
                    </Stack>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default memo(TripCardSkeleton)