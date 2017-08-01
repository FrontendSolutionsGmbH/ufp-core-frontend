'use strict';
import _UFPMiddleware from './ufpmiddleware/index.js'

const name = 'ufp core',
  version = '1.0';

const myObject = {
  name,
  version,
  UFPMiddleware:_UFPMiddleware
};

export const UFPMiddleware=_UFPMiddleware;
export default myObject;
