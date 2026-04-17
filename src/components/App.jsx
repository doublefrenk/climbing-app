import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { authFetch } from '../utils/authFetch.js'
import About from './About.jsx'
import './App.css'
import ClimbingRoutes from './ClimbingRoutes.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import RoutesForm from './RoutesForm.jsx'
import Statistics from './Statistics.jsx'

async function homeLoader(user, getToken) {
  if (!user) return null;

  const {id, primaryEmailAddress, firstName, lastName, imageUrl} = user.user;
  const email = primaryEmailAddress.emailAddress;
  const fullName = `${firstName} ${lastName}`;

  const resUser = await authFetch('/api/users/sync', {
    method: 'POST',
    body: JSON.stringify({
      clerkId: id,
      email: email,
      name: fullName,
      photo: imageUrl
    })
  }, getToken);

  const userResponse = await resUser.json()
  const userData = userResponse.user

  const [resRoutes, resGrades, resDate] = await Promise.all([
    authFetch('/api/routes', {}, getToken),
    authFetch(`/api/routes/stats/grades/${userData._id}`, {}, getToken),
    authFetch(`/api/routes/stats/date/${userData._id}`, {}, getToken),
  ])

  const routesResponse = await resRoutes.json()
  const routesNotFiltered = routesResponse.routes
  const routes = {
    boulder: routesNotFiltered.boulder.filter(r => r.users.includes(userData._id)),
    sport: routesNotFiltered.sport.filter(r => r.users.includes(userData._id)),
    gymRoutes: routesNotFiltered.gymRoutes.filter(r => r.users.includes(userData._id))
  };
  const statsGrades = await resGrades.json()
  const statsDate = await resDate.json()
  return { userData, routes, statsGrades, statsDate, getToken }
}

function App() {
  const user = useUser();
  const { getToken } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      loader: () => homeLoader(user, getToken),
      children: [
        {
          index: true, element: <About/>
        },
        {
          path:'about', element: <About/>
        },
        {path: 'routes', element: <ClimbingRoutes/>},
        { path: "add-routes", element: <RoutesForm /> },
        { path: "statistics", element: <Statistics /> },
      ]
    }
  ])
  return (
    <>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router}/>
      </SignedIn>
    </>
    
    
  )
}

export default App