import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AppLayout } from './AppLayout'
import { SnackbarProvider } from "@/context/SnackbarContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <RecoilRoot>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
    </SnackbarProvider>
  )
}
