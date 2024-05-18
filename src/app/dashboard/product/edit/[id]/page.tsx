'use client'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/ui/loading'
import { fetcher } from '@/lib/fetcher'
import { Product } from '@prisma/client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import MoneyInput from '@/components/forms/money-input'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ProductSchema, productValidator } from '@/lib/joi'
import { joiResolver } from '@hookform/resolvers/joi'
import ImageAsync from '@/components/Image'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { NumericFormat, removeNumericFormat } from 'react-number-format'
import { removeFormatting } from 'react-number-format/types/numeric_format'
import { removeCurrencyFormat } from '@/lib/removeFormatter'

const page = () => {
    const { id } = useParams()
    const { data, error, isLoading, isValidating } = useSWR(`/api/admin/dashboard/product/${id}`, fetcher, { revalidateIfStale: false, revalidateOnFocus: false })
    const [imageSelected, setImageSelected] = useState<File>()
    const [isImageReady, setIsImageReady] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<ProductSchema>({
        resolver: joiResolver(productValidator),
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageSelected(event.target.files[0])
        }
    }

    const handlePreviewImage = () => {
        console.log('imageSelected: ', imageSelected)
        if (imageSelected) {
            const imageURL = URL.createObjectURL(imageSelected)
            window.open(imageURL, "_blank")
        }
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()
        console.log(removeCurrencyFormat(String(data.price)))
        console.log('edited data: ', data)

    })

    if (isLoading || isValidating) return (
        <Loading />
    )

    if (error) return (
        <div className="">
            <p>Could not find the product.</p>
        </div>
    )

    const product: Product = data.product
    return (
        // remove h-full for scrolling
        <form onSubmit={onSubmit}>
            <div className='container my-5'>
                <div className="flex items-center justify-center">
                    <div className=" mb-3">
                        <div className="bg-slate-200 rounded-lg flex justify-center items-center group h-64 relative overflow-hidden">
                            {/* <ImageAsync/> */}
                            {imageSelected ? (
                                <div className='relative h-64'>
                                    <img
                                        loading='lazy'
                                        src={URL.createObjectURL(imageSelected)}
                                        alt="Image"
                                        className='bg-cover rounded-lg h-full block w-full transition-opacity duration-300 group-hover:opacity-50 '
                                    />
                                    <Button
                                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-black rounded-md py-2 px-4 transition-opacity duration-300 group-hover:opacity-100'
                                        onClick={handlePreviewImage}
                                    >
                                        Preview Image {">"}
                                    </Button>
                                </div>
                            ) : <p className='px-28'>No Image Selected.</p>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Input type='file' accept='image/jpg, image/png, image/jpeg' {...register('image')} onChange={handleImageChange} />
                    <p className='text-red-500 text-sm'>{errors.image?.message}</p>
                    <p>Product Name</p>
                    <Input
                        type='text'
                        placeholder={product.name}
                        {...register('name')}
                    />
                    <p className='text-red-500 text-sm'>{errors.name?.message}</p>
                    <p>Price</p>
                    <MoneyInput placeholder={String('Rp. ' + product.price)} register={register}/>
                    {/* <NumericFormat
                        getInputRef={register('price').ref}
                        onValueChange={(vals) => { console.log(vals.value) }}
                        placeholder={String('Rp. ' + product.price)}
                        customInput={Input}
                        prefix='Rp '
                        thousandSeparator={'.'}
                        decimalSeparator=','
                        allowNegative={false}
                        {...register('price')}
                    /> */}
                    <p className='text-red-500 text-sm'>{errors.price?.message}</p>
                    <p>Stock</p>
                    <Input
                        type='number'
                        placeholder={String(product.quantity)}
                        {...register('stock')}
                    />
                    <p className='text-red-500 text-sm'>{errors.stock?.message}</p>
                    <Button type='submit' className='w-full py-6'>Edit</Button>
                </div>
            </div>
        </form>
    )
}

export default page