
import _UFPMiddleware from './ufpmiddleware/index.js'
import _Utils from './utils/index.js'

const name = 'ufp core',
  version = '1.0';

const myObject = {
  name,
  version,
  UFPMiddleware:_UFPMiddleware,
  UFPUtils:_Utils
};
export const UFPUtils=_Utils;
export const UFPMiddleware=_UFPMiddleware;
export default myObject;
