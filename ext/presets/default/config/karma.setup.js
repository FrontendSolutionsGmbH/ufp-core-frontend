/* eslint filenames/match-exported: 0 */

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/**
 *
 * this file is included via the webpack karma configuration to configure the
 */

Enzyme.configure({adapter: new Adapter()})
