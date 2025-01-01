import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './App.css'
import About from './About.tsx'
import Demo from './Demo.tsx'
import Home from "./Home.tsx"
import Layout from './Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/demo',
        element: <Demo/>
      }
    ]
  }
])

function App() {

  return (  
    <>
      <RouterProvider router={router} />    
    </>
  )
}

export default App
