'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50"
    style={{
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px', // Bigger squares
    minHeight: '100vh',
    backgroundColor: '#f9fafb', // Optional to mimic gray-50
  }}
    >
      <header className="py-6">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div>
            <img src='/logo.svg' width={60} height={80} alt='logo' />
          </div>
          <nav className="flex-grow hidden sm:flex justify-center">
            <ul className="flex space-x-4">
              <li className="hover:text-primary hover:font-bold transition-all cursor-pointer">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-primary hover:font-bold transition-all cursor-pointer">
                <Link href="/questions">Questions</Link>
              </li>
              <li className="hover:text-primary hover:font-bold transition-all cursor-pointer">
                <Link href="/upgrade">Upgrade</Link>
              </li>
              <li className="text-primary font-bold transition-all cursor-pointer">
                How it Works?
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">How It Works</h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">Learn how to get the most out of our AI-powered interview preparation tool.</p>

        <section className="mt-12 mb-20">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-xs w-full">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900">Step 1: Fill out job position</h3>
              <p className="mt-2 text-gray-600">Create a job position that best matches the job interview questions you want to practice.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-xs w-full">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-gray-900">Step 2: Fill out requirements for the job</h3>
              <p className="mt-2 text-gray-600">Tailor the form to include specific questions and scenarios you want to cover.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-xs w-full">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900">Step 3: Share & Accept Responses</h3>
              <p className="mt-2 text-gray-600">Start accepting responses from the mock interview tool and get ready for success.</p>
            </div>
          </div>

          <div className="mt-12">
            <Button asChild>
              <Link href="/">Go Back to Home</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HowItWorks;
