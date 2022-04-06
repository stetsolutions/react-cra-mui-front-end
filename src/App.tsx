import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { useLocation } from 'react-router-dom'

import { useLayoutContext } from './contexts/Layout'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Routes from './routes'

import Notifications from './components/Notifications'

function App () {
  const { isDisplayed } = useLayoutContext()
  const { pathname } = useLocation()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Notifications />
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Toolbar
          sx={{
            display: isDisplayed(pathname) ? 'none' : 'flex'
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <main>
            <Routes />
          </main>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default App
