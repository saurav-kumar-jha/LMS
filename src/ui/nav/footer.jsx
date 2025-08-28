import { BookOpen } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="border-t" style={{ backgroundColor: '#1a1f1a', borderColor: '#2a3328' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div className="md:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center mr-3">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">EduHub</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Empowering learners worldwide with high-quality education and practical skills for the digital age.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">f</div>
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">t</div>
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">in</div>
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">yt</div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help and Support</a></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Popular Categories</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Data Science</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Web Development</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Machine Learning</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Digital Marketing</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Business</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Affiliate</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Investors</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Accessibility</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t pt-8" style={{ borderColor: '#2a3328' }}>
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">© 2024 EduHub. All rights reserved.</p>
                            <div className="flex items-center space-x-6 mt-4 md:mt-0">
                                <select className="bg-transparent text-gray-400 text-sm border-0 focus:outline-none">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                                    🌍 Global
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer