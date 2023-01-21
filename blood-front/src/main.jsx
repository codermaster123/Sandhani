import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import client from "./react-query-client"
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false }/>
  </QueryClientProvider>
)