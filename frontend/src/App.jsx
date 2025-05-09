import React, { useEffect } from 'react'
import{Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Navbarr from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast';

import {Blend, Loader} from 'lucide-react'

const App = () => {
 const{authUser,checkAuth ,isCheckingAuth}= useAuthStore()

 useEffect(() =>{
   checkAuth()
 },[checkAuth])
 console.log(authUser)  

if(isCheckingAuth && !authUser){	
	return(
		<div className="flex justify-center items-center h-screen">
			<Blend className ="size-10 animate-spin"/>
		</div>
	)}
  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path='/' element={authUser ? <Home /> :<Navigate to='/login'/>} />
        <Route path='/login' element={!authUser ?<Login />:<Navigate to='/'/>} />
        <Route path='/signup' element={!authUser ?<Signup />:<Navigate to='/'/>} />
        <Route path='/profile' element={authUser ? <Profile /> :<Navigate to='/login'/>} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
      
      <Toaster
  position="top-right"
  reverseOrder={false}
/>

    </div>
  )
}

export default App