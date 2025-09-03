import React, { useState } from 'react';
import { 
  Upload, Plus, Trash2, Edit3, Save, Eye, Play, FileText, Image, 
  Video, BookOpen, Clock, Users, DollarSign, Tag, ChevronDown, 
  ChevronRight, X, Check, AlertCircle, Camera, File
} from 'lucide-react';

const CourseUploadPage = () => {
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [loading, setLoading] = useState(false)
  // Course basic information
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: 'Beginner',
    language: 'English',
    price: '',
    thumbnail: null,
    tags: [],
    requirements: [],
    objectives: [],
    targetAudience: ''
  });

  // Course chapters and lessons
  const [chapters, setChapters] = useState([]);
  
  // Available categories and levels
  const categories = [
    'Programming', 'Web Development', 'Data Science', 'Machine Learning', 
    'Design', 'Business', 'Marketing', 'Photography', 'Music', 'Languages', 'Other'
  ];
  
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // Add new chapter
  const addChapter = () => {
    const newChapter = {
      id: `chapter_${Date.now()}`,
      title: '',
      description: '',
      order: chapters.length + 1,
      lessons: [],
      notes: []
    };
    setChapters([...chapters, newChapter]);
    setExpandedChapter(newChapter.id);
  };

  // Update chapter
  const updateChapter = (chapterId, updates) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId ? { ...chapter, ...updates } : chapter
    ));
  };

  // Delete chapter
  const deleteChapter = (chapterId) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
  };

  // Add lesson to chapter
  const addLesson = (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId);
    const newLesson = {
      id: `lesson_${Date.now()}`,
      title: '',
      description: '',
      duration: '',
      videoUrl: '',
      videoThumbnail: null,
      order: chapter.lessons.length + 1,
      notes: [],
      resources: [],
      isPreview: true
    };
    
    updateChapter(chapterId, {
      lessons: [...chapter.lessons, newLesson]
    });
    setExpandedLesson(newLesson.id);
  };

  // Update lesson
  const updateLesson = (chapterId, lessonId, updates) => {
    const chapter = chapters.find(c => c.id === chapterId);
    const updatedLessons = chapter.lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );
    updateChapter(chapterId, { lessons: updatedLessons });
  };

  // Delete lesson
  const deleteLesson = (chapterId, lessonId) => {
    const chapter = chapters.find(c => c.id === chapterId);
    const updatedLessons = chapter.lessons.filter(lesson => lesson.id !== lessonId);
    updateChapter(chapterId, { lessons: updatedLessons });
  };

  // Add note to chapter or lesson
  const addNote = (chapterId, lessonId = null) => {
    const noteData = {
      id: `note_${Date.now()}`,
      type: 'pdf', // pdf, image, text
      title: '',
      file: null,
      content: '',
      order: 1
    };

    if (lessonId) {
      // Add note to lesson
      const chapter = chapters.find(c => c.id === chapterId);
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      const updatedNotes = [...lesson.notes, noteData];
      updateLesson(chapterId, lessonId, { notes: updatedNotes });
    } else {
      // Add note to chapter
      const chapter = chapters.find(c => c.id === chapterId);
      const updatedNotes = [...chapter.notes, noteData];
      updateChapter(chapterId, { notes: updatedNotes });
    }
  };

  // Handle file upload
  const handleFileUpload = (file, type = 'image') => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          file: file,
          url: e.target.result,
          name: file.name,
          size: file.size,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle course thumbnail upload
  const handleCourseThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileData = await handleFileUpload(file);
      setCourseData({ ...courseData, thumbnail: fileData });
    }
  };

  // Handle lesson video upload
  const handleVideoUpload = async (e, chapterId, lessonId) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const fileData = await handleFileUpload(file, 'video');
      updateLesson(chapterId, lessonId, { 
        videoUrl: fileData.url,
        videoFile: fileData 
      });
    }
  };

  // Handle lesson thumbnail upload
  const handleLessonThumbnailUpload = async (e, chapterId, lessonId) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileData = await handleFileUpload(file);
      updateLesson(chapterId, lessonId, { videoThumbnail: fileData });
    }
  };

  // Handle note file upload
  const handleNoteFileUpload = async (e, chapterId, lessonId, noteId) => {
    const file = e.target.files[0];
    if (file) {
      const fileData = await handleFileUpload(file);
      
      if (lessonId) {
        const chapter = chapters.find(c => c.id === chapterId);
        const lesson = chapter.lessons.find(l => l.id === lessonId);
        const updatedNotes = lesson.notes.map(note =>
          note.id === noteId ? { ...note, file: fileData, type: file.type.startsWith('image/') ? 'image' : 'pdf' } : note
        );
        updateLesson(chapterId, lessonId, { notes: updatedNotes });
      } else {
        const chapter = chapters.find(c => c.id === chapterId);
        const updatedNotes = chapter.notes.map(note =>
          note.id === noteId ? { ...note, file: fileData, type: file.type.startsWith('image/') ? 'image' : 'pdf' } : note
        );
        updateChapter(chapterId, { notes: updatedNotes });
      }
    }
  };

  // Add tag
  const addTag = (tag) => {
    if (tag && !courseData.tags.includes(tag)) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, tag]
      });
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Calculate totals
  const getTotalLessons = () => {
    return chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  };

  const getTotalDuration = () => {
    let total = 0;
    chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        if (lesson.duration) {
          const minutes = parseInt(lesson.duration) || 0;
          total += minutes;
        }
      });
    });
    return Math.floor(total / 60) + 'h ' + (total % 60) + 'm';
  };

  // Validate course data
  const validateCourse = () => {
    const errors = [];
    
    if (!courseData.title) errors.push('Course title is required');
    if (!courseData.description) errors.push('Course description is required');
    if (!courseData.category) errors.push('Course category is required');
    if (!courseData.thumbnail) errors.push('Course thumbnail is required');
    if (chapters.length === 0) errors.push('At least one chapter is required');
    
    chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.title) errors.push(`Chapter ${chapterIndex + 1} title is required`);
      if (chapter.lessons.length === 0) errors.push(`Chapter ${chapterIndex + 1} must have at least one lesson`);
      
      chapter.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.title) errors.push(`Lesson ${lessonIndex + 1} in Chapter ${chapterIndex + 1} title is required`);
        if (!lesson.videoUrl && !lesson.videoFile) errors.push(`Lesson ${lessonIndex + 1} in Chapter ${chapterIndex + 1} must have a video`);
      });
    });


    
    return errors;
  };

  // Handle course upload
  const handleUpload = () => {
      const errors = validateCourse();
      
      if (errors.length > 0) {
          console.log('Validation Errors:', errors);
        //   alert('Please fix the following errors:\n' + errors.join('\n'));
          return;
        }
        
        setLoading(true)
   

    // Create the complete course object
    const completeCourse = {
      // Basic course information
      courseInfo: {
        id: `course_${Date.now()}`,
        title: courseData.title,
        subtitle: courseData.subtitle,
        description: courseData.description,
        category: courseData.category,
        level: courseData.level,
        language: courseData.language,
        price: parseFloat(courseData.price) || 0,
        thumbnail: courseData.thumbnail,
        tags: courseData.tags,
        requirements: courseData.requirements,
        objectives: courseData.objectives,
        targetAudience: courseData.targetAudience,
        createdAt: new Date().toISOString(),
        status: 'draft'
      },
      
      // Course statistics
      statistics: {
        totalChapters: chapters.length,
        totalLessons: getTotalLessons(),
        totalDuration: getTotalDuration(),
        totalNotes: chapters.reduce((total, chapter) => 
          total + chapter.notes.length + chapter.lessons.reduce((lessonTotal, lesson) => 
            lessonTotal + lesson.notes.length, 0), 0)
      },
      
      // Course content
      chapters: chapters.map((chapter, chapterIndex) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        order: chapterIndex + 1,
        
        // Chapter notes
        notes: chapter.notes.map((note, noteIndex) => ({
          id: note.id,
          title: note.title,
          type: note.type,
          file: note.file,
          content: note.content,
          order: noteIndex + 1
        })),
        
        // Chapter lessons
        lessons: chapter.lessons.map((lesson, lessonIndex) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          videoUrl: lesson.videoUrl,
          videoFile: lesson.videoFile,
          videoThumbnail: lesson.videoThumbnail,
          order: lessonIndex + 1,
          isPreview: lesson.isPreview,
          
          // Lesson notes
          notes: lesson.notes.map((note, noteIndex) => ({
            id: note.id,
            title: note.title,
            type: note.type,
            file: note.file,
            content: note.content,
            order: noteIndex + 1
          })),
          
          // Lesson resources
          resources: lesson.resources || []
        }))
      }))
    };

    setLoading(false)

    console.log('=== COMPLETE COURSE DATA ===');
    console.log(completeCourse);
    
    // Show success message
    // alert('Course uploaded successfully! Check console for complete data structure.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Create New Course</h1>
              <p className="text-gray-300">Build and upload your course content with chapters and lessons</p>
            </div>
            
            {/* <div className="flex items-center gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Eye size={18} />
                Preview
              </button>
              <button 
                onClick={handleUpload}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Upload size={18} />
                Upload Course
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Overview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
              <h3 className="text-lg font-bold mb-4">Course Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Total Chapters</p>
                  <p className="text-xl font-bold text-green-400">{chapters.length}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Total Lessons</p>
                  <p className="text-xl font-bold text-blue-400">{getTotalLessons()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Total Duration</p>
                  <p className="text-xl font-bold text-purple-400">{getTotalDuration()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-xl font-bold text-yellow-400">${courseData.price || '0'}</p>
                </div>
              </div>

              {/* Course Progress */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="font-medium mb-3">Course Completion</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${courseData.title ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <span>Basic Information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${courseData.thumbnail ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <span>Course Thumbnail</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${chapters.length > 0 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <span>Course Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Basic Course Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen size={24} />
                Course Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Course Title *</label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    placeholder="Enter course title"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Course Subtitle</label>
                  <input
                    type="text"
                    value={courseData.subtitle}
                    onChange={(e) => setCourseData({...courseData, subtitle: e.target.value})}
                    placeholder="Brief description of your course"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={courseData.level}
                    onChange={(e) => setCourseData({...courseData, level: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={courseData.language}
                    onChange={(e) => setCourseData({...courseData, language: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Hinlish">Hinlish</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Course Description *</label>
                  <textarea
                    rows="4"
                    value={courseData.description}
                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    placeholder="Describe what students will learn in this course"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Image size={20} />
                Course Thumbnail *
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCourseThumbnailUpload}
                      className="hidden"
                      id="course-thumbnail"
                    />
                    <label htmlFor="course-thumbnail" className="cursor-pointer">
                      <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">Upload Course Thumbnail</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 5MB. Recommended: 1280x720</p>
                    </label>
                  </div>
                </div>
                
                {courseData.thumbnail && (
                  <div className="flex-1">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <img
                        src={courseData.thumbnail.url}
                        alt="Course thumbnail"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <p className="text-sm text-gray-400">{courseData.thumbnail.name}</p>
                      <button
                        onClick={() => setCourseData({...courseData, thumbnail: null})}
                        className="text-red-400 hover:text-red-300 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content - Chapters */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Video size={20} />
                  Course Content
                </h3>
                <button
                  onClick={addChapter}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Chapter
                </button>
              </div>

              {chapters.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">No chapters yet</p>
                  <p className="text-gray-400 mb-4">Start building your course by adding the first chapter</p>
                  <button
                    onClick={addChapter}
                    className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add First Chapter
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="bg-gray-700 rounded-lg border border-gray-600">
                      {/* Chapter Header */}
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => setExpandedChapter(
                                expandedChapter === chapter.id ? null : chapter.id
                              )}
                              className="text-gray-400 cursor-pointer hover:text-white"
                            >
                              {expandedChapter === chapter.id ? 
                                <ChevronDown size={20} /> : <ChevronRight size={20} />
                              }
                            </button>
                            
                            <div className="flex-1">
                              <input
                                type="text"
                                value={chapter.title}
                                onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                                placeholder={`Chapter ${chapterIndex + 1} Title`}
                                className="w-full bg-transparent text-lg font-medium focus:outline-none focus:bg-gray-600 px-2 py-1 rounded"
                              />
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>{chapter.lessons.length} lessons</span>
                              <span>•</span>
                              <span>{chapter.notes.length} notes</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addLesson(chapter.id)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 cursor-pointer rounded text-sm transition-colors"
                            >
                              Add Lesson
                            </button>
                            <button
                              onClick={() => deleteChapter(chapter.id)}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {expandedChapter === chapter.id && (
                          <div className="mt-4">
                            <textarea
                              rows="2"
                              value={chapter.description}
                              onChange={(e) => updateChapter(chapter.id, { description: e.target.value })}
                              placeholder="Chapter description"
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                            {/* Chapter Notes */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">Chapter Notes</h4>
                                <button
                                  onClick={() => addNote(chapter.id)}
                                  className="bg-gray-600 hover:bg-gray-500 px-2 py-1 cursor-pointer rounded text-xs transition-colors flex items-center gap-1"
                                >
                                  <Plus size={12} />
                                  Add Note
                                </button>
                              </div>
                              
                              {chapter.notes.map((note, noteIndex) => (
                                <div key={note.id} className="bg-gray-600 rounded p-3 mb-2">
                                  <div className="flex items-center justify-between mb-2">
                                    <input
                                      type="text"
                                      value={note.title}
                                      onChange={(e) => {
                                        const updatedNotes = chapter.notes.map(n =>
                                          n.id === note.id ? { ...n, title: e.target.value } : n
                                        );
                                        updateChapter(chapter.id, { notes: updatedNotes });
                                      }}
                                      placeholder="Note title"
                                      className="flex-1 bg-transparent text-sm font-medium focus:outline-none"
                                    />
                                    <button
                                      onClick={() => {
                                        const updatedNotes = chapter.notes.filter(n => n.id !== note.id);
                                        updateChapter(chapter.id, { notes: updatedNotes });
                                      }}
                                      className="text-red-400 hover:text-red-300 cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => handleNoteFileUpload(e, chapter.id, null, note.id)}
                                      className="hidden"
                                      id={`chapter-note-${note.id}`}
                                    />
                                    <label
                                      htmlFor={`chapter-note-${note.id}`}
                                      className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs cursor-pointer transition-colors flex items-center gap-1"
                                    >
                                      <File size={12} />
                                      Upload File
                                    </label>
                                    {note.file && (
                                      <span className="text-xs text-green-400">{note.file.name}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chapter Lessons */}
                      {expandedChapter === chapter.id && chapter.lessons.length > 0 && (
                        <div className="border-t border-gray-600">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="p-4 border-b border-gray-600 last:border-b-0">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3 flex-1">
                                  <button
                                    onClick={() => setExpandedLesson(
                                      expandedLesson === lesson.id ? null : lesson.id
                                    )}
                                    className="text-gray-400 hover:text-white cursor-pointer"
                                  >
                                    {expandedLesson === lesson.id ? 
                                      <ChevronDown size={18} /> : <ChevronRight size={18} />
                                    }
                                  </button>
                                  
                                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                    Lesson {lessonIndex + 1}
                                  </div>
                                  
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(chapter.id, lesson.id, { title: e.target.value })}
                                    placeholder="Lesson title"
                                    className="flex-1 bg-transparent font-medium focus:outline-none focus:bg-gray-600 px-2 py-1 rounded"
                                  />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <label className="flex items-center gap-1 text-sm">
                                    <input
                                      type="checkbox"
                                      checked={lesson.isPreview}
                                      onChange={(e) => updateLesson(chapter.id, lesson.id, { isPreview: e.target.checked })}
                                      className="rounded"
                                    />
                                    <span className="text-xs text-gray-400">Preview</span>
                                  </label>
                                  
                                  <button
                                    onClick={() => deleteLesson(chapter.id, lesson.id)}
                                    className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {expandedLesson === lesson.id && (
                                <div className="bg-gray-600 rounded-lg p-4 space-y-4">
                                  {/* Lesson Details */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                                      <input
                                        type="number"
                                        value={lesson.duration}
                                        onChange={(e) => updateLesson(chapter.id, lesson.id, { duration: e.target.value })}
                                        placeholder="0"
                                        min="0"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                      <label className="block text-sm font-medium mb-2">Lesson Description</label>
                                      <textarea
                                        rows="2"
                                        value={lesson.description}
                                        onChange={(e) => updateLesson(chapter.id, lesson.id, { description: e.target.value })}
                                        placeholder="What will students learn in this lesson?"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                    </div>
                                  </div>

                                  {/* Video Upload */}
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Lesson Video *</label>
                                    <div className="flex flex-col md:flex-row gap-4">
                                      <div className="flex-1">
                                        <div className="border-2 border-dashed border-gray-500 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                          <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleVideoUpload(e, chapter.id, lesson.id)}
                                            className="hidden"
                                            id={`video-${lesson.id}`}
                                          />
                                          <label htmlFor={`video-${lesson.id}`} className="cursor-pointer">
                                            <Video size={32} className="mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm font-medium">Upload Video</p>
                                            <p className="text-xs text-gray-400">MP4, MOV, AVI up to 500MB</p>
                                          </label>
                                        </div>
                                        
                                        {lesson.videoFile && (
                                          <div className="mt-2">
                                            <p className="text-sm text-green-400">{lesson.videoFile.name}</p>
                                            <p className="text-xs text-gray-400">{(lesson.videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Video Thumbnail */}
                                      <div className="flex-1">
                                        <div className="border-2 border-dashed border-gray-500 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleLessonThumbnailUpload(e, chapter.id, lesson.id)}
                                            className="hidden"
                                            id={`thumbnail-${lesson.id}`}
                                          />
                                          <label htmlFor={`thumbnail-${lesson.id}`} className="cursor-pointer">
                                            <Image size={32} className="mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm font-medium">Video Thumbnail</p>
                                            <p className="text-xs text-gray-400">Optional custom thumbnail</p>
                                          </label>
                                        </div>
                                        
                                        {lesson.videoThumbnail && (
                                          <div className="mt-2">
                                            <img
                                              src={lesson.videoThumbnail.url}
                                              alt="Video thumbnail"
                                              className="w-full h-20 object-cover rounded"
                                            />
                                            <p className="text-xs text-green-400 mt-1">{lesson.videoThumbnail.name}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Lesson Notes */}
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <h5 className="font-medium text-sm">Lesson Notes & Resources</h5>
                                      <button
                                        onClick={() => addNote(chapter.id, lesson.id)}
                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 cursor-pointer rounded text-xs transition-colors flex items-center gap-1"
                                      >
                                        <Plus size={12} />
                                        Add Note
                                      </button>
                                    </div>
                                    
                                    {lesson.notes.map((note, noteIndex) => (
                                      <div key={note.id} className="bg-gray-700 rounded p-3 mb-2">
                                        <div className="flex items-center justify-between mb-2">
                                          <input
                                            type="text"
                                            value={note.title}
                                            onChange={(e) => {
                                              const updatedNotes = lesson.notes.map(n =>
                                                n.id === note.id ? { ...n, title: e.target.value } : n
                                              );
                                              updateLesson(chapter.id, lesson.id, { notes: updatedNotes });
                                            }}
                                            placeholder="Note title"
                                            className="flex-1 bg-transparent text-sm font-medium focus:outline-none"
                                          />
                                          <button
                                            onClick={() => {
                                              const updatedNotes = lesson.notes.filter(n => n.id !== note.id);
                                              updateLesson(chapter.id, lesson.id, { notes: updatedNotes });
                                            }}
                                            className="text-red-400 cursor-pointer hover:text-red-300"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            onChange={(e) => handleNoteFileUpload(e, chapter.id, lesson.id, note.id)}
                                            className="hidden"
                                            id={`lesson-note-${note.id}`}
                                          />
                                          <label
                                            htmlFor={`lesson-note-${note.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs cursor-pointer transition-colors flex items-center gap-1"
                                          >
                                            <File size={12} />
                                            Upload File
                                          </label>
                                          {note.file && (
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs text-blue-400">{note.file.name}</span>
                                              <span className="text-xs text-gray-400">({note.file.type})</span>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Text Content for Notes */}
                                        <div className="mt-2">
                                          <textarea
                                            rows="2"
                                            value={note.content}
                                            onChange={(e) => {
                                              const updatedNotes = lesson.notes.map(n =>
                                                n.id === note.id ? { ...n, content: e.target.value } : n
                                              );
                                              updateLesson(chapter.id, lesson.id, { notes: updatedNotes });
                                            }}
                                            placeholder="Additional note content (optional)"
                                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    
                                    {lesson.notes.length === 0 && (
                                      <p className="text-xs text-gray-400 italic">No notes added yet. Click "Add Note" to include supplementary materials.</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Empty Lessons State */}
                      {expandedChapter === chapter.id && chapter.lessons.length === 0 && (
                        <div className="p-6 text-center border-t border-gray-600">
                          <Play size={32} className="mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium mb-1">No lessons in this chapter</p>
                          <p className="text-xs text-gray-400 mb-3">Add your first lesson to get started</p>
                          <button
                            onClick={() => addLesson(chapter.id)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors cursor-pointer"
                          >
                            Add First Lesson
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Course Tags and Additional Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag size={20} />
                Additional Information
              </h3>
              
              <div className="space-y-6">
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">Course Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {courseData.tags.map(tag => (
                      <span key={tag} className="bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-300 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a tag"
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addTag(e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        addTag(input.value.trim());
                        input.value = '';
                      }}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Course Requirements */}
                <div>
                  <label className="block text-sm font-medium mb-2">Course Requirements</label>
                  <textarea
                    rows="3"
                    value={courseData.requirements.join('\n')}
                    onChange={(e) => setCourseData({
                      ...courseData, 
                      requirements: e.target.value.split('\n')
                    })}
                    placeholder="Enter each requirement on a new line"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium mb-2">Learning Objectives</label>
                  <textarea
                    rows="4"
                    value={courseData.objectives.join('\n')}
                    onChange={(e) => setCourseData({
                      ...courseData, 
                      objectives: e.target.value.split('\n')
                    })}
                    placeholder="Enter each learning objective on a new line"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <textarea
                    rows="3"
                    value={courseData.targetAudience}
                    onChange={(e) => setCourseData({...courseData, targetAudience: e.target.value})}
                    placeholder="Who is this course for?"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Final Upload Section */}
            <div className="bg-gradient-to-r from-green-800 to-blue-800 rounded-xl p-6 border border-green-600">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Upload?</h3>
                  <p className="text-gray-200">
                    Review your course content and upload it to make it available to students.
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Check size={16} className="text-green-400" />
                      <span>{chapters.length} Chapters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check size={16} className="text-green-400" />
                      <span>{getTotalLessons()} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check size={16} className="text-green-400" />
                      <span>{getTotalDuration()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 cursor-pointer rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Save size={18} />
                    Save Draft
                  </button>
                  <button 
                    onClick={handleUpload}
                    className="bg-white text-gray-900 hover:bg-gray-100 cursor-pointer px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    {
                        loading ? "Uploading...." : (
                            <>
                             <Upload size={18} />
                            Upload Course
                            </>
                        )
                    }
                   
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseUploadPage;