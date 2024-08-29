import Joi from "joi";

export interface ILoginForm {
    username: string,
    password: string,
}

export interface IRegisterForm {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export const registerValidator = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": `Name cannot be empty`,
        "any.required": `Name is required`,
    }),
    username: Joi.string().required().messages({
        "string.empty": `Username cannot be empty`,
        "any.required": `Username is required`,
    }),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
            "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
    confirmPassword: Joi.valid(Joi.ref('password')).messages({
        "any.only": "Password doesn\'t match",
        "any.required": "Please re-enter the password",
    }),
})

export const loginValidator =
Joi.object({
    username: Joi.string().required().messages({
        "string.empty": `Username cannot be empty`,
        "any.required": `Username is required`,
    }),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
            "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
})

export interface ProductSchema {
    name: string
    price: string
    stock: string
    image?: File | null
}

export const productValidator  = Joi.object<ProductSchema>({
    name: Joi.string().required(),
    price: Joi.number().min(1).messages({
        'number.min': 'Invalid price number.'
    }),
    stock: Joi.number(),
    image: Joi.required(),
})

export const optionalProductValidator = Joi.object<ProductSchema>({
    name: Joi.string().required(),
    price: Joi.number().min(1).required().messages({
        'number.base': 'Price must be a number.',
        'number.min': 'Invalid price number. Price must be at least 1.',
        'any.required': 'Price required.',
    }),
    stock: Joi.number().optional(),
    image: Joi.any().optional(),
})