const replaceTemplateVar = (str, vars) => {
    console.log('Replacing Template String', str, vars)

    var result = str

    Object.keys(vars).map((key) => {
        result = result.replace(':' + key, vars[key])
        result = result.replace('$' + key, vars[key])
        result = result.replace('{' + key + '}', vars[key])
    })

    console.log('Template String result', result)
    return result
}

export default{
    replaceTemplateVar
}
