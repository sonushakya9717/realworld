const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required()
    })
}

module.exports = schema;