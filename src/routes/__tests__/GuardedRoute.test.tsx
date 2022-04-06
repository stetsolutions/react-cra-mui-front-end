import { customRender, screen } from '../../utilities/testing/custom-render'
import GuardedRoute from '../GuardedRoute'
import Dashboard from '../../views/Dashboard'

test('GuardedRoute :: renders component with atributes', () => {
  customRender(<GuardedRoute component={Dashboard} roles={['foo', 'bar']} />)
})
