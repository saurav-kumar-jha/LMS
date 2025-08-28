import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Mail, Lock, User, Phone, Search, FacebookIcon, GoalIcon } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1f1a' }}>
     

      {/* Main Auth Section */}
      <div className="flex items-center justify-center min-h-screen pt-16 pb-12 px-4">
        <div className="max-w-6xl w-full flex rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#f5f1eb' }}>
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center relative overflow-hidden" style={{ backgroundColor: '#2a3328' }}>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">EduHub</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                {isLogin ? 'Continue Learning' : 'Start Your Journey'}
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {isLogin 
                  ? 'Welcome back! Access your personalized dashboard and continue your learning path with expert instructors.'
                  : 'Join thousands of learners worldwide. Get access to premium courses and build skills that matter in today\'s world.'
                }
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4" style={{ backgroundColor: '#fecaca' }}>
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Mastering Data Science</h3>
                    <p className="text-gray-400 text-sm">Machine learning and data visualization frameworks</p>
                    <div className="w-32 bg-gray-600 rounded-full h-1 mt-2">
                      <div className="bg-green-400 h-1 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4" style={{ backgroundColor: '#fed7aa' }}>
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Creative Writing Workshop</h3>
                    <p className="text-gray-400 text-sm">From basic storytelling skills to compelling narratives</p>
                    <div className="w-32 bg-gray-600 rounded-full h-1 mt-2">
                      <div className="bg-green-400 h-1 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full opacity-5 -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300 rounded-full opacity-5 translate-y-24 -translate-x-24"></div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ color: '#1f2937' }}>EduHub</span>
              </div>

              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#1f2937' }}>
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to access your learning dashboard'
                    : 'Join our community of learners today'
                  }
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Name field - only for signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-colors"
                        placeholder="Enter your full name"
                        style={{ backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-colors"
                      placeholder="Enter your email"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Phone field - only for signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-colors"
                        placeholder="Enter your phone number"
                        style={{ backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-colors"
                      placeholder="Enter your password"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field - only for signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-colors"
                        placeholder="Confirm your password"
                        style={{ backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Remember me / Forgot password for login */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-green-400 focus:ring-green-400" 
                      />
                      <span className="ml-2 text-sm" style={{ color: '#374151' }}>Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-green-600 hover:text-green-500">
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Terms checkbox for signup */}
                {!isLogin && (
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-green-400 focus:ring-green-400 mt-1" 
                    />
                    <span className="ml-2 text-sm" style={{ color: '#374151' }}>
                      I agree to the{' '}
                      <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
                    </span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-400 text-white py-3 px-4 rounded-lg hover:bg-green-500 focus:ring-4 focus:ring-green-200 font-medium transition-colors cursor-pointer"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </div>

              {/* Social login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500" style={{ backgroundColor: '#f5f1eb' }}>Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xl mr-2"><GoalIcon/></span>
                    <span className="text-sm font-medium" style={{ color: '#374151' }}>Google</span>
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xl mr-2"><FacebookIcon/></span>
                    <span className="text-sm font-medium" style={{ color: '#374151' }}>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Switch between login/signup */}
              <div className="mt-8 text-center">
                <span className="text-gray-600 ">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 hover:text-green-500 font-medium cursor-pointer"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;