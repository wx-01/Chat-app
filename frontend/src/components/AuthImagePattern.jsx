import React from 'react'

const AuthImagePattern = ({title,subtitle}) => {
  return (
    <div className='hidden lg:flex  justify-center items-center  bg-base-100 p-15 '>
          <div className='max-w-md  text-center w-full'>
                    <div className='grid grid-cols-3 gap-2 p-7 '>
                              {[...Array(9)].map((_, i) => (
                                        <div key={i} 
                                        className={`aspect-square bg-accent  rounded-2xl 
                                                  ${i % 2 === 0 ? "animate-pulse": "" }`} />
                              ))}
                    </div>
                    <h2 className='text-2xl font-bold mb-3'>{title}</h2>
                    <p className='text-base-content/60'>{subtitle}</p>
          </div>
    </div>
  )
}

export default AuthImagePattern