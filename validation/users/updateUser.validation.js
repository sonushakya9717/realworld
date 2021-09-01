const {user} = require("./updateUser.schema")


module.exports = {
    updateUserValidation: async (req,res,next) => {
        const value = await user.validate(req.body);
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