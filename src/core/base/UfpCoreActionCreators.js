/**
 * the base actioncreator stores the application initialisation command in the startupAction
 */

import UfpCoreConstants from '../UfpCoreConstants'

const startupAction = () => ({type: UfpCoreConstants.ACTION_NAMES.STARTUP})

export default{
    startupAction
}
