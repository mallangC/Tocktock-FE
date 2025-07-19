import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true
    }
  }
});

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </BrowserRouter>,
)
