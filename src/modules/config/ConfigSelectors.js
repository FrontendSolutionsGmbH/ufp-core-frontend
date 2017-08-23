import ConfigConstants from './ConfigConstants'

export const ConfigState = (state) => state[ConfigConstants.reducerName]
export const ConfigDataSelector = (state) => ConfigState(state).data

export default {
  ConfigDataSelector
}
