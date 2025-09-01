import React, { useState } from 'react';
import { Star, Users, BookOpen, Award, MapPin, Mail, Linkedin, Twitter, Filter, Search, ChevronDown } from 'lucide-react';
import { courses } from '../../components/data/course';
import { instructors } from '../../components/data/instructor';

const InstructorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('name');


  //GEt teacher from course 
  const teacher = [...new Set(Object.values(courses).flatMap(tcr => tcr.instructor))]

  // console.log(teacher);
  

  // Get unique subjects for filter
  const allSubjects = [...new Set(instructors.flatMap(inst => inst.subjects))];

  // Filter and sort instructors
  const filteredInstructors = instructors
    .filter(instructor => {
      const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           instructor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = selectedSubject === 'all' || instructor.subjects.includes(selectedSubject);
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Instructors</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn from industry experts and experienced professionals who are passionate about teaching and sharing their knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search instructors or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-48"
            >
              <option value="all">All Subjects</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-48"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="students">Sort by Students</option>
              <option value="experience">Sort by Experience</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredInstructors.length} of {instructors.length} instructors
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredInstructors.map(instructor => (
            <div key={instructor.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
              {/* Photo Section */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-400 to-blue-500 p-8 cursor-pointer" title={instructor.name} >
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {instructor.experience} exp
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                  <p className="text-green-400 font-medium">{instructor.title}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="font-bold">{instructor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="text-gray-400" size={16} />
                      <span className="font-bold">{(instructor.students / 1000).toFixed(1)}k</span>
                    </div>
                    <p className="text-xs text-gray-400">Students</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="text-gray-400" size={16} />
                      <span className="font-bold">{instructor.courses}</span>
                    </div>
                    <p className="text-xs text-gray-400">Courses</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {instructor.subjects.map(subject => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-gray-700 text-green-400 rounded-full text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {instructor.bio}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin size={16} />
                  <span>{instructor.location}</span>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Award className="text-yellow-400" size={16} />
                    Key Achievements
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {instructor.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${instructor.email}`}
                      className="p-2 bg-gray-700 hover:bg-green-600 rounded-lg transition-colors"
                      title="Email"
                    >
                      <Mail size={16} />
                    </a>
                    <a
                      href={`https://linkedin.com/in/${instructor.social.linkedin}`}
                      className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={`https://twitter.com/${instructor.social.twitter}`}
                      className="p-2 bg-gray-700 hover:bg-blue-400 rounded-lg transition-colors"
                      title="Twitter"
                    >
                      <Twitter size={16} />
                    </a>
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-white text-sm font-medium rounded-lg transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users size={64} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No instructors found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Become an Instructor?</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Join our community of expert instructors and share your knowledge with thousands of students worldwide.
          </p>
          <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Apply to Teach
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;