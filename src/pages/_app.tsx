import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@scss/app.scss';

const LuckyDrawApp = ({Component, pageProps}: AppProps) => {
    return (
        // built-in attribute for rehydration
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
    )
};

export default LuckyDrawApp;