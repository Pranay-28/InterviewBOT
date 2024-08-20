'use client'
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Upgrade() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50"
    style={{
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px', // Bigger squares
    minHeight: '100vh',
    backgroundColor: '#f9fafb', // Optional to mimic gray-50
  }}
    >
      {/* Header Section */}
      <header className="py-6">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div>
            <Image src={'/logo.svg'} width={60} height={80} alt='logo' />
          </div>

          {/* Three dots menu for small screens */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <i className="fas fa-ellipsis-v text-2xl"></i>
            </button>
          </div>

          {/* Main navigation for medium and large screens */}
          <nav className={`hidden md:flex flex-grow justify-center`}>
            <ul className="flex space-x-4">
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/question' && 'text-primary font-bold'}`}>
                <Link href="/question">Questions</Link>
              </li>
              <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path === '/upgrade' && 'text-primary font-bold'}`}>
                <Link href="/upgrade">Upgrade</Link>
              </li>
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/how' && 'text-primary font-bold'}`}>
                <Link href="/how">How it works?</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 md:hidden z-10">
              <ul className="space-y-4">
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/question' && 'text-primary font-bold'}`}>
                  <Link href="/question">Questions</Link>
                </li>
                <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path === '/upgrade' && 'text-primary font-bold'}`}>
                  <Link href="/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/how' && 'text-primary font-bold'}`}>
                  <Link href="/how">How it works?</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Upgrade Page</h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">This page is currently under development.</p>
        
        {/* Go back to Home button */}
        <div className="mt-8">
          <Link href="/">
            <button className="px-6 py-3 bg-primary text-white rounded-md">Go back to Home</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
