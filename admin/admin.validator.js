import Joi from "joi";


const adminRegisterValidator = (req,res,next) =>{
    const schema = Joi.object({
        name:Joi.string().min(6).max(50).required(),
        email:Joi.string().min(10).max(60).required().email(),
        password:Joi.string().min(6).max(30).required().alphanum(),
        experience:Joi.string().min(1).max(20).required()
    });
    const {error, value} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message:"Bad request", error
        })
    }
    next();
}

export default adminRegisterValidator;