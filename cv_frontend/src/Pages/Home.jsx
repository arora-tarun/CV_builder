import React from "react";
import { Link } from "react-router-dom";
import CV from "../assets/CV.png"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-700 flex mt-2" >
          <img src={CV} alt="" className="h-10 w-10 mr-2"/>
          Career<span className="text-blue-500">Maker</span>
        </h1>
        
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">

            <button  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* -------- Hero Section -------- */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Build Your Perfect Resume
          <br />
          <span className="text-blue-600">with CareerMaker</span>
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Create stunning resumes in minutes with our simple and professional templates.
        </p>

        <Link
          to="/signup"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
        >
          Start Now
        </Link>
      </main>

      {/* -------- Footer -------- */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} CareerMaker — All rights reserved.
      </footer>
    </div>
  );
}