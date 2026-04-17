import { useState } from "react";
import ReactPaginate from "react-paginate";
import MyClimbingRoute from "./MyClimbingRoute.jsx";

export default function MyClimbingRoutesList({handleEditRoute,handleDeleteRoute,routes}) {

  const [currentPage, setCurrentPage] = useState(0);
  const routesPerPage = 10;

  const offset = currentPage * routesPerPage;
  const currentRoutes = routes.slice(offset, offset + routesPerPage);
  const totalPages = Math.ceil(routes.length / routesPerPage);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected);
  }
  return(
    
    <div className="ml-48 p-4">
      <div className="relative">
        
        <table className="w-full bg-white shadow-sm border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                Send Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {currentRoutes.map(route =>
          <MyClimbingRoute key={route.id}
                route={route} handleEditRoute={handleEditRoute} handleDeleteRoute={handleDeleteRoute}/>
           )}
        </tbody>
        </table>
        
        <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName="flex items-center gap-2"
          pageClassName="px-1 py-1"
          pageLinkClassName="text-gray-300 hover:text-emerald-500"
          previousClassName="px-1 py-1"
          nextClassName="px-1 py-1"
          previousLinkClassName="text-emerald-500 hover:text-emerald-500"
          nextLinkClassName="text-emerald-500 hover:text-emerald-500"
          activeClassName="text-emerald-500 border-emerald-500"
          activeLinkClassName="!text-emerald-500 border-emerald-500"
          disabledClassName="opacity-30 cursor-not-allowed"
          breakLabel="..."
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
        />
      </div>
      </div>
      
    </div>
  )
}