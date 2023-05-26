import NavbarLayout from "@/layouts/navbar-layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

    return (
        <QueryClientProvider client={queryClient}>
            <NavbarLayout>
                <Component {...pageProps} />
            </NavbarLayout>
        </QueryClientProvider>
    );
}
