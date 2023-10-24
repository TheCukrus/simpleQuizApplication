const app = require("./app.js")
const config = require("./utils/config.js")

app.listen(config.PORT || 80, () =>
{
    console.log(`Server runing on PORT ${config.PORT || 80}`)
})