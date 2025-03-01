import React from 'react';
import logo from '../assets/Hama_Bwana-1.png';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-1 py-1">
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-x-1 flex-shrink-0">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform hover:scale-105" 
          />
          <Link to='/' className="flex sm:flex-row sm:items-baseline p-0.0001 ml-[-14px]">
            <span className="text-slate-700 font-extrabold text-l sm:text-2xl">pandora_Gardens</span>
            
          </Link>
        </div>

        {/* SEARCH FORM */}
        <div className="flex-1 max-w-[500px] mx-4">
          <form className="flex bg-slate-100 p-2 rounded-lg items-center w-full">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none text-sm sm:text-base w-full" 
            />
            <FaSearch className="text-slate-600 ml-2 flex-shrink-0" />
          </form>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden sm:flex items-center gap-x-6 flex-shrink-0">
          <Link to='./about' className="text-slate-700 hover:text-blue-600 hover:scale-105 transition">About</Link>
          <Link to='./signin' className="text-slate-700 hover:text-blue-600 hover:scale-105 transition">Sign In</Link>
          <Link to='./signup' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition">
            Sign Up
          </Link>
        </nav>

        {/* MOBILE SIGN UP BUTTON */}
        <Link to='./signup' className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition sm:hidden flex-shrink-0">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
