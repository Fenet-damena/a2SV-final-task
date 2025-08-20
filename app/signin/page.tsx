import React from 'react'
import Link from 'next/link'
import SignIn from '../components/Auth/SigninForm'

const SignInPage = () => {
  return (
    <div className="relative h-screen">
      <div className='flex flex-col gap-[24px] w-[408px] absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2'>
        <h1 className="font-extrabold text-[32px] font-poppins flex items-center justify-center">Welcome Back,</h1>

        <SignIn />

        <div className='flex'>
          <p className="font-normal text-[16px] font-epilogue text-[#202430]">Don’t have an account?</p>
          <Link href="/SignUp" className="text-blue-600 hover:underline text-[#202430]">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage