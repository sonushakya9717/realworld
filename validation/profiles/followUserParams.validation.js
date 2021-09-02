const {user} = require("./followUserParams.schema")


module.exports = {
    usernameParamsValidation: async (req,res,next) => {
        const value = await user.validate(req.params);
        if(value.error){
            next({
                status:400,
                errors:value.error.details[0].message
            })
        }else{
            next()
        }
    }
}