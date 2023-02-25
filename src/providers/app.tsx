import * as React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider, DefaultOptions } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ErrorForbidden, Loading } from '../components/uis'
import {
  AuthContextProvider,
  CartContextProvider,
  RandomContextProvider
} from '../functionals/contexts'
import { theme } from '../functionals/utilities/muiThemeClient'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    // cacheTime: 0,
    // staleTime: 1000,
    suspense: true // ver18から
  }
}

const queryClient = new QueryClient({ defaultOptions: queryConfig })

export const ErrorFallback: React.VFC<FallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <ErrorForbidden error={error} resetErrorBoundary={resetErrorBoundary} />
  )
}

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider: React.VFC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <CartContextProvider>
                <AuthContextProvider>
                  <RandomContextProvider>
                    <CookiesProvider>
                      <BrowserRouter>{children}</BrowserRouter>
                    </CookiesProvider>
                  </RandomContextProvider>
                </AuthContextProvider>
              </CartContextProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Suspense>
  )
}
