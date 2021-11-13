import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { StyleResources } from '../components/StyleResources'
import { configureStore } from '../redux/getStore'
import '../styles/globals.css'

const store = configureStore({})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StyleResources>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </StyleResources>
    </Provider>
  )
}

export default MyApp
