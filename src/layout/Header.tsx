import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MenuIcon from '@mui/icons-material/Menu'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import Cookies from 'js-cookie'
import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useLayoutContext } from '../contexts/Layout'
import { useUserContext } from '../contexts/User'
import { options as routeOptions } from '../routes/options'
import Access from '../views/Access/Access'

const drawerWidth = 240

function Header () {
  const { isDisplayed } = useLayoutContext()
  const { isAuthenticated, user, setUser } = useUserContext()

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)

  const history = useHistory()
  const { pathname } = useLocation()

  const container = window.document.body // window !== undefined ? () => window.document.body : undefined

  const handleDrawerItemClick = () => {
    setMobileOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleSignInClick = () => {
    setMenuAnchor(null)
    setSignInOpen(true)
  }

  const handleSignInClose = () => {
    setSignInOpen(false)
  }

  const handleSignOutClick = () => {
    Cookies.remove('ss-id')

    localStorage.removeItem('user')

    setMenuAnchor(null)
    setUser({})

    history.push('/')
  }

  const templateContent = (
    <>
      <Box sx={{ px: 2, pt: 2, width: 200 }}>
        <img src={logo} alt='Stet Solutions' />
      </Box>
      <List>
        {routeOptions
          .filter(function (item) {
            return item.location === 'drawer'
          })
          .filter(function (item) {
            return item.roles
              ? item.roles.includes(user.role ? user.role : '')
              : true
          })
          .map((item, index) => (
            <ListItem
              button
              component={Link}
              key={index}
              onClick={handleDrawerItemClick}
              selected={item.url === pathname}
              to={item.url}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>
    </>
  )

  return (
    <Box
      sx={{
        display: isDisplayed(pathname) ? 'none' : 'flex'
      }}
    >
      <AppBar
        elevation={0}
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap component='h2' variant='h5' sx={{ flexGrow: 1 }}>
            {routeOptions.find(el => el.url === pathname)?.text}
          </Typography>
          <Typography variant='h6'>{user.username}</Typography>
          <IconButton
            aria-label='open menu'
            aria-controls='menu'
            aria-haspopup='true'
            color='inherit'
            edge='end'
            onClick={handleMenuClick}
          >
            <AccountCircleIcon fontSize='large' />
          </IconButton>
          <Menu
            id='menu'
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {routeOptions
              .filter(function (item) {
                return item.location === 'toolbar'
              })
              .filter(function (item) {
                return item.roles
                  ? item.roles.includes(user.role ? user.role : '')
                  : true
              })
              .map((item, index) => (
                <MenuItem
                  component={Link}
                  key={index}
                  onClick={handleMenuClose}
                  selected={item.url === pathname}
                  to={item.url}
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </MenuItem>
              ))}
            <MenuItem
              onClick={handleSignInClick}
              sx={{
                display: !isAuthenticated ? 'flex' : 'none'
              }}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText>Sign In</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleSignOutClick}
              sx={{
                display: isAuthenticated ? 'flex' : 'none'
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='side navigation'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {templateContent}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {templateContent}
        </Drawer>
      </Box>
      <Access
        close={handleSignInClose}
        isOpen={signInOpen}
        variant='dialog'
      />
    </Box>
  )
}

export default Header
