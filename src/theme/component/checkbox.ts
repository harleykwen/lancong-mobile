export const checkbox = {
    defaultProps: {
        size: 'lancNormal',
        colorScheme: 'lancPrimary'
    },
    sizes: {
        lancSmall: {
            _text: {
                fontSize: '12px',
            },
            _icon: { 
                size: '8px' 
            },
        },
        lancNormal: {
            _text: {
                fontSize: '14px',
            },
            _icon: { 
                size: '10px' 
            },
        },
    },
    baseStyle: (props: any) => {
        return {
            borderColor: props?.checked
                ?   `${props.colorScheme}Light`
                :   `lancSurfaceLight`,
            _checked: {
                backgroundColor: `${props.colorScheme}Light`,
                borderColor: `${props.colorScheme}Light`,
            },
            _invalid: {
                borderColor: `lancErrorLight`,
            },
            _stack: {
                space: '8px',
                alignItems: 'flex-start',
                width: '90%',
            },
            _text: {
                color: `lancOnBackgroundLight`,
            },
        }
    }
}