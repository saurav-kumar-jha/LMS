import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ChevronLeft, ChevronRight, Star, Clock, Users, Award, TrendingUp } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner slides data
  const bannerSlides = [
    {
      title: "Master Data Science Today",
      subtitle: "Get 70% OFF on our most popular data science courses",
      description: "Learn machine learning, Python, and data visualization from industry experts",
      buttonText: "Claim Discount",
      bgGradient: "from-blue-600 to-purple-700",
      image: "📊",
      badge: "Limited Time"
    },
    {
      title: "New AI & ChatGPT Course",
      subtitle: "Learn AI prompt engineering and automation",
      description: "Master the latest AI technologies and boost your productivity",
      buttonText: "Start Learning",
      bgGradient: "from-green-600 to-teal-700",
      image: "🤖",
      badge: "New Release"
    },
    {
      title: "Full Stack Development",
      subtitle: "Complete web development bootcamp",
      description: "From HTML to React, Node.js and databases - become a full stack developer",
      buttonText: "Enroll Now",
      bgGradient: "from-orange-600 to-red-700",
      image: "💻",
      badge: "Most Popular"
    }
  ];

  //categories data
  const categories = [
    {
      title: "Development",
      icons: ["💻"], // single icon
      bgColor: "#4a7c80",
      innerBg: "bg-teal-700",
    },
    {
      title: "Business",
      icons: ["👥", "💼"], // multiple icons
      bgColor: "#f5f1eb",
    },
    {
      title: "Finance & Accounting",
      icons: ["📊", "💰"], // stacked icons
      bgColor: "#4a7c80",
    },
    {
      title: "IT & Software",
      icons: ["📄"],
      bgColor: "#4a7c80",
      innerBg: "bg-white",
    },
    {
      title: "Personal Development",
      icons: ["🌱"],
      bgColor: "#f5f1eb",
      innerBg: "bg-orange-200",
    },
    {
      title: "Design",
      icons: ["🎨"],
      bgColor: "#f5f1eb",
    },
    {
      title: "Marketing",
      icons: ["📈"],
      bgColor: "#f5f1eb",
      innerBg: "bg-teal-600 text-white",
    },
    {
      title: "Lifestyle",
      icons: ["🌿"],
      bgColor: "#f5f1eb",
      badge: "LIFESTYLE", // special case
    },
  ];


  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1f1a' }}>
      {/* Hero Banner Slider */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 bg-gradient-to-r ${slide.bgGradient} relative overflow-hidden`}
                >
                  <div className="px-12 py-16 flex items-center justify-between">
                    <div className="flex-1 max-w-2xl">
                      <div className="mb-4">
                        <span className="inline-block bg-[#11111154] bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {slide.badge}
                        </span>
                      </div>
                      <h1 className="text-5xl font-bold text-white mb-4">{slide.title}</h1>
                      <h2 className="text-2xl text-white opacity-90 mb-4">{slide.subtitle}</h2>
                      <p className="text-white opacity-80 text-lg mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="bg-white text-gray-900 px-8 cursor-pointer py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-lg">
                          {slide.buttonText}
                        </button>
                        <button className="border-2 border-white cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Right side illustration */}
                    <div className="hidden lg:block flex-shrink-0 ml-12">
                      <div className="w-96 h-64 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
                        <span className="text-8xl">{slide.image}</span>
                      </div>
                    </div>
                  </div>

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#11111154] active:scale-90 duration-75 ease-in-out cursor-pointer  bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#11111154] active:scale-90 duration-75 ease-in-out cursor-pointer  bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Advance search"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-white placeholder-gray-400 text-lg focus:ring-2 focus:ring-green-400 outline-none"
                style={{ backgroundColor: '#2a3328' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Mastering Data Science */}
            <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" style={{ backgroundColor: '#f5f1eb' }}>
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: '#a7c7c7' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-green-500 opacity-80"></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2" style={{ color: '#1f2937' }}>Mastering Data Science</h3>
                <p className="text-gray-600 text-sm mb-4">Learn data analysis, machine learning, and visualization techniques</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="mr-4">4.8</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>15.2k students</span>
                </div>
              </div>
            </div>

            {/* Creative Writing Workshop */}
            <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" style={{ backgroundColor: '#f5f1eb' }}>
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: '#f4c2a1' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-32 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2" style={{ color: '#1f2937' }}>Creative Writing Workshop</h3>
                <p className="text-gray-600 text-sm mb-4">Develop your storytelling skills and craft compelling narratives</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="mr-4">4.6</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>8.5k students</span>
                </div>
              </div>
            </div>

            {/* Introduction to Digital Marketing */}
            <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" style={{ backgroundColor: '#f5f1eb' }}>
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: '#a8d5ba' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-32 bg-teal-600 rounded-lg flex items-center justify-center relative">
                    <span className="text-3xl">👩‍💼</span>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2" style={{ color: '#1f2937' }}>Introduction to Digital Marketing</h3>
                <p className="text-gray-600 text-sm mb-4">Discover the fundamentals of online marketing and advertising</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="mr-4">4.7</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>12.3k students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by category</h2>

          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="group cursor-pointer">
                <div
                  className="w-full aspect-square rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {/* Inner styling (if any) */}
                  {cat.innerBg ? (
                    <div className={`w-16 h-20 ${cat.innerBg} rounded-lg flex items-center justify-center`}>
                      <span className="text-2xl">{cat.icons[0]}</span>
                    </div>
                  ) : cat.badge ? (
                    <div className="text-center">
                      <div className="text-3xl mb-1">{cat.icons[0]}</div>
                      <div className="text-xs bg-white px-2 py-1 rounded">{cat.badge}</div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {cat.icons.map((icon, i) => (
                        <span key={i} className={i === 0 ? "text-3xl" : "text-2xl"}>
                          {icon}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-medium">{cat.title}</h3>
              </div>
            ))}
          </div>


        </div>
      </section>


    </div>
  );
};

export default Home;