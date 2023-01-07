import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout.js';
import '../styles/default.css'
import '../styles/default.scss'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )

}
