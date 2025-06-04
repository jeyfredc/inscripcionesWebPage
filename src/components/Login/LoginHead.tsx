import React from 'react'
import logo from '../../assets/logo.png'

interface LoginHeadProps {
    children: React.ReactNode
    title: string
}

const LoginHead = ({children, title}: LoginHeadProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
          <img src={logo} alt="Logo" className="w-32 mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </div>
    </div>
  )
}

export default LoginHead