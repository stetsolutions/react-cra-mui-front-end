import { FC, createContext, useContext, useState } from 'react'

interface CreateContext {
  user: User
  setUser: (user: User) => void
  isAuthenticated: boolean
}

interface Props {
  override?: {}
}

interface User {
  created?: string
  email?: string
  first_name?: string
  id?: number
  last_name?: string
  role?: string
  username?: string
  verified?: boolean | null
}

const UserContext = createContext<CreateContext>({} as CreateContext)

const UserProvider: FC<Props> = ({ children, override }) => {
  const intialState = override
    ? override
    : JSON.parse(localStorage.getItem('user') || '{}')

  const [user, setUser] = useState(intialState)

  const value = {
    user,
    setUser,
    isAuthenticated: Boolean(Object.keys(user).length)
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export { UserContext, UserProvider, useUserContext }
