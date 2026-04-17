/* eslint-disable no-unused-vars */
import { UserButton } from "@clerk/clerk-react";
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { authFetch } from '../utils/authFetch.js';
import ErrorPage from './ErrorPage';
import Loading from './Loading';
import NavBar from './NavBar';

export default function Home() {
  const loaderData = useLoaderData();
  const { getToken } = loaderData;
  const [routes, setRoutes] = useState(loaderData.routes);
  const [statsGrades, setStatsGrades] = useState(loaderData.statsGrades)
  const [statsDates, setStatsDates] = useState(loaderData.statsDate)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshStats = async () => {
    setIsLoading(true);
    try {
      const responseGrade = await authFetch(`/api/routes/stats/grades/${loaderData.userData._id}`, {}, getToken);
      const responseDate = await authFetch(`/api/routes/stats/date/${loaderData.userData._id}`, {}, getToken);

      if(!responseGrade.ok || !responseDate.ok) {
        const errorData = await (responseGrade.ok ? responseDate : responseGrade).json().catch(() => ({ message: 'Unknown error occurred' }));
        setError(errorData);
        return;
      }

      const updatedStatsGrades = await responseGrade.json();
      const updatedDateGrades = await responseDate.json();
      setStatsGrades(updatedStatsGrades);
      setStatsDates(updatedDateGrades);
    } catch (err) {
      console.error('Error refreshing stats:', err);
      setError(err);
    }finally {
      setIsLoading(false);
    }
  }

  const handleDeleteRoute = async (routeId) => {
    setIsLoading(true);
    try{
      await authFetch(`/api/routes/${routeId}`, { method: 'DELETE' }, getToken);
    }catch(err){
      setError(err);
    }finally{
      setIsLoading(false);
    }
    
    setRoutes(prevRoutes => ({
      ...prevRoutes,
      sport: prevRoutes.sport?.filter(route => route.id !== routeId) || [],
      boulder: prevRoutes.boulder?.filter(route => route.id !== routeId) || [],
      gymRoutes: prevRoutes.gymRoutes?.filter(route => route.id !== routeId) || []
    }));

    await refreshStats();
  };

  const handleEditRoute = async (routeId,updatedRoute) => {
    setIsLoading(true);
    try{
        const response = await authFetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRoute),
      }, getToken);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        setError(errorData);
        return;
      }

      setRoutes(prevRoutes => ({
        ...prevRoutes,
        sport: prevRoutes.sport?.map(route => route.id === updatedRoute.id ? updatedRoute : route) || [],
        boulder: prevRoutes.boulder?.map(route => route.id === updatedRoute.id ? updatedRoute : route) || [],
        gymRoutes: prevRoutes.gymRoutes?.map(route => route.id === updatedRoute.id ? updatedRoute : route) || []
      }));
      await refreshStats();

    }catch(err){
      console.error('Error updating route:', err);
      setError(err);
    }finally{
      setIsLoading(false);
    }
  }

  const handleAddRoute = async (newRoute, selectedCategory) => {
    setIsLoading(true);
    try{
      const response = await authFetch('/api/routes', {}, getToken);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        setError(errorData);
        return;
      }
      const data = await response.json();
      const allRoutes = data.routes;
      const filteredRoutes = allRoutes[selectedCategory].filter(r => (r.title === newRoute.title ) && r.sector === newRoute.sector && r.grade === newRoute.grade);

      if (filteredRoutes.length > 0) {
        filteredRoutes[0].users.push(loaderData.userData._id);
        await authFetch(`/api/routes/${filteredRoutes[0].id}`, {
          method: 'PUT',
          body: JSON.stringify(filteredRoutes[0]),
        }, getToken);
        setIsLoading(false);
        return;
      }

    }catch(err){
      console.error('Error Retriving route:', err);
      setError(err);
    }

    try{
        const response = await authFetch('/api/routes', {
        method: 'POST',
        body: JSON.stringify({...newRoute, type: selectedCategory, users: [loaderData.userData._id]}),
      }, getToken);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        setError(errorData);
        return;
      }
    const newId = routes[selectedCategory].length > 0 ? Math.max(...routes[selectedCategory].map(r => r.id)) + 1 : 1;
    const routeWihId = {id: newId, ...newRoute, comments: [newRoute.comments]};
    setRoutes(prevRoutes => ({
      ...prevRoutes,
      [selectedCategory]: [...(prevRoutes[selectedCategory] || []), routeWihId]
    }));
    await refreshStats();

    }catch(err){
      console.error('Error updating route:', err);
      setError(err);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <ErrorPage message={error.message} statusCode={error.error.statusCode}/>}
      {!error && isLoading ? <Loading/> : 
        <>
          <div className="absolute top-4 right-4 z-50">
            <UserButton afterSignOutUrl="/" />
          </div>          
          <NavBar/>
          <Outlet context={{user: loaderData.userData, routes, statsGrades, statsDates, handleDeleteRoute,handleEditRoute, handleAddRoute, getToken}}/>
        </>
      }
    </div>
  )
}