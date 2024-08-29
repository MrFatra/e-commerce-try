import React from 'react'
import { Button } from '@/components/ui/button'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/lib/fetcher'
import { Loading } from '@/components/ui/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { successColor } from '@/lib/colors'
import { ProductSchema } from '@/lib/joi'
import useSWR from 'swr'

type VariantButtonProps = {
    variant: 'button' | 'ghost'
    id: string
}

const DeleteAction = ({ variant, id }: VariantButtonProps) => {
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation(`/api/admin/dashboard/product/${id}`, (url, { arg }: { arg?: ProductSchema | any }) => fetcher(url, { arg }, 'DELETE'))
    const { error, isLoading, isValidating, mutate } = useSWR('/api/admin/dashboard/product', (url) => fetcher(url), { revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: false })

    const deleteProduct = () => {
        trigger().then(res => {
            if (res.code == 201) {
                toast({
                    title: 'Info',
                    description: res.message + ' Please wait...',
                    style: successColor,
                })
                mutate('/api/admin/dashboard/product')
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
            <AlertDialogTrigger className='w-full'>
                {
                    variant === 'button'
                        ?
                        <Button variant={'destructive'}>{isMutating ? <Loading /> : 'Delete'}</Button>
                        :
                        <div className="hover:bg-danger text-sm hover:text-danger-foreground p-2 duration-100 rounded-sm text-start w-full">{isMutating ? <Loading /> : 'Delete'}</div>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure want to <span className='text-danger font-bold text-xl'>Delete this item</span>?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can't be returnable!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteProduct}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteAction