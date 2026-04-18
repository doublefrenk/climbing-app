import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "@clerk/clerk-react"
import { deleteRoute, editRoute, selectAllRoutes } from "../store/routesSlice.js"
import { selectUserData } from "../store/sessionSlice.js"
import MyClimbingRoutesList from "./MyClimbingRoutesList"

export default function ClimbingRoutes() {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const routes = useSelector(selectAllRoutes)
  const userData = useSelector(selectUserData)

  const [category] = useState(["sport", "boulder", "gymRoutes"])
  const [selectedCategory, setSelectedCategory] = useState("sport")
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef(null)

  function focusInputRef() {
    if (inputRef.current) inputRef.current.focus()
  }

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const handleDeleteRoute = (routeId) => {
    dispatch(deleteRoute({ routeId, userId: userData._id, getToken }))
  }

  const handleEditRoute = (routeId, updatedRoute) => {
    dispatch(editRoute({ routeId, updatedRoute, userId: userData._id, getToken }))
  }

  const filteredRoutes = (routes[selectedCategory] || []).filter(
    (route) =>
      !searchTerm.trim() ||
      (route.title || '').toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  return (
    <>
      <div className="text-center text-2xl ml-70 pl-8 mt-10">
        {category.map((cat) => (
          <button
            key={cat}
            className={`mr-40 p-2 transition ${selectedCategory === cat ? 'text-emerald-500' : 'text-gray-200 hover:text-emerald-500'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="ml-52 mr-5">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search route..."
            value={searchTerm}
            onChange={handleSearch}
            onClick={focusInputRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <MyClimbingRoutesList
          handleDeleteRoute={handleDeleteRoute}
          handleEditRoute={handleEditRoute}
          routes={filteredRoutes}
        />
      </div>
    </>
  )
}
