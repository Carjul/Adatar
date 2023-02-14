import React from 'react';
import { useRouter } from 'next/router'
import {getCookie} from 'cookies-next'

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const  token  = getCookie('token');

  React.useEffect(() => {
    if(!token) router.replace('/');
  }, [token,router]);

  return (<>{children}</>)
};

export default PrivateRoute;
