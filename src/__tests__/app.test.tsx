import App from '../App'

import { customRender } from '../utilities/testing/custom-render'

test('App :: renders component', () => {
  customRender(<App />)
})

test('App :: renders component without excluded toolbar', () => {
  customRender(<App />, { route: '/foo' })
})
