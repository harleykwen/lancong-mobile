import colors from './colors'
import { extendTheme } from 'native-base'

const theme = extendTheme({
    colors: colors,
    config: {
        initialColorMode: 'light',
    },
    fonts: {
        heading: "Poppins",
        body: "Poppins",
        mono: "Poppins",
    },
})

export default theme