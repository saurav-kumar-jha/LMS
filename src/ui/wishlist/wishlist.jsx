import React, { useState, useEffect } from 'react';
import { Heart, Star, Users, Clock, Book, Trash2, ShoppingCart, ArrowLeft, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../components/data/course';

const WishlistPage = () => {
  const [wishlistCourses, setWishlistCourses] = useState([]);
  const navigate = useNavigate()

  const handleExploreCourse = ()=>{
    navigate("/course")
  }


  // Update wishlist courses when wishlist changes
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("WishList")) || []
    const wishlistcourses = Object.values(courses).filter((c)=> savedWishlist.includes(c.id));
    setWishlistCourses(wishlistcourses);
  }, []);
  

  const removeFromWishlist = (courseId) => {
    setWishlistCourses(prev => prev.filter(id => id !== courseId));
  };

  const clearWishlist = () => {
    setWishlistCourses([]);
  };  


  const calculateTotalPrice = () => {
    return wishlistCourses.reduce((total, course) => {
      return total + parseFloat(course.price);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Courses</span>
            </button>
          </div>

          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                <Heart className="text-red-500" size={48} />
                My Wishlist
              </h1>
              <p className="text-xl text-gray-300">
                {wishlistCourses.length > 0 
                  ? `${wishlistCourses.length} course${wishlistCourses.length !== 1 ? 's' : ''} saved for later`
                  : 'Save courses you\'re interested in to access them later'
                }
              </p>
            </div>
            
            {wishlistCourses.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Wishlist Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Price:</span>
                    <span className="font-semibold">${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-400">You Save:</span>
                    <span className="font-semibold text-green-400">${calculateTotalSavings().toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-600">
                    <span>Original Price:</span>
                    <span className="text-gray-500 line-through">${(calculateTotalPrice() 
                    // + calculateTotalSavings()).toFixed(2)
                    )}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        

        {/* Wishlist Content */}
        {wishlistCourses.length > 0 ? (
          <>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex gap-3 ">
                <button className="bg-green-600  cursor-pointer hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Enroll in All ({wishlistCourses.length})
                </button>
                <button 
                  onClick={clearWishlist}
                  className="bg-red-600 cursor-pointer  hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Clear Wishlist
                </button>
              </div>
              
              <div className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlistCourses.map(course => (
                <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-xl">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(course.id)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors shadow-lg"
                      title="Remove from wishlist"
                    >
                      <Heart size={18} className="fill-current" />
                    </button>

                    {/* Added Date */}
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      Added {new Date(course.dateAdded).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category and Level */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-400 text-xs font-medium uppercase tracking-wide">
                        {course.category}
                      </span>
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {course.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 hover:text-green-400 transition-colors cursor-pointer" onClick={()=> navigate(`/course/${course.id}`)}>
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <p className="text-gray-300 text-sm mb-3">by {course.instructor}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users size={14} />
                          <span>{(course.students / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Book size={14} />
                          <span>{course.lessons}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-400">${course.price}</span>
                        <span className="text-gray-500 line-through text-sm">${course.originalPrice}</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {/* Save ${(parseFloat(course.originalPrice.slice(1)) - parseFloat(course.price.slice(1))).toFixed(2)} */}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 cursor-pointer  bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart size={16} />
                        Enroll Now
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(course.id)}
                        className="bg-gray-700  cursor-pointer hover:bg-red-600 text-gray-300 hover:text-white px-4 py-3 rounded-lg transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
              <p className="text-gray-300 mb-6">
                Enroll in all your saved courses and save even more with our bundle discount!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">${calculateTotalPrice().toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Total Bundle Price</p>
                </div>
                <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Enroll in All Courses
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              {/* Empty Wishlist Icon */}
              <div className="mb-8">
                <div className="relative">
                  <Heart size={120} className="mx-auto text-gray-700 mb-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-full p-3">
                      <Search size={32} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty State Content */}
              <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Start exploring our courses and save the ones you're interested in. 
                Click the heart icon on any course to add it to your wishlist.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600  cursor-pointer hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2" onClick={handleExploreCourse}>
                  <BookOpen size={18} />
                  Explore All Courses
                </button>
                <button className="border cursor-pointer  border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors" onClick={handleExploreCourse}>
                  Browse Categories
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;