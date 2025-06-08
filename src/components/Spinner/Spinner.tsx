import React from 'react'

interface SpinnerProps {
    text: string
}

const Spinner: React.FC<SpinnerProps> = ({text}) => {
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">{text}</h1>
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  </div>
  )
}

export default Spinner