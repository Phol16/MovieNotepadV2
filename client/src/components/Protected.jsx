import React, { useMemo} from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
  const accessToken = useMemo(()=>{return localStorage.getItem('Token');})
  return (
    accessToken ? children :<Navigate to='/'/>
  )
}

export default Protected