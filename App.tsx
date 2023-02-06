import React from 'react'
import Router from './src/router/Router'
import { theme } from './src/theme'
import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()
console.log({THEME: theme})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={theme}>
                <StatusBar backgroundColor={'#038103'} />
                <Router />
            </NativeBaseProvider>
        </QueryClientProvider>
    )
}

export default App