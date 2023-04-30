import React from 'react'
import './src/locales/translation'
import { theme } from './src/theme'
import { Router } from './src/router'
import { NativeBaseProvider } from 'native-base'
import { QueryClientProvider, QueryClient } from 'react-query'

const client = new QueryClient()

console.log({theme})

const App: React.FC = () => {
    return (
        <QueryClientProvider client={client}>
            <NativeBaseProvider theme={theme}>
                <Router />
            </NativeBaseProvider>
        </QueryClientProvider>
    )
}

export default App