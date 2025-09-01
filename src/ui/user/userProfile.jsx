import React, { useEffect, useState } from 'react';
import {
    User, Mail, Calendar, MapPin, Phone, Globe, Edit3, Camera,
    BookOpen, Award, Clock, TrendingUp, Play, Download, Heart,
    Star, Users, LogOut, Settings, Bell, Shield, ChevronRight,
    Trophy, Target, Book
} from 'lucide-react';
import { courses } from '../../components/data/course';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [wishlistCourses, setWishlistCourses] = useState([])

    // Sample user data
    const userData = {
        id: 'user_12345',
        name: 'Sophia Carter',
        username: '@sophia_carter_dev',
        email: 'sophia.carter@email.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1995-03-15',
        location: 'San Francisco, CA',
        website: 'sophia-carter.dev',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Love learning new technologies and sharing knowledge with the community.',
        joinedDate: '2021-06-15',
        avatar: 'https://imgs.search.brave.com/pmz-NzyWKHQJoXTgX_hJCprmEIlZriLoUFOvMI0Viw4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctc3R1ZGVu/dC13b21hbi13ZWFy/aW5nLWJhY2twYWNr/LWdsYXNzZXMtYWR1/bHQtYm9va181Mzg3/Ni03NzQ3NzUuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA',
        jobTitle: 'Software Engineer',
        company: 'TechCorp Inc.',
        socialLinks: {
            linkedin: 'sophia-carter-dev',
            github: 'sophia-carter',
            twitter: 'sophiadev'
        }
    };

    // Learning statistics
    const learningStats = {
        coursesInProgress: 2,
        completedCourses: 5,
        totalLearningHours: 120,
        certificates: 5,
        wishlistItems: 8,
        currentStreak: 15,
        totalPoints: 2450
    };

    //set wishlist course
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("WishList")) || []
        const wishlistcourses = Object.values(courses).filter((c) => savedWishlist.includes(c.id));
        setWishlistCourses(wishlistcourses);
    }, []);

    // Enrolled courses
    const enrolledCourses = [
        {
            id: 'python-advanced',
            title: 'Advanced Python Programming',
            description: 'Learn advanced Python concepts and techniques for building robust applications',
            instructor: 'Dr. Sarah Johnson',
            progress: 65,
            status: 'in-progress',
            image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=300&h=200&fit=crop',
            totalLessons: 45,
            completedLessons: 29,
            nextLesson: 'Decorators and Context Managers',
            estimatedTime: '2 hours remaining'
        },
        {
            id: 'react-advanced',
            title: 'Advanced React Development',
            description: 'Master advanced React patterns and build scalable applications',
            instructor: 'Alex Rodriguez',
            progress: 30,
            status: 'in-progress',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
            totalLessons: 38,
            completedLessons: 12,
            nextLesson: 'Custom Hooks and Performance',
            estimatedTime: '4 hours remaining'
        },
        {
            id: 'data-science',
            title: 'Data Science Fundamentals',
            description: 'Master the basics of data science, including data analysis, visualization, and machine learning',
            instructor: 'Prof. Michael Chen',
            progress: 100,
            status: 'completed',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
            completedDate: '2024-08-15',
            grade: 'A+',
            certificateId: 'CERT_DS_2024_001'
        },
        {
            id: 'web-development',
            title: 'Web Development with React',
            description: 'Build modern web applications using React, a popular JavaScript library',
            instructor: 'Emily Watson',
            progress: 100,
            status: 'completed',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop',
            completedDate: '2024-07-20',
            grade: 'A',
            certificateId: 'CERT_WD_2024_002'
        }
    ];


    const achievements = [
        { id: 1, title: 'First Course Completed', icon: Trophy, color: 'text-yellow-400', earned: true },
        { id: 2, title: '5 Courses Mastered', icon: Award, color: 'text-green-400', earned: true },
        { id: 3, title: '100 Hours Learned', icon: Clock, color: 'text-blue-400', earned: true },
        { id: 4, title: '15 Day Streak', icon: TrendingUp, color: 'text-purple-400', earned: true },
        { id: 5, title: 'Community Contributor', icon: Users, color: 'text-orange-400', earned: false }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                        {/* Profile Photo */}
                        <div className="relative">
                            <img
                                src={userData.avatar}
                                alt={userData.name}
                                className="w-36 h-36 rounded-full border-2 border-green-500 cursor-pointer object-cover"
                            />
                            <button className="absolute cursor-pointer bottom-0 right-0 bg-green-600 hover:bg-green-700 p-2 rounded-full text-white transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                                    <p className="text-green-400 font-medium mb-1">{userData.username}</p>
                                    <p className="text-gray-300">{userData.jobTitle} at {userData.company}</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab("settings")}
                                    className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <Edit3 size={16} />
                                    Edit Profile
                                </button>
                            </div>

                            <p className="text-gray-300 mb-4 max-w-2xl">{userData.bio}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail size={16} />
                                    <span>{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin size={16} />
                                    <span>{userData.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar size={16} />
                                    <span>Joined {formatDate(userData.joinedDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Globe size={16} />
                                    <span>{userData.website}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                    <div className="flex space-x-8 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: User },
                            { id: 'courses', label: 'My Courses', icon: BookOpen },
                            { id: 'certificates', label: 'Certificates', icon: Award },
                            { id: 'settings', label: 'Settings', icon: Settings }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-1 py-4 cursor-pointer border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-green-500 text-green-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Learning Statistics */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Learning Activity</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-blue-600 p-2 rounded-lg">
                                            <Play size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{learningStats.coursesInProgress}</p>
                                            <p className="text-gray-400 text-sm">Courses in Progress</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-green-600 p-2 rounded-lg">
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{learningStats.completedCourses}</p>
                                            <p className="text-gray-400 text-sm">Completed Courses</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-purple-600 p-2 rounded-lg">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{learningStats.totalLearningHours}</p>
                                            <p className="text-gray-400 text-sm">Total Learning Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-orange-600 p-2 rounded-lg">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{learningStats.currentStreak}</p>
                                            <p className="text-gray-400 text-sm">Day Streak</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Progress */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Current Progress</h3>
                            <div className="grid gap-4">
                                {enrolledCourses.filter(course => course.status === 'in-progress').map(course => (
                                    <div key={course.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full lg:w-48 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                                                    <h4 className="text-xl font-bold">{course.title}</h4>
                                                    <span className="text-green-400 font-bold">{course.progress}% Complete</span>
                                                </div>
                                                <p className="text-gray-400 mb-3">{course.description}</p>
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Progress</span>
                                                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-400">Next: {course.nextLesson}</p>
                                                        {/* <p className="text-sm text-green-400">{course.estimatedTime}</p> */}
                                                    </div>
                                                    <button className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                                        <Play size={16} />
                                                        Continue Learning
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Achievements</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {achievements.map(achievement => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`bg-gray-800 rounded-xl p-4 border border-gray-700 text-center ${achievement.earned ? 'opacity-100' : 'opacity-50'
                                                }`}
                                        >
                                            <div className={`${achievement.color} mb-2 flex justify-center`}>
                                                <Icon size={32} />
                                            </div>
                                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                                            {achievement.earned && (
                                                <p className="text-green-400 text-xs mt-1">Earned</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* My Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">My Courses</h2>
                            <div className="text-gray-400">
                                {enrolledCourses.length} total courses
                            </div>
                        </div>

                        {/* In Progress Courses */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">In Progress ({enrolledCourses.filter(c => c.status === 'in-progress').length})</h3>
                            <div className="grid gap-6">
                                {enrolledCourses.filter(course => course.status === 'in-progress').map(course => (
                                    <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-colors">
                                        <div className="flex flex-col lg:flex-row">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full lg:w-64 h-48 lg:h-auto object-cover"
                                            />
                                            <div className="p-6 flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-xl font-bold mb-1">{course.title}</h4>
                                                        <p className="text-gray-400">by {course.instructor}</p>
                                                    </div>
                                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        In Progress
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 mb-4">{course.description}</p>

                                                <div className="mb-4">
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span>Progress: {course.progress}%</span>
                                                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                                        <div
                                                            className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-400">Next lesson:</p>
                                                        <p className="font-medium">{course.nextLesson}</p>
                                                        {/* <p className="text-sm text-green-400">{course.estimatedTime}</p> */}
                                                    </div>
                                                    <button className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                                                        <Play size={18} />
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Completed Courses */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Completed ({enrolledCourses.filter(c => c.status === 'completed').length})</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {enrolledCourses.filter(course => course.status === 'completed').map(course => (
                                    <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="text-lg font-bold mb-1">{course.title}</h4>
                                                    <p className="text-gray-400 text-sm">by {course.instructor}</p>
                                                </div>
                                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Completed
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-400">Completed on</p>
                                                    <p className="font-medium">{formatDate(course.completedDate)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">Grade</p>
                                                    <p className="font-bold text-green-400 text-lg">{course.grade}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="flex-1 bg-gray-700 cursor-pointer hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                                    <Download size={16} />
                                                    Certificate
                                                </button>
                                                <button className="flex-1 bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors">
                                                    Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Wishlist Tab
        {activeTab === 'wishlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <div className="text-gray-400">
                {wishlistCourses.length} courses saved
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistCourses.map(course => (
                <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-colors">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-32 object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                      <Heart size={16} className="fill-current" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-1">{course.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">by {course.instructor}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="font-bold text-green-400">{course.price}</span>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">My Certificates</h2>
                            <div className="text-gray-400">
                                {learningStats.certificates} certificates earned
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {enrolledCourses.filter(course => course.status === 'completed').map(course => (
                                <div key={course.id} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-green-600 p-3 rounded-lg">
                                            <Award size={24} />
                                        </div>
                                        <span className="text-xs text-gray-400">#{course.certificateId}</span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">Certificate of Completion</h3>
                                    <h4 className="text-xl font-bold text-green-400 mb-2">{course.title}</h4>
                                    <p className="text-gray-300 mb-4">Awarded to {userData.name}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                        <span>Completed: {formatDate(course.completedDate)}</span>
                                        <span>Grade: {course.grade}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                            <Download size={16} />
                                            Download
                                        </button>
                                        {/* <button className="bg-gray-600 cursor-pointer hover:bg-gray-500 px-4 py-2 rounded-lg font-medium transition-colors">
                      Share
                    </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={userData.name}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Username</label>
                                        <input
                                            type="text"
                                            defaultValue={userData.username.slice(1)}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            defaultValue={userData.email}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            defaultValue={userData.phone}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            defaultValue={userData.dateOfBirth}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Location</label>
                                        <input
                                            type="text"
                                            defaultValue={userData.location}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Website</label>
                                        <input
                                            type="url"
                                            defaultValue={userData.website}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2">Bio</label>
                                        <textarea
                                            rows="3"
                                            defaultValue={userData.bio}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-400 mb-2">
                                            Age: {calculateAge(userData.dateOfBirth)} years old
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Notification Preferences */}
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Bell size={20} />
                                    Notification Preferences
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Email Notifications</h4>
                                            <p className="text-sm text-gray-400">Receive course updates via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Push Notifications</h4>
                                            <p className="text-sm text-gray-400">Get notified about course deadlines</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Weekly Progress Report</h4>
                                            <p className="text-sm text-gray-400">Weekly summary of your learning activity</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Marketing Emails</h4>
                                            <p className="text-sm text-gray-400">Receive promotional offers and new course announcements</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy & Security */}
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield size={20} />
                                    Privacy & Security
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Profile Visibility</h4>
                                            <p className="text-sm text-gray-400">Make your profile visible to other students</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Show Learning Progress</h4>
                                            <p className="text-sm text-gray-400">Display your certificates and completed courses</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                    <div className="pt-4 border-t border-gray-700">
                                        <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                            <Shield size={16} />
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4">Account Actions</h3>
                                <div className="space-y-4">
                                    {/* <div className="flex items-center justify-between py-3 px-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium">Download My Data</h4>
                      <p className="text-sm text-gray-400">Get a copy of all your account data</p>
                    </div>
                    <button className="bg-gray-600 cursor-pointer hover:bg-gray-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </div> */}

                                    <div className="flex items-center justify-between py-3 px-4 bg-red-900/20 border border-red-800 rounded-lg">
                                        <div>
                                            <h4 className="font-medium text-red-400">Delete Account</h4>
                                            <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                                        </div>
                                        <button className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4">Social Media Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                        <input
                                            type="text"
                                            defaultValue={`linkedin.com/in/${userData.socialLinks.linkedin}`}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">GitHub</label>
                                        <input
                                            type="text"
                                            defaultValue={`github.com/${userData.socialLinks.github}`}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Twitter</label>
                                        <input
                                            type="text"
                                            defaultValue={`twitter.com/${userData.socialLinks.twitter}`}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Logout Button - Always visible at bottom */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-gray-400 text-sm">
                            Member since {formatDate(userData.joinedDate)}
                        </p>
                        {/* <p className="text-gray-500 text-xs">
                            Last login: Today at 2:34 PM
                        </p> */}
                    </div>

                    <button className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Quick Stats Footer */}
            {/* <div className="bg-gray-800 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-green-400">{learningStats.completedCourses}</p>
                            <p className="text-sm text-gray-400">Courses Completed</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-400">{learningStats.certificates}</p>
                            <p className="text-sm text-gray-400">Certificates Earned</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-400">{learningStats.totalLearningHours}h</p>
                            <p className="text-sm text-gray-400">Hours Learned</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-400">{learningStats.currentStreak}</p>
                            <p className="text-sm text-gray-400">Day Streak</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default UserProfilePage;