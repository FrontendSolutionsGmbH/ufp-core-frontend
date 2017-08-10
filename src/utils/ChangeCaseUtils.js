import noCase from 'no-case'

const isCharacterUppercase = (character) => {
    return character === character.toUpperCase()
}

const camelCaseArray = (input) => {
    var current = ''

    var parts = []
    for (var i = 0, len = input.length; i < len; i++) {
        if (isCharacterUppercase(input[i])) {
            if (current !== '') {
                parts.push(current.toUpperCase())
            }
            current = input[i]
        } else {
            current += input[i]
        }
    }
    parts.push(current.toUpperCase())

    return parts
}

const camelCaseToConstant = (input) => {
    var parts = camelCaseArray(input)
    return parts.join('_')
}

const toSnakeCaseUpperCase=  (value, locale)=> {
    return noCase(value, locale, '_').toUpperCase()
}
const toSnakeCase =  (value)=> {
    return noCase(value, undefined, '_')
}
const toSnakeCase2 =  (value)=> {
    return value.replace(/\.?([A-Z]+)/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "")
}
const toSnakeCaseUpperCase2 =  (value)=> {
    return  toSnakeCase2(value).toUpperCase()
}

export default {
    toSnakeCase,
    toSnakeCase2,
    toSnakeCaseUpperCase,
    toSnakeCaseUpperCase2,
    camelCaseToConstant
}