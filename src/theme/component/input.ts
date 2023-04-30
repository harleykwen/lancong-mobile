export const input = {
    defaultProps: {
        size: 'lancNormal',
        variant: 'lancOutline',
        rounded: 'xl',
        width: 'full',
        colorScheme: 'lancPrimary',
    },
    sizes: {
        lancSmall: {
            px: '20px',
            py: '12px',
            fontSize: '12px',
        },
        lancNormal: {
            px: '24px',
            py: '16px',
            fontSize: '14px',
        },
    },
    variants: {
        lancFilled: (props: any) => {
            return {
                backgroundColor: 'lancSurfaceLight',
                borderWidth: '2px',
                borderColor: 'lancSurfaceLight',
                _text: {
                    color: 'lancOnBackgroundLight',
                },
                _focus: {
                    borderWidth: '2px',
                    borderColor: `${props.colorScheme}Light`,
                    _invalid: {
                        backgroundColor: 'lancErrorContainerLight',
                        borderColor: 'lancErrorLight',
                    },
                },
                _invalid: {
                    backgroundColor: 'lancErrorContainerLight',
                    borderColor: 'lancErrorLight',
                },
            };
        },
        lancOutline: (props: any) => {
            return {
                backgroundColor: 'transparent',
                borderWidth: '2px',
                borderColor: 'lancSurfaceLight',
                _text: {
                    color: 'lancOnBackgroundLight',
                },
                _focus: {
                    borderColor: `${props.colorScheme}Light`,
                    _invalid: {
                        borderColor: 'lancErrorLight',
                    },
                },
                _invalid: {
                    borderColor: 'lancErrorLight',
                },
            };
        },
    },
}