import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Services from './Pages/Services';
import Register from './Pages/Register';


const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:"/Login",
        element:<Login></Login>
      },
         {
        path:"/Services",
        element:<Services></Services>
      },
       {
        path:"/Register",
        element:<Register></Register>
      },
      {
        path: "*",
        element: <h1>Page not found Please Check your url</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
