import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileTab = () => {
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    localStorage.removeItem('Token')
    navigate('/')
  }
  return (
    <div>
      <button onClick={handleLogOut} className='p-2 rounded-md'>Log Out</button>
    </div>
  )
}

export default ProfileTab