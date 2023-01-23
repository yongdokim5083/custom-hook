import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import Advice from './components/Advice';
import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';

const queryClient = new QueryClient({
  QueryCache: new QueryCache({
    onError: (error, query) => {
      console.log('onError', error);
    },
    onSuccess: (data) => {
      console.log('onSucceess', data);
    },
  }),
});

function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Advice />
        <ForwardCounter />
        <BackwardCounter />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
