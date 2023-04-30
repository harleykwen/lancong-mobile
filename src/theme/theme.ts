import { extendTheme } from 'native-base'
import { button } from './component/button'
import { input } from './component/input'
import { formControlLabel } from './component/formControlLabel'
import { formControlErrorMessage } from './component/formControlErrorMessage'
import { checkbox } from './component/checkbox'
import { divider } from './component/divider'
import { text } from './component/text'
import { alert } from './component/alert'
import { 
    colors, 
    lancError, 
    lancNeutral, 
    lancNeutralVariant, 
    lancPrimary, 
    lancSecondary, 
    lancTertiary, 
} from './colors'

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        accessibleColors: true,
        useSystemColorMode: false,
    },
    fonts: {
        heading: 'Poppins-Regular',
        body: 'Poppins-Regular',
        mono: 'Poppins-Regular',
    },
    colors: {
        ...colors,
        lancPrimary,
        lancSecondary,
        lancTertiary,
        lancError,
        lancNeutral,
        lancNeutralVariant,
    },
    components: {
        Button: button,
        FormControlLabel: formControlLabel,
        FormControlErrorMessage: formControlErrorMessage,
        Input: input,
        Checkbox: checkbox,
        Divider: divider,
        Text: text,
        Alert: alert,
    },
})

export default theme