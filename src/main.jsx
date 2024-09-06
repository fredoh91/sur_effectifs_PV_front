import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './custom.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Modifier } from './pages/Modifier.jsx'

const queryClient = new QueryClient

const baseName = import.meta.env.VITE_REACT_ROUTER_BASENAME

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/modif/:id',
    element: <Modifier/>,
  }
], {
  basename: baseName,
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RouterProvider>
  </StrictMode>,
)
