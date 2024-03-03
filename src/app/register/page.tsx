'use client'
import React, { useRef, useState } from 'react'

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)

    const fullNameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const fullName = fullNameRef.current?.value
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value

        const data = { fullName, username, password, confirmPassword }

        const request = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify(data)
        })
        const response = await request.json()
        console.log(response)

    }

    return (
        <div>
            <p>Register</p>
            <form action="" onSubmit={onSubmit}>
                <p>Full Name</p>
                <input type="text" ref={fullNameRef} className='bg-white border'/>
                <p>Username</p>
                <input type="text" ref={usernameRef} className='bg-white border'/>
                <p>Password</p>
                <input type="password" ref={passwordRef} className='bg-white border'/>
                <p>Confirm Password</p>
                <input type="password" ref={confirmPasswordRef} className='bg-white border'/>
                <button className='bg-blue-300'>{isLoading ? 'Loading' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default Register