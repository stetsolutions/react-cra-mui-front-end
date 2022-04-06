import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { render, RenderOptions } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { SnackbarProvider } from 'notistack'
import { FC, ReactElement, StrictMode } from 'react'
import { Router } from 'react-router-dom'

import { LayoutProvider } from '../../contexts/Layout'
import { UserProvider } from '../../contexts/User'

interface Props {
  user: {}
}

const history = createMemoryHistory()

const customTheme = createTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c'
    }
  }
})

const exclude = ['/foo', '/change', '/access', '/reset', '/verify']

const Providers: FC<Props> = ({ children, user }) => {
  return (
    <StrictMode>
      <UserProvider override={user}>
        <ThemeProvider theme={customTheme}>
          <LayoutProvider exclude={exclude}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Router history={history}>{children}</Router>
            </SnackbarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </UserProvider>
    </StrictMode>
  )
}

const customRender = (
  ui: ReactElement,
  { route = '/', user = {} } = {},
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  history.push(route)

  return render(ui, {
    wrapper: props => <Providers user={user} {...props} />,
    ...options
  })
}

export * from '@testing-library/react'
export { customRender, history }
