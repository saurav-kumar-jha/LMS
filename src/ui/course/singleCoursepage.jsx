import { useNavigate, useParams } from 'react-router-dom'
import { courses } from '../../components/data/course'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, Play, CheckCircle, Book, Target, Award } from 'lucide-react';

function SingleCoursePage() {
    const { id } = useParams()
    const course = courses[id];
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate()

    if (!course) {
        return (
            <h1 className='text-white'>Course not found..</h1>
        )
    }

    return (
        <>
            <div className="min-h-screen" style={{ backgroundColor: '#1a1f1a' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b text-white border-gray-600">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        <div className="flex items-center gap-4 mb-6">
                            <button className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer hover:underline transition-colors" onClick={()=>navigate(-1)}>
                                <ArrowLeft size={20} />
                                <span>Courses</span>
                            </button>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-300">{course.title}</span>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h1 className="text-4xl text-white font-bold mb-4">{course.title}</h1>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                    {course.subtitle}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Star className="text-yellow-400 fill-current" size={16} />
                                        <span className="font-semibold">{course.rating}</span>
                                        <span className="text-gray-400">rating</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-gray-400" />
                                        <span>{course.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="bg-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                        {course.level}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <div className="mb-6">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-3xl font-bold text-green-400">{course.price}</span>
                                            <span className="text-gray-400">one-time payment</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4">
                                        Enroll Now
                                    </button>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3">
                                            <Play size={16} className="text-green-400" />
                                            <span>Lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle size={16} className="text-green-400" />
                                            <span>Certificate of completion</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users size={16} className="text-green-400" />
                                            <span>Community access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Award size={16} className="text-green-400" />
                                            <span>Instructor: {course.instructor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tabs Navigation */}
                <div className="max-w-6xl mx-auto px-6 text-white">
                    <div className="border-b border-gray-700">
                        <div className="flex space-x-8">
                            {[
                                { id: 'overview', label: 'Overview', icon: Book },
                                { id: 'curriculum', label: 'Curriculum', icon: Target },
                                { id: 'reviews', label: 'Reviews', icon: Star }
                            ].map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
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
                <div className="max-w-6xl mx-auto px-6 py-8 text-white">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Course Description */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {course.description}
                                </p>
                            </div>

                            {/* Learning Objectives */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
                                <div className="grid gap-4">
                                    {course.learningObjectives.map((objective, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="bg-green-600 rounded-full p-1 mt-1">
                                                <CheckCircle size={16} className="text-white" />
                                            </div>
                                            <span className="text-gray-300">{objective}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prerequisites */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        {course.prerequisites}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'curriculum' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Course Outline</h2>
                            <div className="space-y-4">
                                {course.modules.map((module, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <h3 className="text-xl font-semibold text-green-400">{module.title}</h3>
                                            </div>
                                            <p className="text-gray-300 mb-4">{module.description}</p>
                                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Book size={16} />
                                                    <span>{module.lessons} lessons</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} />
                                                    <span>{module.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                            <div className="grid gap-6">
                                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                            <span className="font-bold">JD</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">John Doe</h4>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">
                                        Excellent course! The instructor explains complex concepts in a very understandable way.
                                        The hands-on projects really helped me apply what I learned.
                                    </p>
                                </div>

                                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="font-bold">SM</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Sarah Miller</h4>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">
                                        Great course structure and pacing. The modules build upon each other logically,
                                        making it easy to follow along even for beginners.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default SingleCoursePage

const CourseDetailPage = () => {
    const [course, setSelectedCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Sample courses data - in real app this would come from API/props/navigation state
    const coursesData = {
        'data-science': {
            id: 'data-science',
            title: 'Introduction to Data Science',
            subtitle: 'Learn the fundamentals of data science, including data analysis, machine learning, and data visualization techniques. This comprehensive course will prepare you to solve real-world problems.',
            instructor: 'Dr. Sarah Johnson',
            rating: 4.8,
            students: 12450,
            duration: '8 weeks',
            level: 'Beginner',
            price: '$99',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            description: 'This course provides a comprehensive introduction to data science, covering key concepts and techniques used in the field. You will learn how to analyze data, build machine learning models, and create meaningful data visualizations. The course is designed for beginners with no prior experience in data science, but some knowledge of programming is recommended.',
            learningObjectives: [
                'Understand the basics of data manipulation and statistical methods',
                'Learn to build and evaluate machine learning models',
                'Master data visualization techniques using popular tools',
                'Apply data science methods to solve real-world problems'
            ],
            prerequisites: 'No prior experience in data science is required. However, a basic understanding of programming concepts, preferably in Python or R, would be helpful. Familiarity with basic mathematics and statistics would also be beneficial but not mandatory.',
            modules: [
                {
                    title: 'Module 1: Introduction to Data Science',
                    description: 'Introduction to data science world and concepts',
                    lessons: 8,
                    duration: '2 hours'
                },
                {
                    title: 'Module 2: Data Analysis and Preparation',
                    description: 'Learn about Data Cleaning and Preprocessing',
                    lessons: 12,
                    duration: '3 hours'
                },
                {
                    title: 'Module 3: Machine Learning Fundamentals',
                    description: 'Supervised and Unsupervised Learning Techniques',
                    lessons: 15,
                    duration: '4 hours'
                },
                {
                    title: 'Module 4: Data Visualization',
                    description: 'Creating Effective Charts and Graphs',
                    lessons: 10,
                    duration: '2.5 hours'
                },
                {
                    title: 'Module 5: Case Studies and Applications',
                    description: 'Real-world Data Science Applications',
                    lessons: 8,
                    duration: '3 hours'
                }
            ]
        },
        'machine-learning': {
            id: 'machine-learning',
            title: 'Advanced Machine Learning',
            subtitle: 'Master advanced ML algorithms including deep learning, neural networks, and AI model deployment. Build production-ready machine learning systems.',
            instructor: 'Prof. Michael Chen',
            rating: 4.9,
            students: 8320,
            duration: '12 weeks',
            level: 'Advanced',
            price: '$149',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
            description: 'This advanced course dives deep into machine learning algorithms and their applications. You will learn about neural networks, deep learning, model optimization, and deployment strategies. Perfect for those who want to become ML engineers or data scientists.',
            learningObjectives: [
                'Master advanced ML algorithms and neural network architectures',
                'Learn deep learning frameworks like TensorFlow and PyTorch',
                'Understand model optimization and hyperparameter tuning',
                'Deploy ML models to production environments'
            ],
            prerequisites: 'Strong background in Python programming, linear algebra, calculus, and statistics. Previous experience with basic machine learning concepts is required. Familiarity with data science tools and libraries is highly recommended.',
            modules: [
                {
                    title: 'Module 1: Advanced ML Algorithms',
                    description: 'Deep dive into complex machine learning algorithms',
                    lessons: 15,
                    duration: '4 hours'
                },
                {
                    title: 'Module 2: Neural Networks and Deep Learning',
                    description: 'Understanding neural network architectures',
                    lessons: 20,
                    duration: '6 hours'
                },
                {
                    title: 'Module 3: Model Optimization',
                    description: 'Hyperparameter tuning and model improvement',
                    lessons: 12,
                    duration: '3.5 hours'
                },
                {
                    title: 'Module 4: ML Model Deployment',
                    description: 'Deploying models to production environments',
                    lessons: 18,
                    duration: '5 hours'
                },
                {
                    title: 'Module 5: Capstone Project',
                    description: 'End-to-end ML project implementation',
                    lessons: 10,
                    duration: '8 hours'
                }
            ]
        },
        'web-development': {
            id: 'web-development',
            title: 'Full Stack Web Development',
            subtitle: 'Learn to build modern web applications using React, Node.js, and databases. From frontend to backend, master the complete web development stack.',
            instructor: 'Alex Rodriguez',
            rating: 4.7,
            students: 15670,
            duration: '16 weeks',
            level: 'Intermediate',
            price: '$129',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
            description: 'Comprehensive full-stack web development course covering modern technologies and best practices. Learn to build responsive, scalable web applications from scratch using industry-standard tools and frameworks.',
            learningObjectives: [
                'Master frontend development with React and modern JavaScript',
                'Build robust backend APIs with Node.js and Express',
                'Design and implement database solutions',
                'Deploy and maintain web applications in production'
            ],
            prerequisites: 'Basic understanding of HTML, CSS, and JavaScript is required. Some programming experience is helpful but not mandatory. Familiarity with command line operations would be beneficial.',
            modules: [
                {
                    title: 'Module 1: Frontend Fundamentals',
                    description: 'HTML5, CSS3, and Modern JavaScript',
                    lessons: 20,
                    duration: '5 hours'
                },
                {
                    title: 'Module 2: React Development',
                    description: 'Building interactive user interfaces with React',
                    lessons: 25,
                    duration: '7 hours'
                },
                {
                    title: 'Module 3: Backend Development',
                    description: 'Node.js, Express, and API development',
                    lessons: 22,
                    duration: '6 hours'
                },
                {
                    title: 'Module 4: Database Management',
                    description: 'SQL and NoSQL database design and implementation',
                    lessons: 18,
                    duration: '4.5 hours'
                },
                {
                    title: 'Module 5: Deployment and DevOps',
                    description: 'Deploying applications and CI/CD pipelines',
                    lessons: 15,
                    duration: '4 hours'
                }
            ]
        }
    };

    // Simulate navigation - in real app this would come from router params
    useEffect(() => {
        // Simulate getting course ID from URL params or navigation state
        const courseId = 'data-science'; // This would normally come from useParams() or navigation state
        setSelectedCourse(coursesData[courseId] || coursesData['data-science']);
    }, []);

    // Course selection simulator for demo
    const handleCourseSelect = (courseId) => {
        setSelectedCourse(coursesData[courseId]);
    };

    if (!selectedCourse) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* /* Demo Course Selector
            <div className="bg-gray-800 p-4 border-b border-gray-700">
                <div className="max-w-6xl mx-auto">
                    <p className="text-sm text-gray-400 mb-2">Demo: Select a course to see dynamic content</p>
                    <div className="flex gap-2 flex-wrap">
                        {Object.keys(coursesData).map(courseId => (
                            <button
                                key={courseId}
                                onClick={() => handleCourseSelect(courseId)}
                                className={`px-3 py-1 rounded text-sm ${selectedCourse.id === courseId
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                    }`}
                            >
                                {coursesData[courseId].title}
                            </button>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Header */}
            {/* <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4 mb-6">
                        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                            <span>Courses</span>
                        </button>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-300">{selectedCourse.title}</span>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl font-bold mb-4">{selectedCourse.title}</h1>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                {selectedCourse.subtitle}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Star className="text-yellow-400 fill-current" size={16} />
                                    <span className="font-semibold">{selectedCourse.rating}</span>
                                    <span className="text-gray-400">rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" />
                                    <span>{selectedCourse.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{selectedCourse.duration}</span>
                                </div>
                                <div className="bg-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                    {selectedCourse.level}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="mb-6">
                                    <img
                                        src={selectedCourse.image}
                                        alt={selectedCourse.title}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl font-bold text-green-400">{selectedCourse.price}</span>
                                        <span className="text-gray-400">one-time payment</span>
                                    </div>
                                </div>

                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4">
                                    Enroll Now
                                </button>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Play size={16} className="text-green-400" />
                                        <span>Lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={16} className="text-green-400" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users size={16} className="text-green-400" />
                                        <span>Community access</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award size={16} className="text-green-400" />
                                        <span>Instructor: {selectedCourse.instructor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Tabs Navigation */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="border-b border-gray-700">
                    <div className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Overview', icon: Book },
                            { id: 'curriculum', label: 'Curriculum', icon: Target },
                            { id: 'reviews', label: 'Reviews', icon: Star }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
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
            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Course Description */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {selectedCourse.description}
                            </p>
                        </div>

                        {/* Learning Objectives */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
                            <div className="grid gap-4">
                                {selectedCourse.learningObjectives.map((objective, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="bg-green-600 rounded-full p-1 mt-1">
                                            <CheckCircle size={16} className="text-white" />
                                        </div>
                                        <span className="text-gray-300">{objective}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prerequisites */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <p className="text-gray-300 leading-relaxed">
                                    {selectedCourse.prerequisites}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'curriculum' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Course Outline</h2>
                        <div className="space-y-4">
                            {selectedCourse.modules.map((module, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-xl font-semibold text-green-400">{module.title}</h3>
                                        </div>
                                        <p className="text-gray-300 mb-4">{module.description}</p>
                                        <div className="flex items-center gap-6 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Book size={16} />
                                                <span>{module.lessons} lessons</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                <span>{module.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                        <div className="grid gap-6">
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                        <span className="font-bold">JD</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">John Doe</h4>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className="text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    Excellent course! The instructor explains complex concepts in a very understandable way.
                                    The hands-on projects really helped me apply what I learned.
                                </p>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="font-bold">SM</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Sarah Miller</h4>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className="text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    Great course structure and pacing. The modules build upon each other logically,
                                    making it easy to follow along even for beginners.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
