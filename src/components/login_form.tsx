'use client'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Input } from './ui/input';
import { Button } from './ui/button';

const LoginForm = () => {
    const schema =
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

    interface LoginForm {
        username: string,
        password: string,
    }

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: joiResolver(schema)
    })

    const onSubmit = handleSubmit(async (d, e) => {
        e?.preventDefault()
        console.log(d)
        const request = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify(d),
        })
        const response = await request.json()
        console.log(response)
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
            <div className="">
                <Input {...register('username')} className={errors.username ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-400 border focus-visible:border-0'} placeholder='Username' />
                <p className='text-red-500 text-sm'>{errors.username?.message}</p>
            </div>
            <div className="">
                <Input type='password' {...register('password')} className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-400 border focus-visible:border-0'} placeholder='Password' />
                <p className='text-red-500 text-sm'>{errors.password?.message}</p>
            </div>
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm