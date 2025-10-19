import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Feature from '../components/Feature'

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg-jobportal.jpg')" }}>
      {/* Overlay */}
      <div className="bg-black/40 min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center text-white px-6 py-20">
          <div className="glass p-10 rounded-2xl max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Bridge Your Talent with Opportunities</h2>
            <p className="text-lg mb-6">
              Connecting passionate job seekers and employers in one seamless platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">Find Jobs</Link>
              <Link to="/" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition">Post a Job</Link>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex justify-center py-10">
          <div className="bg-gray-50 backdrop-blur-md p-6 rounded-2xl flex flex-col md:flex-row gap-4 w-11/12 md:w-3/4">
            <input type="text" placeholder="Job Title or Keyword" className="flex-1 px-4 py-3 rounded-lg outline-none" />
            <input type="text" placeholder="Location" className="flex-1 px-4 py-3 rounded-lg outline-none" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">Search</button>
          </div>
        </section>

        <Feature />

        <Footer />
      </div>
    </div>
  )
}
