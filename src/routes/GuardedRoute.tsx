import { ElementType, FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useUserContext } from '../contexts/User'

interface CustomRouteProps {
  component: ElementType
  roles: string[]
}

const GuardedRoute: FC<RouteProps & CustomRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const { isAuthenticated, user } = useUserContext()

  const isAuthorized = () => {
    let show = isAuthenticated

    if (user.role?.length) {
      show = roles.includes(user.role)
    }

    return show
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthorized() ? <Component {...routeProps} /> : <Redirect to='/' />
      }
    />
  )
}

export default GuardedRoute
