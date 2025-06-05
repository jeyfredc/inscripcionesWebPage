import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-xl">Página no encontrada</p>
    <Link to="/dashboard" className="mt-4 text-blue-600 hover:underline">
      Volver al inicio
    </Link>
  </div>
  )
}

export default NotFound