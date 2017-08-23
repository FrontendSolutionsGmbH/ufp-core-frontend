import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'
import createHashHistory from 'history/lib/createHashHistory'
import {useRouterHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import StartupConfig from 'configuration/StartupConfig'

const startup = ({htmlroot = 'root', App = null, routes = []}) => {
// Store Initialization
// ------------------------------------

  const hashHistory = useRouterHistory(createHashHistory)({
    basename: ''
  })

  const store = createStore(window.__INITIAL_STATE__, hashHistory)

// Render Setup
// ------------------------------------
  const MOUNT_NODE = document.getElementById(htmlroot)

  const render = () => {
    const history = syncHistoryWithStore(hashHistory, store, {
      selectLocationState: (state) => state.router
    })
    //UpfCore.register()
    StartupConfig.register(store)
    ReactDOM.render(
      <App history={history}
           routes={routes}
           store={store} />, MOUNT_NODE
    )
  }

// Development Tools
// ------------------------------------
  if (__DEV__) {
    if (module.hot) {
      const renderApp = render
      const renderError = (error) => {
        const RedBox = require('redbox-react').default

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      }

      render = () => {
        try {
          renderApp()
        } catch (e) {
          console.error(e)
          renderError(e)
        }
      }

      // Setup hot module replacement
      module.hot.accept([
          './components/root/App',
          './routes/index'
        ], () =>
          setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE)
            render()
          })
      )
    }
  }

// Let's Go!
// ------------------------------------
  if (!__TEST__) render()
}

export default {
  startup
}
