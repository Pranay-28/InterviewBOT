'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function Home() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
   <div className="min-h-screen bg-grid-pattern bg-gray-50"
   style={{
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px', // Bigger squares
    minHeight: '100vh',
    backgroundColor: '#f9fafb', // Optional to mimic gray-50
  }}
   >
      <header className="py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Image src={'/logo.svg'} width={60} height={80} alt='logo' />

          {/* Three dots menu for small screens */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <i className="fas fa-ellipsis-v text-2xl"></i>
            </button>
          </div>

          {/* Main navigation hidden on small screens */}
          <nav className={`hidden md:flex flex-grow justify-center`}>
            <ul className="flex space-x-4">
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>
                <Link href="/question">Questions</Link>
              </li>
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>
                <Link href="/upgrade">Upgrade</Link>
              </li>
              <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>
                <Link href="/how">How it works?</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 md:hidden z-10">
              <ul className="space-y-4">
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>
                  <Link href="/question">Questions</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/upgrade' && 'text-primary font-bold'}`}>
                  <Link href="/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>
                  <Link href="/how">How it works?</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto mt-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Your Personal AI Interview Coach</h1>
        <p className="mt-4 text-lg text-gray-600">Double your chances of landing that job offer with our AI-powered interview prep</p>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-primary text-white rounded-md">Get Started</button>
          </Link>
          <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
            <button className="px-6 py-3 bg-white text-primary border border-primary rounded-md">Watch video</button>
          </Link>
        </div>

        <div className="mt-12 flex justify-center space-x-8">
          <a href="#youtube" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-youtube"></i> YouTube
          </a>
          <a href="#product-hunt" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-product-hunt"></i> Product Hunt
          </a>
          <a href="#reddit" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-reddit"></i> reddit
          </a>
        </div>

        {/* New Section */}
        <section className="mt-24 mb-20">
          <h2 className="text-4xl font-bold text-gray-900">How it Works?</h2>
          <p className="mt-4 text-lg text-gray-600">Give mock interview in just 3 simple steps</p>

          <div className="mt-12 flex flex-wrap justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900">Write prompt for your form</h3>
              <p className="mt-2 text-gray-600">Click on GetStarted and fill in your jobposition and other details</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
              <div className="text-3xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-gray-900">Edit Your form</h3>
              <p className="mt-2 text-gray-600">Once you are ready questions will be displayed, enable your microphone and camera to start your AI-Interview</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900">Share & Start Accepting Responses</h3>
              <p className="mt-2 text-gray-600">After successfully completing your interview you can get feedback and rating.</p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-pink-500 text-white rounded-md">Get Started Today</button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="mb-6 md:mb-0">
      <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
      <p className="text-gray-400 mt-2">© 2024 Pranay. All rights reserved.</p>
    </div>
    <nav className="mb-6 md:mb-0">
      <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <li>
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-gray-400 hover:text-white">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
    <div className="flex space-x-4">
      <a href="#facebook" className="text-gray-400 hover:text-white">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#twitter" className="text-gray-400 hover:text-white">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#linkedin" className="text-gray-400 hover:text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}
