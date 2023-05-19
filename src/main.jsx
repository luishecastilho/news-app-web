import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Error404 from './Error404.jsx';
import Feed from './routes/Feed.jsx';
import Article from './routes/Feed.jsx';
import User from './routes/User.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                path: '/',
                element: <Feed />
            },
            {
                path: '/articles/:article',
                element: <Article />
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
