import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RadioProvider } from './contexts/radioContext';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RadioProvider>
                <Component {...pageProps} />
            </RadioProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
