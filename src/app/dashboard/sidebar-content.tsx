'use client'
import React, { useContext } from 'react'
import { Box, Users, ShoppingBasket } from 'lucide-react'
import { SidebarItem } from '@/components/sidebar'

const SidebarContent = () => {

    return (
        <div className="mt-4 flex flex-col">
            <SidebarItem icon={<Box />} text='Products' />
            <SidebarItem icon={<Users />} text='Customers' />
            <SidebarItem icon={<ShoppingBasket />} text='Orders' />
        </div>
    )
}
export default SidebarContent
