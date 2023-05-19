import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Error404 from './Error404.jsx';
import Feed from './routes/Feed.jsx';
import Article from './routes/Article.jsx';
import User from './routes/User.jsx';
import UserPreferences from './routes/UserPreferences.jsx';
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
                path: '/article/:id',
                element: <Article />
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '/user/preferences',
                element: <UserPreferences />
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
