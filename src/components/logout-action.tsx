import React from 'react'
import { Button } from './ui/button'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/lib/fetcher'
import { Loading } from './ui/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useToast } from './ui/use-toast'
import { successColor } from '@/lib/colors'
import { useRouter } from 'next/navigation'

type VariantButtonProps = {
    variant: 'button' | 'ghost'
}

const LogoutAction = ({ variant }: VariantButtonProps) => {
    const router = useRouter()
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation('/api/auth/logout', (url) => fetcher(url, {}, 'POST'))

    const logout = () => {
        trigger().then(res => {
            if (res.code == 200) {
                toast({
                    title: 'Info',
                    description: res.message,
                    style: successColor,
                })
                setTimeout(router.refresh, 800)
            } else {
                toast({
                    title: 'Error',
                    description: res.message,
                    variant: 'destructive',
                })
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {
                    variant === 'button'
                        ?
                        <Button variant={'destructive'}>{isMutating ? <Loading /> : 'Logout'}</Button>
                        :
                        <div className="hover:bg-danger hover:text-danger-foreground p-2 duration-100 rounded-sm block text-start">{isMutating ? <Loading /> : 'Logout'}</div>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure want to <span className='text-danger font-bold text-xl'>Logout</span>?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can't be returnable!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default LogoutAction