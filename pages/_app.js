import '../global_styles.css'
import Navbar from "../components/UI/navbar/navbar";
import { AppWrapper } from '../lib/context';

function Application({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Navbar />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default Application;
