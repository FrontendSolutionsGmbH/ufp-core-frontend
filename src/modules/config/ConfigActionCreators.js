import ApiDefinition from 'api/ApiDefinition'
import {UFPMiddleware} from 'ufp-core'

export const getGlobals =() => UFPMiddleware.createActionCreatorForDefinition(ApiDefinition.getGlobals)({queryParams:{test:'test'}})

export const getPetById =(petId) => UFPMiddleware.createActionCreatorForDefinition(ApiDefinition.getPetById)({urlParams:{petId:petId}})

export const testErrorRequest =() => UFPMiddleware.createActionCreatorForDefinition(ApiDefinition.testErrorRequest)()

export default {
  getGlobals,
  getPetById,
  testErrorRequest
}
