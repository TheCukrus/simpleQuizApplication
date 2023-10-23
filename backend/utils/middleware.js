const logger = require("./logger.js")

const unknownEndpoint = (req, res) =>
{
    res.status(404).json({ error: "Unknown endpoint!" })
}

const errorHandler = (err, req, res, next) =>
{
    logger.error(err.message)

    if (err.name === "CastError")
    {
        return res.status(400).json({ error: "Malformatted id" })
    }
    else if (err.name === "ValidationError")
    {
        return res.status(400).json({ error: err.message })
    }
    else if (err.name === "JsonWebTokenError")
    {
        return res.status(401).json({ error: err.message })
    }
    else if (err.name === "TokenExpiredError")
    {
        return res.status(401).json({ error: "Token expired" })
    }

    next(err)
}

module.exports = { unknownEndpoint, errorHandler }