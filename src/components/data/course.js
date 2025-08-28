// src/data/coursesData.js

export const courses = {
  "data-science": {
    id: "data-science",
    title: "Introduction to Data Science",
    subtitle:
      "Learn the fundamentals of data science, including data analysis, machine learning, and data visualization techniques.",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 12450,
    duration: "8 weeks",
    level: "Beginner",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description:
      "This course provides a comprehensive introduction to data science, covering key concepts and techniques used in the field.",
    learningObjectives: [
      "Understand the basics of data manipulation and statistical methods",
      "Learn to build and evaluate machine learning models",
      "Master data visualization techniques using popular tools",
      "Apply data science methods to solve real-world problems",
    ],
    prerequisites:
      "No prior experience required, but Python or R basics are helpful.",
    modules: [
      {
        title: "Module 1: Introduction to Data Science",
        description: "Overview of the data science field",
        lessons: 8,
        duration: "2 hours",
      },
      {
        title: "Module 2: Data Analysis and Preparation",
        description: "Data cleaning and preprocessing",
        lessons: 12,
        duration: "3 hours",
      },
      {
        title: "Module 3: Machine Learning Fundamentals",
        description: "Supervised & unsupervised learning",
        lessons: 15,
        duration: "4 hours",
      },
      {
        title: "Module 4: Data Visualization",
        description: "Charts, dashboards, and storytelling",
        lessons: 10,
        duration: "2.5 hours",
      },
      {
        title: "Module 5: Case Studies",
        description: "Real-world applications",
        lessons: 8,
        duration: "3 hours",
      },
    ],
  },

  "machine-learning": {
    id: "machine-learning",
    title: "Advanced Machine Learning",
    subtitle:
      "Master deep learning, neural networks, and AI model deployment.",
    instructor: "Prof. Michael Chen",
    rating: 4.9,
    students: 8320,
    duration: "12 weeks",
    level: "Advanced",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    description:
      "Dive deep into machine learning algorithms and their applications.",
    learningObjectives: [
      "Master advanced ML algorithms and neural network architectures",
      "Learn TensorFlow and PyTorch",
      "Understand model optimization and hyperparameter tuning",
      "Deploy ML models to production",
    ],
    prerequisites:
      "Python, statistics, linear algebra, and basic ML knowledge required.",
    modules: [
      {
        title: "Module 1: Advanced ML Algorithms",
        lessons: 15,
        duration: "4 hours",
      },
      {
        title: "Module 2: Neural Networks",
        lessons: 20,
        duration: "6 hours",
      },
      {
        title: "Module 3: Optimization",
        lessons: 12,
        duration: "3.5 hours",
      },
      {
        title: "Module 4: Deployment",
        lessons: 18,
        duration: "5 hours",
      },
      {
        title: "Module 5: Capstone",
        lessons: 10,
        duration: "8 hours",
      },
    ],
  },

  "web-development": {
    id: "web-development",
    title: "Full Stack Web Development",
    subtitle:
      "Learn React, Node.js, and databases to build complete applications.",
    instructor: "Alex Rodriguez",
    rating: 4.7,
    students: 15670,
    duration: "16 weeks",
    level: "Intermediate",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop",
    description:
      "Build modern web applications from scratch using React, Node, and databases.",
    learningObjectives: [
      "Master React & modern JavaScript",
      "Build APIs with Node.js & Express",
      "Design SQL & NoSQL databases",
      "Deploy applications with CI/CD",
    ],
    prerequisites:
      "Basic HTML, CSS, JS required. Some programming experience is helpful.",
    modules: [
      {
        title: "Module 1: Frontend Fundamentals",
        lessons: 20,
        duration: "5 hours",
      },
      {
        title: "Module 2: React Development",
        lessons: 25,
        duration: "7 hours",
      },
      {
        title: "Module 3: Backend Development",
        lessons: 22,
        duration: "6 hours",
      },
      {
        title: "Module 4: Database Management",
        lessons: 18,
        duration: "4.5 hours",
      },
      {
        title: "Module 5: Deployment & DevOps",
        lessons: 15,
        duration: "4 hours",
      },
    ],
  },
};
