import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './App.css'
import About from './About.tsx'
import Demo from './Demo.tsx'
import Home from "./Home.tsx"
import Layout from './Layout.tsx'
import GamesLayout from './GamesLayout.tsx'
import Games from './assets/Games.tsx'
import TicTacToe from './TicTacToe.tsx'
import { Navigate } from 'react-router'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'demo',
        element: <Demo/>
      },
      {
        path: 'games',
        element: <GamesLayout/>,
        children: [
          {
            index: true,
            element: <Games/>,
          },
          {
            path: 'tic-tac-toe',
            element: <TicTacToe/>,
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to={'/'}/>
      },
    ]
  }
], {basename: "/first-website/"})

function App() {

  return (  
    <>
      <RouterProvider router={router} />    
    </>
  )
}

export default App
