import { useAuth, UserButton, useUser } from "@clerk/clerk-react"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectSessionStatus, setGetToken, syncSession } from '../store/sessionSlice.js'
import { fetchRoutes } from '../store/routesSlice.js'
import { refreshStats } from '../store/statsSlice.js'
import { selectIsLoading, selectUiError } from '../store/uiSlice.js'
import { selectUserData } from '../store/sessionSlice.js'
import ErrorPage from './ErrorPage'
import Loading from './Loading'
import NavBar from './NavBar'

export default function Home() {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const { user } = useUser()

  const sessionStatus = useSelector(selectSessionStatus)
  const userData = useSelector(selectUserData)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectUiError)

  useEffect(() => {
    if (!user || !getToken) return
    dispatch(setGetToken(getToken))
    dispatch(syncSession({ user, getToken }))
  }, [user, getToken, dispatch])

  useEffect(() => {
    if (!userData?._id || !getToken) return
    dispatch(fetchRoutes({ userId: userData._id, getToken }))
    dispatch(refreshStats({ userId: userData._id, getToken }))
  }, [userData?._id, getToken, dispatch])

  if (error) {
    return <ErrorPage message={error.message} statusCode={error.statusCode} />
  }

  if (isLoading && sessionStatus !== 'succeeded') {
    return <Loading />
  }

  return (
    <div>
      <div className="absolute top-4 right-4 z-50">
        <UserButton afterSignOutUrl="/" />
      </div>
      <NavBar />
      <Outlet />
    </div>
  )
}
