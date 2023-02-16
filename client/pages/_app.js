import '@/styles/globals.css'
import { store}  from '@/app/Store/store'
import { Provider } from 'react-redux'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return <>
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  </>
}
