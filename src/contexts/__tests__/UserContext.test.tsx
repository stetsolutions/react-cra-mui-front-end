import { render } from '@testing-library/react'

import { UserContext, UserProvider } from '../User'

test('UserContext :: [UserContext] renders component', () => {
  const user = {}

  const value = {
    user: {},
    setUser: () => {},
    isAuthenticated: Boolean(Object.keys(user).length)
  }

  render(<UserContext.Provider value={value}>{}</UserContext.Provider>)
})

test('UserContext :: [UserProvider] renders component', () => {
  const user = {}

  render(<UserProvider></UserProvider>)
})

test('UserContext :: [UserProvider] renders component with attributes', () => {
  const user = {}

  render(<UserProvider override={user}></UserProvider>)
})
