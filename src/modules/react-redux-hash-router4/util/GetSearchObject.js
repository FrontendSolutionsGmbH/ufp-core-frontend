import QueryString from 'query-string'

/**
 * helper method for getting query object, utilicing the query-string npm module
 * @returns {*}
 */
export default(queryString) => {
    return QueryString.parse(queryString)
}
