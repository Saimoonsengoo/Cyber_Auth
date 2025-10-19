import React from 'react'
import { Link } from 'react-router-dom'
export default function Feature() {
    return (
        <div>
            {/* Featured Jobs */}
            <section className="px-8 py-16 bg-white/10 backdrop-blur-lg text-white">
                <h3 className="text-3xl font-bold text-center mb-10">Featured Jobs</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((job) => (
                        <div key={job} className="glass p-6 rounded-xl text-left">
                            <h4 className="text-xl font-semibold mb-2">Frontend Developer</h4>
                            <p className="text-gray-200 mb-1">TechCorp Ltd.</p>
                            <p className="text-sm text-gray-300 mb-4">Yangon, Myanmar</p>
                            <Link to="/jobs" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-block transition">
                                Apply Now
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
