import React from 'react'
import { Button } from './ui/button'
import { Loading } from './ui/loading'

const LogoutButton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <Button variant={'destructive'}>{isLoading ? <Loading /> : 'Logout'}</Button>
    )
}

export default LogoutButton