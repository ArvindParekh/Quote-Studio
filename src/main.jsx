import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, Link} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/generate',
    element: <App />,
  },
  {
    path: '/',
    element: <Link to='/generate'>Get Started</Link>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
