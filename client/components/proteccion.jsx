import React from 'react';
import { useRouter } from 'next/router'


const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const  token  = localStorage.getItem('token');

  if (!token) {
    router.push('/');
    return null;
  }

  return (<>{children}</>)
};

export default PrivateRoute;
