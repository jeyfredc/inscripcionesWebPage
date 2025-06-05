import React from 'react'

const ValidationError = ({errors}: {errors: string[]}) => {
  return (
    <div className="mt-2 text-red-600">
        {
            errors.map((error, index) => (
                <p key={index}>{error}</p>
            ))
        }
    </div>
  )
}

export default ValidationError