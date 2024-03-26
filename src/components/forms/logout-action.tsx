import React from 'react'
import { Button } from '../ui/button'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/lib/fetcher'
import { Loading } from '../ui/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { useToast } from '../ui/use-toast'
import { successColor } from '@/lib/colors'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slice'

type VariantButtonProps = {
    variant: 'button' | 'ghost'
}

const LogoutAction = ({ variant }: VariantButtonProps) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation('/api/auth/logout', (url) => fetcher(url, {}, 'POST'))

    const logout = () => {
        trigger().then(res => {
            if (res.code == 200) {
                toast({
                    title: 'Info',
                    description: res.message + ' Please wait...',
                    style: successColor,
                })
                router.refresh()
                dispatch(setUser({ authState: false, fullName: '', role: '', username: '' }))
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