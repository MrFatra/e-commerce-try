import React, { ReactNode } from 'react'
import { Button } from './ui/button'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/lib/fetcher'
import { Loading } from './ui/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import LogoutButton from './logout-button'

type VariantButtonProps = {
    variant: 'button' | 'ghost'
}

const LogoutAction = ({ variant }: VariantButtonProps) => {
    const { trigger, isMutating } = useSWRMutation('/api/auth/logout', (url) => fetcher(url, {}, 'POST'))

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {
                    variant === 'button'
                        ?
                        <LogoutButton isLoading={isMutating} />
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
                    <AlertDialogAction onClick={(e) => trigger()}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default LogoutAction