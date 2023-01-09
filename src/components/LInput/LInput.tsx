import React from 'react'
import { Flex, Input, Radio, Select, Stack, Text } from 'native-base'

interface ILInput {
    label?: string
    type: 'text' | 'number' | 'select' | 'radio'
    options?: { label: string, value: any }[]
}

const LInput = (props: ILInput) => {
    const {
        label,
        type,
        options,
    } = props

    function renderComponent() {
        switch(type) {
            case 'text':
                return <Input />
            case 'number':
                return <Input keyboardType='number-pad' />
            case 'select':
                return (
                    <Select dropdownIcon={<></>}>
                        {options?.map((option: any, index: number) => {
                            return <Select.Item key={index} label={option?.label} value={option?.value} />
                        })}
                    </Select>
                )
            case 'radio':
                return (
                    <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
                        <Stack 
                            direction='row' 
                            space='10px'
                        >
                            {options?.map((option: any, index: number) => {
                                return (
                                    <Radio key={index} value={option.value}>
                                        {option.label}
                                    </Radio>
                                )
                            })}
                        </Stack>
                    </Radio.Group>
                )
        }
    }

    return (
        <Flex>
            {label
                ?   <Text marginBottom='5px'>{label}</Text>
                :   null
            }

            {renderComponent()}
        </Flex>
    )
}

export default LInput