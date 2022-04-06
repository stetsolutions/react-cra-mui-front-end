// import {} from '@mui/lab/themeAugmentation'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { LayoutProvider } from './contexts/Layout'
import { UserProvider } from './contexts/User'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const exclude = ['/access', '/change', '/reset', '/verify']

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    },
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <LayoutProvider exclude={exclude}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
