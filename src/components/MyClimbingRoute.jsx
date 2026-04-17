import { useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import EditRouteModal from "./EditRouteModal.jsx";
import RouteModal from './RouteModal';
export default function MyClimbingRoute({route, handleEditRoute, handleDeleteRoute}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);


  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteRoute(route.id);
  }

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditIsModalOpen(true);
  }
  return(
    <>
      <tr className="hover:bg-gray-50" onClick={() => setIsModalOpen(true)}>
      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
        <span className="text-sm font-medium text-gray-900">
          {route.title || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">
          {route.sector || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-700">
          {route.grade || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {route.rating   || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-700">
          {route.genre || 'N/A'}
        </span>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-700">
          {route.sendDate || 'N/A'}
        </span>
      </td>
      {handleEditRoute && handleDeleteRoute && <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center space-x-3">
          <button
            className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded hover:bg-blue-50"
            title="Edit film"
            onClick={handleEdit}
          >
            <FiEdit size={16} />
          </button>

          <button
            className="text-red-600 hover:text-red-900 transition-colors p-2 rounded hover:bg-red-50"
            title="Delete film"
            onClick={handleDelete}
          >
            <FiTrash2 size={16}/>
          </button>
        </span>
      </td>}
      
   </tr>
   
      {<RouteModal isOpen={isModalOpen} route={route} onClose={() => setIsModalOpen(false)}/>}
      {<EditRouteModal onSave={handleEditRoute} isOpen={isEditModalOpen} route={route} onClose={() => setEditIsModalOpen(false)}/>}
  </>
    
  )
}