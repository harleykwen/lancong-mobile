import React from 'react'
import { extendTheme, NativeBaseProvider } from 'native-base'
import Router from './src/router/Router'
import { StatusBar } from 'react-native'

const theme = extendTheme({})
console.log(theme)

const App = () => {
    return (
        <NativeBaseProvider>
            <StatusBar backgroundColor={'#038103'} />
            <Router />
        </NativeBaseProvider>
    )
}

export default App