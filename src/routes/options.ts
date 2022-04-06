import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import StarIcon from '@mui/icons-material/Star'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Access from '../views/Access'
import Account from '../views/Account'
import Change from '../views/Change'
import Dashboard from '../views/Dashboard'
import Quux from '../views/Quux'
import Quuz from '../views/Quuz'
import Reset from '../views/Reset'
import Users from '../views/Users'
import Verify from '../views/Verify'

const options = [
  // Drawer
  {
    component: Dashboard,
    exact: true,
    icon: DashboardIcon,
    order: 1,
    location: 'drawer',
    text: 'Dashboard',
    url: '/'
  },
  {
    component: Quux,
    icon: CircleOutlinedIcon,
    order: 2,
    location: 'drawer',
    roles: ['user', 'admin'],
    text: 'Quux',
    url: '/quux'
  },
  {
    component: Users,
    icon: GroupIcon,
    order: 3,
    location: 'drawer',
    roles: ['admin'],
    text: 'Users',
    url: '/users'
  },
  // Toolbar
  {
    component: Account,
    icon: AccountBoxOutlinedIcon,
    order: 1,
    location: 'toolbar',
    roles: ['user', 'admin'],
    text: 'Account',
    url: '/account'
  },
  {
    component: Quuz,
    icon: CircleOutlinedIcon,
    order: 2,
    location: 'toolbar',
    text: 'Quuz',
    url: '/quuz'
  },
  // Hidden
  {
    component: Account,
    icon: StarIcon,
    location: 'hidden',
    roles: ['user', 'admin'],
    text: 'Account',
    url: '/account'
  },
  {
    component: Change,
    icon: StarIcon,
    location: 'hidden',
    text: 'Change',
    url: '/change'
  },
  {
    component: Access,
    icon: VpnKeyIcon,
    location: 'hidden',
    text: 'Access',
    url: '/access'
  },
  {
    component: Reset,
    icon: StarIcon,
    location: 'hidden',
    text: 'Reset',
    url: '/reset'
  },
  {
    component: Verify,
    icon: StarIcon,
    location: 'hidden',
    text: 'Verify',
    url: '/verify'
  }
]

export default options
export { options }
