import React, { useState } from 'react';
import { BookOpen, Search, ChevronDown, Filter, Star, Clock, Users, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { courses } from '../../components/data/course';
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPricing, setSelectedPricing] = useState('Free/Paid');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedDuration, setSelectedDuration] = useState('All Duration');
  const navigate = useNavigate()
  const categories = ['All Categories', 'Data Science', 'Web Development', 'Design', 'Business', 'Marketing', 'AI & Machine Learning'];
  const pricingOptions = ['Free/Paid', 'Free Only', 'Paid Only'];
  const ratingOptions = ['All Ratings', '4.5 & up', '4.0 & up', '3.5 & up'];
  const durationOptions = ['All Duration', '0-2 hours', '3-6 hours', '7-17 hours', '17+ hours'];

  

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1f1a' }}>

      {/* Header Section */}
      <div className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Explore Our Courses</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Expand your skillset and knowledge with our diverse range of courses. Find the perfect fit for your learning journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-white placeholder-gray-400 text-lg focus:ring-2 focus:ring-green-400 outline-none"
                style={{ backgroundColor: '#2a3328' }}
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg border-0 text-white focus:ring-2 focus:ring-green-400 outline-none cursor-pointer"
                style={{ backgroundColor: '#2a3328' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select 
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg border-0 text-white focus:ring-2 focus:ring-green-400 outline-none cursor-pointer"
                style={{ backgroundColor: '#2a3328' }}
              >
                {pricingOptions.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <select 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg border-0 text-white focus:ring-2 focus:ring-green-400 outline-none cursor-pointer"
                style={{ backgroundColor: '#2a3328' }}
              >
                {ratingOptions.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <select 
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg border-0 text-white focus:ring-2 focus:ring-green-400 outline-none cursor-pointer"
                style={{ backgroundColor: '#2a3328' }}
              >
                {durationOptions.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            <button className="flex items-center px-4 py-2 rounded-lg border-0 text-white hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#2a3328' }}>
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(courses).map((course) => (
              <div key={course.id} onClick={()=>navigate(`/course/${course.id}`)} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" style={{ backgroundColor: '#f5f1eb' }}>
                {/* Course Image/Icon */}
                <div className="relative h-48 flex items-center justify-center text-6xl overflow-hidden" style={{ backgroundColor: "#4a7c80" }}>
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <img src={course.image} alt={course.title} />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#2a3328', color: '#ffffff' }}>
                      {course.category}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 bg-[#1a1f1af8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium px-2 py-1 rounded" style={{ backgroundColor: '#e5e7eb', color: '#374151' }}>
                      {course.level}
                    </span>
                    <span className="text-lg font-bold" style={{ color: course.price === 'Free' ? 'green' : 'blue' }}>
                      {course.price}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl mb-2  text-white ">{course.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <span>by {course.instructor}</span>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <button className="w-full bg-green-400 text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-green-500 transition-colors font-medium">
                    {course.price === 'Free' ? 'Start Learning' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center items-center mt-12 space-x-2">
            <button className="p-2 rounded-lg hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#2a3328' }}>
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            
            {[1, 2, 3, 4, 5].map((page) => (
              <button 
                key={page}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  page === 1 
                    ? 'bg-green-400 text-white' 
                    : 'text-white hover:bg-opacity-80'
                }`}
                style={page === 1 ? {} : { backgroundColor: '#2a3328' }}
              >
                {page}
              </button>
            ))}
            
            <button className="p-2 rounded-lg hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#2a3328' }}>
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;