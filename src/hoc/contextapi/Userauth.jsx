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
      if (location.pathname === '/login') {
        navigate('/')
      }
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <UserAuthContext.Provider value={{ name: 'kisan', tokn: localStorage.getItem('token') }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthContextApi