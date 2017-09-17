/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import {reducer as formReducer} from 'redux-form'

const Manifest = {
    name: 'ufp-redux-form',
    description: 'Ufp Redux Form Wrapper',

    onRegistered({UfpCore}) {
        UfpCore.registerReducer({
            id: 'form',
            reducer: formReducer
        })
    }

}

export default Manifest
