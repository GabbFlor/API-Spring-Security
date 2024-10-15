import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Error from './routes/Error.jsx';
import Registro from './routes/Registro.jsx';

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/registro",
        element: <Registro />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)