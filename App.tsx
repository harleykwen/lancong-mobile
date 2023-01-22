import React from 'react'
import { extendTheme, NativeBaseProvider } from 'native-base'
import Router from './src/router/Router'
import { StatusBar } from 'react-native'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider as PaperProvider } from 'react-native-paper'

const theme = extendTheme({})
const queryClient = new QueryClient()
console.log(theme)

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider>
                <NativeBaseProvider>
                    <StatusBar backgroundColor={'#038103'} />
                    <Router />
                </NativeBaseProvider>
            </PaperProvider>
        </QueryClientProvider>
    )
}

export default App