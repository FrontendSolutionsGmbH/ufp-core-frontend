import _UFPMiddleware from './ufpmiddleware/index.js'
import _Utils from './utils/index.js'
import _ConfigureEpics from './epic/ConfigureEpics.js'
import _Startup from './startup/index.js'
import _UfpStoreConfig from './store/StoreConfig'

import _Menu from './menu/index.js'
import UFPMain from './main/main.js'

export const ConfigureEpics = _ConfigureEpics
export const UFPUtils = _Utils
export const UfpStoreConfig = _UfpStoreConfig
export const UFPStartup = _Startup
export const UFPMiddleware = _UFPMiddleware
// export const UFPMenu = _Menu
export default{

  UFPMain,

  UFPMiddleware: _UFPMiddleware,
  UFPUtils: UFPUtils,
  UFPStartup: _Startup,
  UfpStoreConfig,
  ConfigureEpics: ConfigureEpics,
  UFPMenu: _Menu
}
