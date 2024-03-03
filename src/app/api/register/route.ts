import prisma from "@/lib/instance";
import bcrypt from 'bcrypt'
import Joi from 'joi'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { fullName, username, password, confirmPassword } = await req.json()

        const schema = Joi.object({
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
            confirmPassword: Joi.valid(password).messages({
                "any.only": "Password doesn\'t match",
                "any.required": "Please re-enter the password",
            }),
        })

        const value = await schema.validateAsync({ fullName, username, password, confirmPassword })

        const userExist = await prisma.user.findFirst({ where: { username } })
        if (userExist) throw new Error('Username already taken.')

        const salt = 10
        const salty = await bcrypt.genSalt(salt)
        const passwy = await bcrypt.hash(value.password, salty)

        delete value.confirmPassword

        const user = await prisma.user.create({
            data: {
                ...value,
                password: passwy,
            }
        })

        return NextResponse.json({ message: 'Account created!', code: 200, user })
    } catch (error: any) {
        console.log(error)
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 401 })
    }
}