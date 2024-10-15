import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Error from './routes/Error.jsx';
import Registro from './routes/Registro.jsx';
import Login from './routes/Login.jsx';
import Perfil from './routes/Perfil.jsx';
import Add_postagem from './routes/Add-postagem.jsx';

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
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/perfil",
        element: <Perfil />
      },
      {
        path: "/add-postagem",
        element: <Add_postagem />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
