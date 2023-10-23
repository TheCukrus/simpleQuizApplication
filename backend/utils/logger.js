const info = (...params) =>
{
    return console.log(...params)
}

const error = (...params) =>
{
    return console.log(...params)
}

module.exports = { info, error }