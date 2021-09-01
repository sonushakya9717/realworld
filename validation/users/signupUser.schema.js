const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        userName: joi.string().max(100).required(),
        bio: joi.string().max(250).required(),
        image: joi.string().max(250).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required()
    })
}

module.exports = schema;