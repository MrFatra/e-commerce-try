'use client'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ILoginForm, loginValidator } from '@/lib/joi';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Loading } from './ui/loading';
import { useToast } from './ui/use-toast';
import { successColor } from '@/lib/colors';

const LoginForm = () => {
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation('/api/auth/login', (url, { arg }: { arg?: ILoginForm | any }) => fetcher(url, { arg }, 'POST'))

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
        resolver: joiResolver(loginValidator)
    })

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()
        console.log('data form: ', data)
        trigger(data).then(res => {
            if (res.code !== 200) {
                toast({
                    title: 'Error',
                    description: res.message,
                    variant: 'destructive',
                })
            } else if (res.code === 200) {
                toast({
                    title: 'Logged in!',
                    description: res.message,
                    style: successColor
                })
            }
        })
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
            <Button type="submit">{isMutating ? <Loading /> : 'Login'}</Button>
        </form>
    );
};

export default LoginForm