import { useColorModeValue } from 'native-base'

export const formControlErrorMessage = {
    baseStyle: () => {
        return {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            _text: {
                fontSize: '14px',
                color: 'lancErrorLight'
            },
        };
    },
}