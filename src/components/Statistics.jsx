/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import MyClimbingRoute from "./MyClimbingRoute.jsx"
import MyClimbingStats from "./MyClimbingStats.jsx"


export default function Statistics() {

  const {routes, statsGrades, statsDates} =useOutletContext()
  const [category, setCategory] = useState(["sport", "boulder", "gymRoutes"])
  const [selectedCategory, setSelectedCategory] = useState("sport")

  console.log("statsGrades:", statsGrades);
  console.log("statsDate:", statsDates);

  const gradesData = statsGrades?.gradeStats.map(stat => ({
    grade: stat.grade,
    type: stat.type,
    totalRoutes: stat?.statistics.totalRoutes,
    routes: stat?.routes,
    stats: stat?.statistics
  })).filter(stat => stat.type === selectedCategory)

  const monthData = statsDates?.dateStats?.[selectedCategory]
  console.log("DateDate:", monthData);


  console.log("gradesData:", gradesData);

  const getLatestRoutes = (routeArray, numberOfRoutes) => {
    if(!routeArray || routeArray.length === 0) return [];

    const dates = routeArray.map(route => route.sendDate)
    const latestDates = [];
    if(dates.length <= numberOfRoutes) return routeArray;
    else{
      while(dates.length >= numberOfRoutes){
      const latestDate = dates.reduce((latest, current) => new Date(current) > new Date(latest) ? current : latest);
      latestDates.push(latestDate);
      dates.splice(dates.indexOf(latestDate), 1);
    }
    }
    
    return routeArray.filter(route => latestDates.includes(route.sendDate));
  }

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
      <div className="max-w-4xl mx-auto text-center">
        {/* Grades Chart */}
        <div className=" p-6 rounded-lg">
          <h3 className="text-xl text-emerald-500 mb-4 text-center">Routes by Grade</h3>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={gradesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="grade" 
              />
              <YAxis 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }}
              />
              <Bar dataKey="totalRoutes" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Months Chart */}
        <div className="p-6 rounded-lg">
          <h3 className="text-xl text-emerald-500 mb-4 text-center">Routes by Month</h3>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthName" 
              />
              <YAxis 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }}
              />
              <Bar dataKey="routes" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6">
          {gradesData.map((stat, index) => (
            <div key={index} className="mb-8">
              <h2 key={index} className="text-emerald-500 text-xl font-bold p-4 mb-2">
                {stat.grade}
              </h2>
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
                    {getLatestRoutes(stat.routes, 5).map((route, index) => (
                    <MyClimbingRoute
                        key={index}
                        handleEditRoute={null} 
                        handleDeleteRoute={null} 
                        route={route}
                    />
                    ))}
                   </tbody>
                </table>
                <table className="w-full bg-white shadow-sm border border-gray-200 rounded-lg ml-10 mt-4">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Averange Attempts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Minimum Attempts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Maximum Attempts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Averange Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Minimum Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Maximum Rating
                      </th>
                    </tr>
                  </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                    {
                    <MyClimbingStats
                        key={index}
                        stats={stat.stats}
                    />
                    }
                   </tbody>
                </table>
              
            </div>
          ))}
        </div>
      </div>
    </>
  )
}