import React from 'react';
import { useRouter } from 'next/router'
import {getCookie} from 'cookies-next'

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const  token  = getCookie('token');
  
  const rol = getCookie('RolId');

  React.useEffect(() => {
    if(!token) router.replace('/');
  }, [token,router]);

  React.useEffect(() => {

    const coordinador = ['/home', '/perfil', '/dashboard']
    const directivo = ['/home', '/perfil', '/dashboard', '/upload']
    const admin = ['/home', '/perfil', '/dashboard', '/upload', '/config']

      if ( !admin.includes(router.pathname) && rol === '1' ) {
        router.push('/home');
      }
      if (!directivo.includes(router.pathname) && rol === '2') {
        router.push('/home');
      }
      if (!coordinador.includes(router.pathname) && rol === '3' ) {
        router.push('/home');
      }

  }, [rol, router]);

  return (<>{children}</>)
};

export default PrivateRoute;
