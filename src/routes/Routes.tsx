import React from 'react'

import { Route, Switch } from 'react-router-dom'

import GuardedRoute from './GuardedRoute'

import routes from './options'

import NotFound from '../views/NotFound'

function Routes () {
  return (
    <Switch>
      {routes.map((item, index) =>
        item.roles?.length ? (
          <GuardedRoute
            component={item.component}
            exact={item.exact || false}
            key={index}
            path={item.url}
            roles={item.roles}
          />
        ) : (
          <Route
            component={item.component}
            exact={item.exact || false}
            key={index}
            path={item.url}
          />
        )
      )}
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
