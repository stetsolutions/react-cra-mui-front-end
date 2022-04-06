import { customRender, screen } from '../../utilities/testing/custom-render'
import { admin, user } from '../../utilities/testing/users'
import Routes from '../Routes'

test('Routes :: renders component', () => {
  customRender(<Routes />)
})

test('Routes :: renders unguarded route ', () => {
  customRender(<Routes />, { route: '/access', user: user })

  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
})

test('Routes :: renders guarded route ', () => {
  customRender(<Routes />, { route: '/users', user: admin })

  expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
})

test('Routes :: renders fallback route', () => {
  customRender(<Routes />, { route: '/foobar' })

  expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument()
})
