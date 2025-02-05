const Joi = require('joi');

//validation will be given to the user only if they pass given requests
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

const signupValidation = (req,res,next) =>{
    const schema = Joi.object({
        First_name: Joi.string().min(3).max(100).required(),
        Last_name: Joi.string().min(3).max(100).required(),
        email: Joi.string()
            .email()
            .custom((value, helpers) => {
                const domain = value.split("@")[1];
                if (!allowedDomains.includes(domain)) {
                    return helpers.error("any.invalid", { message: "Email domain is not allowed." });
                }
                return value;
            })
            .required(),
        password:Joi.string().min(4).max(100).required()

    });
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({message: "Bad Request", error})
    }
    next();
}

const loginValidation = (req,res,next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()

    });
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({message: "Bad Request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}