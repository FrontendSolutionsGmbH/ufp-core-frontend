

const ThrowParam = (string) => {
    throw new Error(string)
}

function pad(pad, str, padRight) {
    if (typeof str === 'undefined')
        return pad;
    if (padRight) {
        return (str + pad).substring(0, pad.length);
    } else {
        return (pad + str).slice(-pad.length);
    }
}

export default {
    ThrowParam,
    pad
}