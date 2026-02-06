import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 border-b border-white/10">
      <Link to="/" className="text-2xl font-black tracking-tighter">
        CARDIOVASCULAR <span className="text-cyan-400">RISK PREDICTION</span>
      </Link>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-500 uppercase">Medical Personnel</p>
          <p className="text-sm font-bold">Dr. Arjun Sai</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
          AS
        </div>
      </div>
    </nav>
  );
};

export default Navbar;