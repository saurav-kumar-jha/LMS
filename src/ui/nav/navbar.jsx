import { BookOpen, Search, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { courses } from '../../components/data/course';

function Navbar() {
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serachParams, setSearchparama] = useSearchParams()
  const [search, setSearch] = useState(serachParams.get("s") || "")
  const router = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchparama({ s: value })
  };

  const filteredCours = serachParams ? Object.values(courses).filter((c) => c.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : []



  return (
    <nav
      className="border-b relative"
      style={{ backgroundColor: '#1a1f1a', borderColor: '#2a3328' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EduHub</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/course" className="text-gray-300 hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              Instructors
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              My Learning
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              Wishlist
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 rounded-lg border-0 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                style={{ backgroundColor: '#2a3328' }}
              />
              {search && (
                <ul className="absolute top-full mt-2 w-full bg-[#2a2c2a] text-white border rounded-md shadow-md z-10">
                  {filteredCours.length > 0 ? (
                    filteredCours.map((course) => (
                      <li
                        key={course.id}
                        className="px-3 py-2 cursor-pointer flex justify-evenly items-center gap-2 hover:bg-[#222422]"
                        onClick={() =>{ 
                          router(`/course/${course.id}`)
                          setSearch("")
                          setSearchparama({})
                        }}
                      >
                        <img src={course.image} className='h-[90%] w-[20%] object-fill rounded scale-110 ' alt="" />
                        {course.title}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500">No courses found</li>
                  )}
                </ul>
              )}
            </div>

            {!isLogin && (
              <button
                onClick={() => router('/auth')}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Log in
              </button>
            )}

            {isLogin && (
              <button
                onClick={() => router('/auth')}
                className="bg-green-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition-colors font-medium"
              >
                Sign up
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1a1f1a] border-l border-[#2a3328] transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-[#2a3328]">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/course"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Courses
          </Link>
          <Link
            to="#"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Instructors
          </Link>
          <Link
            to="#"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            My Learning
          </Link>
          <Link
            to="#"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Wishlist
          </Link>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-lg border-0 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-green-400 outline-none w-full"
              style={{ backgroundColor: '#2a3328' }}
            />
          </div>

          {/* Auth buttons */}
          {!isLogin && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                router('/auth');
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Log in
            </button>
          )}
          {isLogin && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                router('/auth');
              }}
              className="bg-green-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition-colors font-medium"
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
