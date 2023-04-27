import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { Notifications } from '@mantine/notifications';
import GlobalStyle from '../styles/Global.style';

export const queryClient = new QueryClient();
// export const queryClient = new QueryClient({ defaultOptions: { queries: { suspense: true, retry: 0 } } });

const GlobalProvider = ({ children }) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyle />
      {children}
      <Notifications position="top-center" />
    </QueryClientProvider>
  </RecoilRoot>
);

export default GlobalProvider;
