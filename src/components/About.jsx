/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { FiTrash2 } from 'react-icons/fi';
import { useOutletContext } from "react-router-dom";
import { authFetch } from "../utils/authFetch.js";
import { getMaxGrade } from "../utils/compareFrenchGrades.js";

import ErrorPage from "./ErrorPage.jsx";
import Loading from "./Loading.jsx";
import MyClimbingRoute from "./MyClimbingRoute.jsx";

export default function About() {
  const { user, routes, handleDeleteRoute, handleEditRoute, getToken} = useOutletContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState(["sport", "boulder", "gymRoutes"])
  const [selectedCategory, setSelectedCategory] = useState("sport")
  const [gallery, setGallery] = useState(user?.gallery || [])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fileInputRef = useRef(null);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleDeleteImage = async (id) => {
    setIsLoading(true);

    try {
      const imageToDelete = gallery.find(img => img.id === id);

      const response = await authFetch('/api/users/delete/image', {
        method: "POST",
        body: JSON.stringify({ userId: user.clerkId, imageUrl: imageToDelete.image , imageId: imageToDelete.id}),
      }, getToken);
      const data = await response.json();

      if(response.ok) {
        setGallery(prevGallery => prevGallery.filter(img => img.id !== id));
        setSelectedImage(null);
      } else {
        console.error("Failed to delete image:", data.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleFileChange = async (e) => {
    setIsLoading(true);

    const files = Array.from(e.target.files || [])
    for( const file of files) {
      const formData = new FormData();
      formData.append("title", file.name);
      formData.append("userId", user.clerkId);
      formData.append("image", file);

      console.log("Uploading file:", file);
      
      try {
        const response = await authFetch("/api/users/upload", {
          method: "POST",
          body: formData,
        }, getToken)
        const data = await response.json();
        console.log("Upload response:", data);
        if(response.ok) {
          setGallery(prevGallery => [...prevGallery, {id: Date.now(), title: data.title, image: data.url}])
        } else {
          console.error("Failed to upload image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const getHardestRoute = (routeArray) => {
    if(!routeArray || routeArray.length === 0) return [];

    const grades = routeArray.map(route => route.grade)
    const maxGrade = getMaxGrade(grades);
    return routeArray.filter(route => route.grade === maxGrade);
  }

  const getLatestRoute = (routeArray) => {
    if(!routeArray || routeArray.length === 0) return [];

    const dates = routeArray.map(route => route.sendDate)
    const latestDate = dates.reduce((latest, current) => new Date(current) > new Date(latest) ? current : latest);
    return routeArray.filter(route => route.sendDate === latestDate);
  }
  return (
    <>
    {error && <ErrorPage message={error.message} statusCode={error.statusCode}/>}
    
    {!error && isLoading ? <Loading/> : <div className="flex flex-col items-center" >
      <div className="flex w-full max-w-3xl items-center gap-8">
        {/* Profile Image */}
        <div>
          <img src={user?.photo ? user.photo : ''} alt={user.name} className="w-56 h-56 rounded-full object-cover border-4 border-emerald-300 shadow-lg" />
        </div>
        {/* General Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-gray-600 mb-2">{user.age}, {user.location}</p>
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-emerald-700 mb-1">Climbing Info</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li><span className="font-bold">Climbing Level: </span><span>{user.climbingLevel}</span> </li> 
              <li><span className="font-bold">Favorite Climbing Area: </span><span>{user.favoriteClimbingStyle}</span></li>
              <li><span className="font-bold">Motto: </span><span>{user.motto}</span></li>
              <li><span className="font-bold">Last Route: </span><span>{getLatestRoute([...(routes["sport"] || []), ...(routes["boulder"] || []), ...(routes["gymRoutes"] || [])]).map(route => route.title).join(", ")}</span></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-emerald-700 mb-2">Gallery</h2>
        <div className="flex overflow-x-auto gap-4 py-2">
          {gallery.map((img) => (
            <div key={img.id} className="flex-shrink-0">
              <img
                src={img.image}
                alt={img.title}
                className="w-48 h-32 object-cover rounded-lg shadow"
                onClick={() => setSelectedImage(img.id)}
              />
            </div>
          ))}
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange}/>
          {/* Add-image placeholder */}
          <div key="add-new" className="flex-shrink-0">
            <button
              type="button"
              onClick={handleAddImageClick}
              className="w-48 h-32 rounded-lg shadow bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              <span className="text-4xl text-gray-500 select-none">+</span>
            </button>
            <div className="text-center text-sm mt-1 text-gray-600">Add image</div>
          </div>
        </div>
      </div>
      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-70 flex items-center justify-center z-50"
        >
          <div className="relative">
            <img
              src={gallery.find(img => img.id === selectedImage).image}
              alt={gallery.find(img => img.id === selectedImage).title}
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-black font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <button
              className="absolute top-2 left-2 bg-white rounded-full px-3 py-1 text-black font-bold"
              onClick={() => handleDeleteImage(selectedImage)}
            >
              <FiTrash2 size={16}/>  
            </button>
            <div className="text-center text-white mt-2">{gallery.find(img => img.id === selectedImage).title}</div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-center text-xl font-semibold text-emerald-700 mb-2 mt-8">My hardest routes</h2>
        <div className="text-center text-2xl ml-45 pl-8 mt-10">
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
        <table className="w-full bg-white shadow-sm border border-gray-200 rounded-lg ml-10 mt-4">
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
                    </tr>
                  </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                            {getHardestRoute(routes[selectedCategory]).map(route =>
                            <MyClimbingRoute key={route.id}
                                  route={route} handleDeleteRoute={null} handleEditRoute={null}/>
                             )}
                          </tbody>
                </table>
      </div>
    </div>}
    </>
  );
}