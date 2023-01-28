import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import styles from './App.module.css';
import { Tree } from './components/Tree/Tree';

function App() {
  return (
    <div className={styles.App}>
      <h1>Database Navigator</h1>
      <Tree />
    </div>
  );
}

const queryClient = new QueryClient();

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default WrappedApp;
