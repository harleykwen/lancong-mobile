import React, { memo } from 'react'
import { 
    Divider, 
    Skeleton, 
    Stack, 
} from 'native-base'

const TransactionItemSkeleton: React.FC = () => {
    return (
        <Stack
            backgroundColor='white'
            padding='10px'
            space='10.5px'
            borderRadius='4px'
            borderWidth='1px'
            borderColor='#e5e5e5'
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <Stack space='4px'>
                    <Skeleton height='26px' width='50px' />
                </Stack>
                <Skeleton height='26px' width='50px' />
            </Stack>
            <Divider />
            <Stack direction='row' space='4px'>
                <Skeleton height='52px' width='52px' />
                <Stack space='5px'>
                    <Skeleton height='14px' width='100px' />
                    <Skeleton height='14px' width='60px' />
                    <Skeleton height='14px' width='40px' />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default memo(TransactionItemSkeleton)