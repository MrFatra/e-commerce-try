'use client'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/ui/loading'
import { fetcher, multipartFetcher } from '@/lib/fetcher'
import { Product } from '@prisma/client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MoneyInput from '@/components/forms/money-input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ProductSchema, optionalProductValidator } from '@/lib/joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { JsonObject } from '@prisma/client/runtime/library'
import { XCircleIcon } from 'lucide-react'
import useSWRMutation from 'swr/mutation'
import { toast } from '@/components/ui/use-toast'
import { successColor } from '@/lib/colors'

const page = () => {
    const { id } = useParams()
    const { trigger, isMutating } = useSWRMutation(`/api/admin/dashboard/product/${id}`, (url, { arg }: { arg?: ProductSchema | any }) => multipartFetcher(url, { arg }, 'POST'))
    const { data, error, isLoading, isValidating } = useSWR(`/api/admin/dashboard/product/${id}`, fetcher, { revalidateIfStale: false, revalidateOnFocus: false })
    const [imageSelected, setImageSelected] = useState<File | null>()
    const { register, handleSubmit, formState: { errors, isDirty, defaultValues }, control, setValue, reset } = useForm<ProductSchema>({
        resolver: joiResolver(optionalProductValidator)
    })

    useEffect(() => {
        if (data) {
            reset({
                name: data.product.name,
                price: data.product.price,
                stock: data.product.stock.toString(),
                image: data.product.image,
            })
        }
    }, [reset, data])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            setImageSelected(file)
        }
    }

    const handlePreviewImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, url?: string | undefined) => {
        event.preventDefault()
        if (imageSelected) {
            const imageURL = URL.createObjectURL(imageSelected)
            window.open(imageURL, "_blank")
        } else {
            window.open(url, '_blank')
        }
    }

    const handleResetImage = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault()
        setImageSelected(null)
        setValue('image', null)
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()

        const filledData = Object.fromEntries(Object.entries(data).filter(([key, value]: [any, any]) => {
            const keys = key as keyof typeof defaultValues
            if (value instanceof FileList) return value.length > 0
            return value !== undefined && value !== '' && value !== null && value !== defaultValues![keys]
        }))

        trigger(filledData).then(res => {
            if (res.code === 201) {
                toast({
                    title: 'Okay!',
                    description: res.message,
                    style: successColor
                })
            } else {
                toast({
                    title: 'Ups',
                    description: res.message,
                    variant: 'destructive'
                })
            }
        })
    })

    useEffect(() => {
        console.log(imageSelected)
    }, [imageSelected, setImageSelected])


    if (isLoading || isValidating) return (
        <Loading />
    )

    if (error) return (
        <div>
            <p>Could not find the product.</p>
        </div>
    )

    const product: Product = data.product
    const existingImageURL: string | undefined = ((product?.image as JsonObject)?.data as JsonObject)?.link as string

    return (
        <form onSubmit={onSubmit}>
            <div className='container my-5'>
                <div className="flex items-center justify-center">
                    <div className="mb-3">
                        <div className="bg-slate-200 rounded-lg flex justify-center items-center group h-64 relative overflow-hidden">
                            {imageSelected ? (
                                <div className='relative h-64'>
                                    <img
                                        loading='lazy'
                                        src={URL.createObjectURL(imageSelected)}
                                        alt="Selected Image"
                                        className='bg-cover rounded-lg h-full block w-full transition-opacity duration-300 group-hover:opacity-50'
                                    />
                                    <Button
                                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-black rounded-md py-2 px-4 transition-opacity duration-300 group-hover:opacity-100'
                                        onClick={(event) => handlePreviewImage(event)}
                                    >
                                        Preview Image {">"}
                                    </Button>
                                    <XCircleIcon className='absolute top-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' size={25} onClick={handleResetImage} />
                                </div>
                            ) : existingImageURL ? (
                                <div className='relative h-64'>
                                    <img
                                        loading='lazy'
                                        src={existingImageURL}
                                        alt="Existing Image"
                                        className='bg-cover rounded-lg h-full block w-full transition-opacity duration-300 group-hover:opacity-50'
                                    />
                                    <Button
                                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-black rounded-md py-2 px-4 transition-opacity duration-300 group-hover:opacity-100'
                                        type='button'
                                        onClick={(event) => handlePreviewImage(event, existingImageURL)}
                                    >
                                        Preview Image {">"}
                                    </Button>
                                </div>
                            ) : (
                                <p className='px-28'>No Image Selected.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Input type='file' accept='.jpg, .png, .jpeg' {...register('image')} onChange={handleImageChange} />
                    <p className='text-red-500 text-sm'>{errors.image?.message}</p>
                    <p>Product Name</p>
                    <Input
                        type='text'
                        defaultValue={product.name}
                        {...register('name')}
                    />
                    <p className='text-red-500 text-sm'>{errors.name?.message}</p>
                    <p>Price</p>
                    <MoneyInput defaultValue={product.price.toString()} controller={control} />
                    <p className='text-red-500 text-sm'>{errors.price?.message}</p>
                    <p>Stock</p>
                    <Input
                        type='number'
                        defaultValue={product.stock}
                        placeholder={String(product.stock)}
                        {...register('stock')}
                    />
                    <p className='text-red-500 text-sm'>{errors.stock?.message}</p>
                    <Button type="submit" className='py-6 font-medium text-base' disabled={!isDirty && !imageSelected || isMutating}>{isMutating ? <Loading /> : 'Edit'}</Button>
                </div>
            </div>
        </form>
    )
}

export default page
