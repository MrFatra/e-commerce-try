'use client'
import React, { useContext } from 'react'
import { Box, Users, ShoppingBasket } from 'lucide-react'
import { SidebarItem } from '@/components/sidebar'

const SidebarContent = () => {

    return (
        <div className="mt-4 flex flex-col">
            <SidebarItem icon={<Box />} text='Products' link='/products'/>
            <SidebarItem icon={<Users />} text='Customers' link='/customers'/>
            <SidebarItem icon={<ShoppingBasket />} text='Orders' link='/orders'/>
        </div>
    )
}
export default SidebarContent
