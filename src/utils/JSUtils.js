const ThrowParam = (string) => {
  throw new Error(string)
}

function pad(pad, str, padRight) {
  if (typeof str === 'undefined') {
    return pad
  }
  if (padRight) {
    return (str + pad).substring(0, pad.length)
  } else {
    return (pad + str).slice(-pad.length)
  }
}

const factorMethodSkalarArray = (fn) => {
  return (param) => {
    if (Array.isArray(param)) {
      // if is array call method for each array item
      param.map((item) => {
        fn(item)
      })
    }
    else {
      // if is no array call method as normal
      fn(param)
    }
  }
}

export default {
  ThrowParam,
  pad,
  factorMethodSkalarArray

}
