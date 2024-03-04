'use client'
import React, { useEffect, useState } from 'react'
import { Product } from '@prisma/client'

const Marketplace = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Product[]>()

  const init = async () => {
    try {
      const request = await fetch('/api/marketplace')
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
    const request = await fetch('api/auth/logout', {
      method: "POST",
    })
    const response = await request.json()
    console.log(response)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <p>Marketplace</p>
      <p>List of products:</p>
      {
        isLoading 
        ? <p>Loading</p>
        : data?.length
        ? data.map(item => (
          <p>{item.name}</p>
        ))
        : <p>No data.</p>
      }
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Marketplace