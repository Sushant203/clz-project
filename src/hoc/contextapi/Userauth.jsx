import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



export const UserAuthContext = createContext();

function UserAuthContextApi({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [Token, setToken] = useState('');
  console.log(Token)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/landing') {
        navigate('/')
      }
    } else {
      navigate('/landing');
    }
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <UserAuthContext.Provider value={{ name: 'himakl', tokn: localStorage.getItem('token') }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthContextApi