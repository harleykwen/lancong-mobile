import React from 'react'
import { extendTheme, NativeBaseProvider } from 'native-base'
import Router from './src/router/Router'

const theme = extendTheme({})
console.log(theme)

const App = () => {
    return (
        <NativeBaseProvider>
            <Router />
        </NativeBaseProvider>
    )
}

export default App