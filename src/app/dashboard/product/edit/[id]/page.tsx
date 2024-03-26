'use client'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/ui/loading'
import { fetcher } from '@/lib/fetcher'
import { Product } from '@prisma/client'
import { useParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import MoneyInput from '@/components/forms/money-input'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ProductSchema, productValidator } from '@/lib/joi'
import { joiResolver } from '@hookform/resolvers/joi'

const page = () => {
    const { id } = useParams()
    const { data, error, isLoading, isValidating } = useSWR(`/api/admin/dashboard/product/${id}`, fetcher, { revalidateIfStale: false, revalidateOnFocus: false })
    const { register, handleSubmit, formState: { errors } } = useForm<ProductSchema>({
        resolver: joiResolver(productValidator),
    })

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()
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
                <div className="w-full">
                    <div className="h-64 bg-slate-200 rounded-lg flex justify-center items-center">
                        <Image
                            alt='image'
                            src={'/images/market-login.jpg'}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-full h-64 object-contain"
                        />
                    </div>
                </div>
                <div className="">
                    <Input type='file' accept='image/jpg, image/png, image/jpeg' {...register('image')} />
                    <p className='text-red-500 text-sm'>{errors.image?.message}</p>
                    <p>Product Name</p>
                    <Input
                        type='text'
                        placeholder={product.name}
                        {...register('name')}
                    />
                    <p className='text-red-500 text-sm'>{errors.name?.message}</p>
                    <p>Price</p>
                    <MoneyInput placeholder={String('Rp. ' + product.price)} {...register('price')} />
                    <p className='text-red-500 text-sm'>{errors.price?.message}</p>
                    <p>Stock</p>
                    <Input
                        type='number'
                        placeholder={String(product.quantity)}
                        {...register('stock')}
                    />
                    <p className='text-red-500 text-sm'>{errors.stock?.message}</p>
                    <Button type='submit'>Edit</Button>
                </div>
            </div>
        </form>
    )
}

export default page