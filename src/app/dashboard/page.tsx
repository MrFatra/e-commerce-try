'use client'
import React, { useEffect } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Loading } from '@/components/ui/loading'
import LogoutAction from '@/components/forms/logout-action'
import { useUserSelector } from '@/store/hook'

const Dashboard = () => {
  const { data, isLoading, isValidating } = useSWR('/api/admin/dashboard/product', (url) => fetcher(url), { revalidateIfStale: false, revalidateOnFocus: false })
  const user  = useUserSelector(state => state.auth)

  useEffect(() => {
    console.log(user)
  }, [user])

  if (isLoading || isValidating) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading size={30} />
    </div>
  )

  return (
    <>
      <div className='container my-5'>
        <div className="flex justify-between items-center my-5">
          <p className='text-3xl font-bold'>List of products:</p>
          <LogoutAction variant='button' />
        </div>
        <DataTable columns={columns} data={data.products} />
      </div>
    </>
  )
}

export default Dashboard