'use client'
import React, { useRef } from 'react'

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    const request = await fetch('/api/auth/login', {
      method: "POST",
      body: JSON.stringify({ username, password })
    })
    const response = await request.json()
    console.log(response)

  }

  return (
    <div>
      <p>Login</p>
      <form action="" onSubmit={login}>
        <p>Username</p>
        <input type="text" className='bg-white border' ref={usernameRef} />
        <p>Password</p>
        <input type="password" className='bg-white border' ref={passwordRef} />
        <button type='submit' className='bg-blue-300'>Login</button>
      </form>
    </div>
  )
}

export default Login