import _Runfest from './Runfest'
import _IntlConstants from './model/IntlConstants'
import _IntlActionCreators from './controller/IntlActionCreators'
import _UfpFormattedHtmlMessage from './view/components/UfpFormattedHtmlMessage'
import _UfpFormattedMessage from './view/components/UfpFormattedMessage'
import _UfpPrintCurrentLanguage from './view/components/UfpPrintCurrentLanguage'

export const Runfest = _Runfest
export const IntlRunfest = _Runfest
export const IntlConstants = _IntlConstants
export const configureIntl = _Runfest.configure
export const IntlActionCreators = _IntlActionCreators
export const UfpFormattedMessage = _UfpFormattedMessage
export const UfpFormattedHtmlMessage = _UfpFormattedHtmlMessage
export const UfpPrintCurrentLanguage = _UfpPrintCurrentLanguage
