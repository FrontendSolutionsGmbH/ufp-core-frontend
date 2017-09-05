/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreActionCreators from './UfpCoreActionCreators'
import UfpCore from '../../core/UfpCore'
const Manifest = {
    name: 'Ufp Base',
    description: 'Ufp Base ',
    actionCreators: UfpCoreActionCreators,
    register: () => {
        UfpCore.registerManifest(Manifest)
    }
}

export default Manifest
