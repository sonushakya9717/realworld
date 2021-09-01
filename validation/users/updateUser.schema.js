const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        userName: joi.string().max(100).required(),
        bio: joi.string().max(250).required(),
        image: joi.string().max(250).required(),
        email: joi.string().email().required(),
    })
}

module.exports = schema;