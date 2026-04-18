import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './About.jsx'
import './App.css'
import ClimbingRoutes from './ClimbingRoutes.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import RoutesForm from './RoutesForm.jsx'
import Statistics from './Statistics.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <About /> },
      { path: 'about', element: <About /> },
      { path: 'routes', element: <ClimbingRoutes /> },
      { path: 'add-routes', element: <RoutesForm /> },
      { path: 'statistics', element: <Statistics /> },
    ],
  },
])

function App() {
  return (
    <>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </>
  )
}

export default App
