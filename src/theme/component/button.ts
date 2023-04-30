export const button = {
    defaultProps: {
        colorScheme: 'lancPrimary',
        rounded: 'xl',
        width: 'full',
        variant: 'lancSolid',
        size: 'lancNormal',
        _text: {
            fontFamily: 'Poppins-SemiBold'
        },
    },
    sizes: {
        lancSmall: {
            px: '20px',
            py: '12px',
            _text: {
                fontSize: '12px'
            },
        },
        lancNormal: {
            px: '24px',
            py: '16px',
            _text: {
                fontSize: '14px'
            },
        },
    },
    variants: {
        lancSolid: (props: any) => {
            return {
                backgroundColor: `${props.colorScheme}Light`,
                _text: {
                    color: 'lancBackgroundLight',
                },
                _pressed: {
                    backgroundColor: `${props.colorScheme}.35`,
                }
            };
        },
        lancOutline: (props: any) => {
            return {
                backgroundColor: 'transparent',
                borderWidth: '2px',
                borderColor: `${props.colorScheme}Light`,
                _text: {
                    color: `${props.colorScheme}Light`,
                },
                _pressed: {
                    backgroundColor: `${props.colorScheme}.95`,
                }
            };
        },
        lancText: (props: any) => {
            return {
                backgroundColor: 'transparent',
                _text: {
                    color: `${props.colorScheme}Light`,
                },
                _pressed: {
                    backgroundColor: `${props.colorScheme}.95`,
                }
            };
        },
        lancGoogle: () => {
            return {
                backgroundColor: 'lancBackgroundLight',
                _text: {
                    color: 'lancOnBackgroundLight',
                },
                _pressed: {
                    backgroundColor: 'lancNeutral',
                }
            };
        },
    }
}