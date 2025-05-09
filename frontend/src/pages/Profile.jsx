import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {

  return (
    <div className='bg-base-200 h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-100 border-1 border-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your Profile Information</p>
          </div>
          {/* avatar upload section*/}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Profile