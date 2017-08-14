
import _UFPMiddleware from './ufpmiddleware/index.js'
import _Utils from './utils/index.js'
import _ConfigureEpics from './epic/ConfigureEpics.js'

const name = 'ufp core',
  version = '1.0';

const myObject = {
  name,
  version,
  UFPMiddleware:_UFPMiddleware,
  UFPUtils:_Utils,
  ConfigureEpics:_ConfigureEpics
};
export const ConfigureEpics=_ConfigureEpics;
export const UFPUtils=_Utils;
export const UFPMiddleware=_UFPMiddleware;
export default myObject;
