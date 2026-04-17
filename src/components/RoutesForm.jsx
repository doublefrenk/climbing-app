/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddRouteModal from "./AddRouteModal";
import Button from "./Button";


export default function RoutesForm() {
    const { handleAddRoute } = useOutletContext(); // Prendi handleAddRoute dal context

  const [category, setCategory] = useState(["sport", "boulder", "gymRoutes"])
  const [selectedCategory, setSelectedCategory] = useState("sport")
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);

  return(
    <>
     <div className="text-center text-2xl ml-70 pl-8 mt-10">
      {category.map((cat) => (
        <button
         key={cat} 
         className={`mr-40 p-2 transition ${selectedCategory === cat ? 'text-emerald-500' : 'text-gray-200 hover:text-emerald-500'}`} 
         onClick ={()=> {setSelectedCategory(cat)} }
        >
          {cat}
        </button>
        
      ))}
    </div>
    <div className="text-center text-2xl ml-15 pl-8 mt-10">
      {<Button onClick={() => setAddIsModalOpen(true)} text="Add your route"/>}
      {<AddRouteModal  selectedCategory={selectedCategory} onSave={handleAddRoute} isOpen={isAddModalOpen} route={null} onClose={() => setAddIsModalOpen(false)}/>}
    </div>
    </>
    
  )
}