import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import { Tree } from './components/Tree/Tree';

function App() {
  return (
    <div className="App">
      <h1>Crossword</h1>
      <div className="">
        <Tree />
      </div>
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
