import { useColorModeValue } from 'native-base'

export const formControlLabel = {
    baseStyle: () => {
        return {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            _text: {
                fontSize: '14px',
                color: 'lancOnBackgroundLight'
            },
            _astrick: {
                color: 'lancErrorLight'
            },
        };
    },
}