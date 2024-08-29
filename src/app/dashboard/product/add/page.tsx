'use client'
import React, { useEffect, useState } from 'react'
import MoneyInput from '@/components/forms/money-input'
import useSWRMutation from 'swr/mutation';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetcher, multipartFetcher } from '@/lib/fetcher'
import { ProductSchema, productValidator } from '@/lib/joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast';
import { Loading } from '@/components/ui/loading';
import { successColor } from '@/lib/colors';
import { SingleImageDropzone } from '@/components/FileInput';

const page = () => {
    const { trigger, isMutating } = useSWRMutation('/api/admin/dashboard/product', (url, { arg }: { arg?: ProductSchema | any }) => multipartFetcher(url, { arg }, 'POST'))
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm<ProductSchema>({
        resolver: joiResolver(productValidator)
    })
    const [imageSelected, setImageSelected] = useState<File>()

    const handlePreviewImage = () => {
        if (imageSelected) {
            const imageURL = URL.createObjectURL(imageSelected)
            window.open(imageURL, "_blank")
        }
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()
        console.log('Data: ', {
            ...data,
            image: imageSelected,
        })

        trigger({
            ...data,
            image: imageSelected,
        }).then(res => {
            if (res.code !== 200) {
                toast({
                    title: 'Ups',
                    description: res.message,
                    variant: 'destructive'
                })
            } else if (res.code == 200) {
                toast({
                    title: 'Okay!',
                    description: res.message,
                    style: successColor
                })
            }
        })
    })

    return (
        <div className='container mx-auto my-5'>
            <p className='font-bold text-3xl text-foreground mb-3'>Add New Products</p>
            <form onSubmit={onSubmit} encType='multipart/form-data' method='post'>
                <div className="bg-slate-200 rounded-lg relative group h-56">
                    <SingleImageDropzone
                        height={'14rem'}
                        className={`${imageSelected && 'group-hover:opacity-50'}`}
                        value={imageSelected}
                        setValue={setValue}
                        dropzoneOptions={{ 
                            maxFiles: 1,
                         }}
                        onChange={(file) => {
                            setImageSelected(file)
                            setValue('image', file, { shouldValidate: true, shouldDirty: true })
                        }}
                    />
                    {imageSelected && (
                        <Button
                            type='button'
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-black rounded-md py-2 px-4 text-white transition-opacity duration-300 group-hover:opacity-100"
                            onClick={handlePreviewImage}
                        >
                            Preview Image {">"}
                        </Button>
                    )}
                </div>
                <div className="flex flex-col gap-5 my-2">
                    <p className='text-red-500 text-sm mt-3'>{errors.image?.message}</p>
                    <div className="">
                        <p>Product Name</p>
                        <Input
                            type='text'
                            {...register('name')}
                        />
                        <p className='text-red-500 text-sm'>{errors.name?.message}</p>
                    </div>
                    <div className="">
                        <p>Price</p>
                        <MoneyInput
                            controller={control}
                            defaultValue={(0).toString()}
                        />
                    </div>
                    <div className="">
                        <p>Stock</p>
                        <Input
                            defaultValue={(0).toString()}
                            type='number'
                            {...register('stock')}
                        />
                        <p className='text-red-500 text-sm'>{errors.stock?.message}</p>
                    </div>
                    <Button type="submit" className='py-6 font-medium text-base' disabled={isMutating} >{isMutating ? <Loading /> : 'Add'}</Button>
                </div>
            </form>
        </div>
    )
}

export default page