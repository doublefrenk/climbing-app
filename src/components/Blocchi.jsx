export default function Blocchi({route}){
  return(
    <div className="text-center text-2xl">
      <h2>Name: {route.title}</h2>
      <p>Grado: {route.grade}</p>
    </div>
  )
}