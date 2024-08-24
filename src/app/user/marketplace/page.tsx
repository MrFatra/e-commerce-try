'use client'
import React, { useEffect, useState } from 'react'
import { Product } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoutAction from '@/components/forms/logout-action'

const Marketplace = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Product[]>()
  const router = useRouter()

  const init = async () => {
    try {
      const request = await fetch('/api/user/products')
      const response = await request.json()
      console.log('response: ', response)

      setData(response.products)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const request = await fetch('/api/auth/logout', { method: "POST" })
      const response = JSON.stringify(await request.json())
      setTimeout(() => router.replace('/user/marketplace'), 800)
      console.log(response)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <LogoutAction variant='button'/>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">List of Products:</p>
          <ScrollArea className="h-64">
            {
              isLoading
                ? <div className="flex justify-center items-center"><Loader2 className="animate-spin mr-2 h-6 w-6" /> Loading</div>
                : data?.length
                  ? data.map(item => (
                    <p key={item.id} className="py-2 border-b">{item.name}</p>
                  ))
                  : <p className="text-gray-500">No data available.</p>
            }
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default Marketplace