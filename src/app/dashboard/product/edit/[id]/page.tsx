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
import { SingleImageDropzone } from '@/components/FileInput'
import { useEdgeStore } from '@/lib/edgestore'
import { backendClient } from '@/app/api/edgestore/[...edgestore]/route'

const page = () => {
    const { id } = useParams()
    const { trigger, isMutating } = useSWRMutation(`/api/admin/dashboard/product/${id}`, (url, { arg }: { arg?: ProductSchema | any }) => multipartFetcher(url, { arg }, 'POST'))
    const { data, error, isLoading, isValidating } = useSWR(`/api/admin/dashboard/product/${id}`, fetcher, { revalidateIfStale: false, revalidateOnFocus: false })
    const [imageSelected, setImageSelected] = useState<File | undefined>()
    const { edgestore } = useEdgeStore()
    const { register, handleSubmit, formState: { errors, isDirty, defaultValues }, control, setValue, reset } = useForm<ProductSchema>({
        defaultValues: {
            name: '',
            price: '',
            stock: '',
            image: null,
        },
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

    const handlePreviewImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, url?: string | undefined) => {
        event.preventDefault()
        if (imageSelected) {
            const imageURL = URL.createObjectURL(imageSelected)
            window.open(imageURL, "_blank")
        } else {
            window.open(url, '_blank')
        }
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()

        const filledData = Object.fromEntries(Object.entries(data).filter(([key, value]: [any, any]) => {
            const keys = key as keyof typeof defaultValues
            return value !== undefined && value !== '' && value !== null && value != defaultValues![keys]
        }))

        console.log(filledData)

        // trigger({
        //     ...filledData,
        //     image: imageSelected,
        // }).then(res => {
        //     if (res.code === 201) {
        //         toast({
        //             title: 'Okay!',
        //             description: res.message,
        //             style: successColor
        //         })
        //     } else {
        //         toast({
        //             title: 'Ups',
        //             description: res.message,
        //             variant: 'destructive'
        //         })
        //     }
        //     console.log(res)
        // })
    })

    // useEffect(() => {
    //     console.log(imageSelected)
    // }, [imageSelected, setImageSelected])


    if (isLoading || isValidating) return (
        <Loading />
    )

    if (error) return (
        <div>
            <p>Could not find the product.</p>
        </div>
    )

    const product: Product = data.product
    // const existingImageURL: string | undefined = (product?.image as JsonObject)?.url as string

    return (
        <form onSubmit={onSubmit} className="container mx-auto my-10">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Product</h2>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Image</label>
                <div className="bg-slate-200 rounded-lg relative group h-56">
                    <SingleImageDropzone
                        height={'14rem'}
                        className={`${imageSelected && 'group-hover:opacity-50'}`}
                        value={imageSelected}
                        onChange={(file) => {
                            setImageSelected(file)
                            setValue('image', file)
                        }}
                    />
                    {imageSelected && (
                        <Button
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-black rounded-md py-2 px-4 text-white transition-opacity duration-300 group-hover:opacity-100"
                            onClick={(event) => handlePreviewImage(event)}
                        >
                            Preview Image {">"}
                        </Button>
                    )}
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                <Input
                    type="text"
                    defaultValue={product.name}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('name')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <MoneyInput
                    defaultValue={product.price.toString()}
                    controller={control}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Stock</label>
                <Input
                    type="number"
                    defaultValue={product.stock.toString()}
                    placeholder="Enter stock quantity"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('stock')}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-2">{errors.stock.message}</p>}
            </div>

            <div className="mt-8">
                <Button
                    type="submit"
                    className={`w-full py-6 font-medium text-white rounded-lg transition-all duration-300 ${isMutating ? 'bg-opacity-50  cursor-not-allowed' : 'hover:bg-opacity-50'}`}
                    disabled={!isDirty && !imageSelected || isMutating}
                >
                    {isMutating ? <Loading /> : 'Edit'}
                </Button>
            </div>
        </form>
    )
}

export default page
