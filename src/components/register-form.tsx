'use client'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IRegisterForm, registerValidator } from '@/lib/joi';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Loading } from './ui/loading';
import { useToast } from './ui/use-toast';
import { successColor } from '@/lib/colors';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const { trigger, isMutating } = useSWRMutation('/api/auth/register', (url, { arg }: { arg?: IRegisterForm | any }) => fetcher(url, { arg }, 'POST'))

    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        resolver: joiResolver(registerValidator)
    })

    const onSubmit =
        handleSubmit(async (data, event) => {
            event?.preventDefault()
            trigger(data).then(res => {
                if (res.code !== 200) {
                    toast({
                        title: "Error",
                        description: res.message,
                        variant: 'destructive'
                    })
                } else if (res.code === 200) {
                    toast({
                        title: "Created!",
                        description: res.message,
                        style: successColor
                    })
                    setTimeout(() => router.push('/auth/login'), 800)
                }
            })
        })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full'>
            <div className="">
                <Input {...register('fullName')} className={errors.fullName ? 'border-red-500 focus-visible:ring-red-500 py-6' : 'py-6 border-gray-400 border focus-visible:border-0'} placeholder='Full Name' />
                <p className='text-red-500 text-sm'>{errors.fullName?.message}</p>
            </div>
            <div className="">
                <Input {...register('username')} className={errors.username ? 'border-red-500 focus-visible:ring-red-500 py-6' : 'py-6 border-gray-400 border focus-visible:border-0'} placeholder='Username' />
                <p className='text-red-500 text-sm'>{errors.username?.message}</p>
            </div>
            <div className="">
                <Input type='password' {...register('password')} className={errors.password ? 'border-red-500 focus-visible:ring-red-500 py-6' : 'py-6 border-gray-400 border focus-visible:border-0'} placeholder='Password' />
                <p className='text-red-500 text-sm'>{errors.password?.message}</p>
            </div>
            <div className="">
                <Input type='password' {...register('confirmPassword')} className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500 py-6' : 'py-6 border-gray-400 border focus-visible:border-0'} placeholder='Confirm Password' />
                <p className='text-red-500 text-sm'>{errors.confirmPassword?.message}</p>
            </div>
            <Button type="submit" className='py-6 font-medium text-base'>{isMutating ? <Loading /> : 'Register'}</Button>
        </form>
    );
};

export default RegisterForm