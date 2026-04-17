/* eslint-disable no-unused-vars */
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed top-0 left-0 h-full transition-all duration-300 ${isOpen ? 'w-48' : 'w-12'} bg-gray-100 shadow-lg flex flex-col items-start`}>
      <button         
        className="mt-4 mb-6 ml-2 hover:text-emerald-500 text-gray-300 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ArrowLeftCircle size={40} />
        ) : (
          <ArrowRightCircle size={40} />
        )}
      </button>

      <nav>
        <ul className={`flex-1 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
          <li > <Link className="block px-4 py-2 rounded  hover:text-emerald-500 text-gray-300 transition cursor-pointer" to="routes">Routes</Link></li>
          <li > <Link className="block px-4 py-2 rounded hover:text-emerald-500 text-gray-300 transition cursor-pointer" to="add-routes">Add Routes</Link></li>
          <li > <Link className="block px-4 py-2 rounded hover:text-emerald-500 text-gray-300 transition cursor-pointer" to="statistics">Statistics</Link></li>
          <li > <Link className="block px-4 py-2 rounded hover:text-emerald-500 text-gray-300 transition cursor-pointer" to="about">About me</Link></li>
        </ul>
      </nav>
    </div>
  )
}