import React from 'react'

export default function Footer() {
    return (
        <div>
            {/* Why Choose Us */}
            <section className="text-white py-16 bg-black/40 backdrop-blur-sm text-center">
                <h3 className="text-3xl font-bold mb-10">Why Choose Talent Bridge?</h3>
                <div className="grid md:grid-cols-4 gap-6 px-6 md:px-20">
                    {[
                        { title: "Easy Job Search", desc: "Find your dream job quickly with smart filtering." },
                        { title: "Direct Employers", desc: "Connect directly with hiring managers." },
                        { title: "Verified Listings", desc: "All jobs and companies are verified." },
                        { title: "Fast Applications", desc: "Apply within seconds with one profile." },
                    ].map((item, i) => (
                        <div key={i} className="glass p-6 rounded-xl">
                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                            <p className="text-gray-200">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/60 text-gray-300 py-6 text-center">
                <p>© 2025 Talent Bridge | All rights reserved.</p>
            </footer>
        </div>
    )
}
