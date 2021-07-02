import { AppProps } from 'next/app';
import '../styles/globals.css';
import Page from "../components/Page";

function App({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default App
