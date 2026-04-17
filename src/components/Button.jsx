export default function Button({onClick, text}) {
  return(
    <button 
      className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition hover:cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  )
}