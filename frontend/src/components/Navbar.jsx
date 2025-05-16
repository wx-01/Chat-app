import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import React from 'react'
import { Link, Links } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'



const Navbar = () => {
  const{authUser,logOut}= useAuthStore()
  return (
    <header className='border-b-2 border-primary fixed w-full top-0 z-40 backdroop-blur-lg bg-base-100'>
      <div className='container mx-auto h-14 px-4'>
        <div className='flex items-center justify-between h-full '>
          <div className='flex items-center gap-8'>
            <Link to ='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
            <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
            <MessageSquare className='size-5 text-primary' />
            </div>
            <h1 className='font-bold text-lg'>Chatty</h1>
            </Link>
          </div>
          <div className='flex items-center gap-2'> 
            {authUser && (
              <>
              <button onClick={logOut} className='btn btn-primary btn-sm gap-2 transition-colors'>
                <LogOut className='size-4'/>
                <span className='hidden sm:inline'>LogOut</span>
              </button>
              <Link to='/profile' className='btn btn-primary btn-sm gap-2 transition-colors'>
              <User className='size-4'/>
              <span className='hidden sm:inline'>Profile</span>
              </Link>
              </>
            )}
            
            <Link to='/settings' className='btn btn-primary btn-sm gap-2 transition-colors'>
            <Settings className='size-4'/>
            <span className='hidden sm:inline'>Settings</span>
            </Link>
          </div>

        </div>
      </div>


      </header>
  )
}

export default Navbar