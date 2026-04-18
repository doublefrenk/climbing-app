import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "@clerk/clerk-react"
import { addRoute } from "../store/routesSlice.js"
import { selectUserData } from "../store/sessionSlice.js"
import AddRouteModal from "./AddRouteModal"
import Button from "./Button"

export default function RoutesForm() {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const userData = useSelector(selectUserData)

  const [category] = useState(["sport", "boulder", "gymRoutes"])
  const [selectedCategory, setSelectedCategory] = useState("sport")
  const [isAddModalOpen, setAddIsModalOpen] = useState(false)

  const handleAddRoute = (newRoute, cat) => {
    dispatch(addRoute({ newRoute, selectedCategory: cat || selectedCategory, userId: userData._id, getToken }))
  }

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
      <div className="text-center text-2xl ml-15 pl-8 mt-10">
        {<Button onClick={() => setAddIsModalOpen(true)} text="Add your route" />}
        {<AddRouteModal
          selectedCategory={selectedCategory}
          onSave={handleAddRoute}
          isOpen={isAddModalOpen}
          route={null}
          onClose={() => setAddIsModalOpen(false)}
        />}
      </div>
    </>
  )
}
