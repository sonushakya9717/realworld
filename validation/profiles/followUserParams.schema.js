const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        username: joi.string().max(20).required(),
    })
}

module.exports = schema;