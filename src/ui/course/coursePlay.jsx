import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, 
  CheckCircle, Lock, BookOpen, FileText, Download, 
  Clock, ChevronRight, ChevronDown, Star, User,
  ArrowLeft, Settings
} from 'lucide-react';
import VideoPlayer from '../../components/videoPlayer';

const CourseVideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState(0);
  const [userNotes, setUserNotes] = useState({});
  const [lessonProgress, setLessonProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // Sample course data with progress tracking
  const courseData = {
    id: 'react-complete',
    title: 'Complete React Development Course',
    instructor: 'Alex Rodriguez',
    totalLessons: 15,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React and set up your development environment',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'What is React?',
            duration: 720, // seconds
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
            description: 'Introduction to React framework and its core concepts',
            notes: [
              {
                id: 'note-1',
                title: 'React Overview',
                content: 'React is a JavaScript library for building user interfaces, particularly web applications.',
                type: 'text'
              },
              {
                id: 'note-2',
                title: 'Key Features',
                content: '• Component-based architecture\n• Virtual DOM\n• Unidirectional data flow\n• JSX syntax',
                type: 'text'
              }
            ],
            isPreview: true
          },
          {
            id: 'lesson-1-2',
            title: 'Setting up Development Environment',
            duration: 900,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
            description: 'Install Node.js, npm, and create your first React app',
            notes: [
              {
                id: 'note-3',
                title: 'Installation Steps',
                content: '1. Install Node.js\n2. Install npm or yarn\n3. Run create-react-app\n4. Start development server',
                type: 'text'
              }
            ],
            isPreview: false
          },
          {
            id: 'lesson-1-3',
            title: 'Understanding JSX',
            duration: 1080,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop',
            description: 'Learn JSX syntax and how to write components',
            notes: [
              {
                id: 'note-4',
                title: 'JSX Rules',
                content: '• JSX must return single parent element\n• Use className instead of class\n• Close all tags\n• Use camelCase for attributes',
                type: 'text'
              }
            ],
            isPreview: false
          }
        ]
      },
      {
        id: 'chapter-2',
        title: 'Components and Props',
        description: 'Deep dive into React components and how to pass data between them',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Creating Your First Component',
            duration: 960,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop',
            description: 'Learn how to create and use React components',
            notes: [
              {
                id: 'note-5',
                title: 'Component Types',
                content: 'Function Components vs Class Components\nFunction components are recommended for new projects.',
                type: 'text'
              }
            ],
            isPreview: false
          },
          {
            id: 'lesson-2-2',
            title: 'Understanding Props',
            duration: 840,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
            description: 'Learn how to pass and use props in React components',
            notes: [
              {
                id: 'note-6',
                title: 'Props Best Practices',
                content: '• Props are read-only\n• Use destructuring for cleaner code\n• Set default props when needed\n• Use PropTypes for type checking',
                type: 'text'
              }
            ],
            isPreview: false
          }
        ]
      },
      {
        id: 'chapter-3',
        title: 'State and Event Handling',
        description: 'Learn about component state and handling user interactions',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Introduction to State',
            duration: 1200,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop',
            description: 'Understanding component state and useState hook',
            notes: [
              {
                id: 'note-7',
                title: 'useState Hook',
                content: 'const [state, setState] = useState(initialValue);\nAlways use setState to update state values.',
                type: 'text'
              }
            ],
            isPreview: false
          }
        ]
      }
    ]
  };

  //disable right click
  useEffect(() => {
    const disableRightClick = (e)=> e.preventDefault();
    const disableKeys = (e)=>{
        if(
            e.ctrlKey && (
                e.key === "s" || e.key === 'u' || e.key === 'c' || e.key === 'Shift'
            )
        ){
            e.preventDefault()
        }
    };
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeys);
  
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeys);
    }
  }, [])
  

  // Initialize player and load saved progress
  useEffect(() => {
    // Load saved progress from storage
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const savedLessonProgress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    const savedCompletedLessons = new Set(JSON.parse(localStorage.getItem('completedLessons') || '[]'));
    const savedUserNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');

    setLessonProgress(savedLessonProgress);
    setCompletedLessons(savedCompletedLessons);
    setUserNotes(savedUserNotes);

    // Load first lesson
    if (courseData.chapters[0].lessons[0]) {
      setCurrentLesson(courseData.chapters[0].lessons[0]);
      setCurrentChapter(0);
      setCurrentLessonIndex(0);
    }
  }, []);

  // Initialize video player when lesson changes
  useEffect(() => {
    if (currentLesson && videoRef.current) {
      const video = videoRef.current;
      
      // Load saved progress for this lesson
      const savedTime = lessonProgress[currentLesson.id]?.currentTime || 0;
      
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        if (savedTime > 0) {
          video.currentTime = savedTime;
        }
      };

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        const total = video.duration;
        setCurrentTime(current);
        setProgress((current / total) * 100);

        // Save progress every 5 seconds
        if (Math.floor(current) % 5 === 0) {
          saveProgress(currentLesson.id, current, total);
        }

        // Mark as completed if watched 80% or more
        if ((current / total) >= 0.8 && !completedLessons.has(currentLesson.id)) {
          markLessonComplete(currentLesson.id);
        }
      };

      const handleEnded = () => {
        markLessonComplete(currentLesson.id);
        setIsPlaying(false);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentLesson, lessonProgress, completedLessons]);

  // Save lesson progress
  const saveProgress = (lessonId, currentTime, duration) => {
    const progress = {
      ...lessonProgress,
      [lessonId]: {
        currentTime,
        duration,
        progress: (currentTime / duration) * 100,
        lastWatched: new Date().toISOString()
      }
    };
    setLessonProgress(progress);
    localStorage.setItem('lessonProgress', JSON.stringify(progress));
  };

  // Mark lesson as complete
  const markLessonComplete = (lessonId) => {
    const updated = new Set([...completedLessons, lessonId]);
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify([...updated]));
  };

  // Check if lesson is unlocked
  const isLessonUnlocked = (chapterIndex, lessonIndex) => {
    if (chapterIndex === 0 && lessonIndex === 0) return true; // First lesson always unlocked
    
    const currentChapterLessons = courseData.chapters[chapterIndex].lessons;
    
    if (lessonIndex === 0) {
      // First lesson of chapter - check if previous chapter is 80% complete
      if (chapterIndex === 0) return true;
      const prevChapter = courseData.chapters[chapterIndex - 1];
      const completedInPrevChapter = prevChapter.lessons.filter(lesson => 
        completedLessons.has(lesson.id)
      ).length;
      return completedInPrevChapter >= Math.ceil(prevChapter.lessons.length * 0.8);
    } else {
      // Check if previous lesson is completed
      const prevLesson = currentChapterLessons[lessonIndex - 1];
      return completedLessons.has(prevLesson.id) || prevLesson.isPreview;
    }
  };

  // Play/Pause functionality
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Seek functionality
  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const time = percent * duration;
      videoRef.current.currentTime = time;
    }
  };

  // Volume control
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Change playback speed
  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Load lesson
  const loadLesson = (chapterIndex, lessonIndex) => {
    if (!isLessonUnlocked(chapterIndex, lessonIndex)) return;

    const lesson = courseData.chapters[chapterIndex].lessons[lessonIndex];
    setCurrentLesson(lesson);
    setCurrentChapter(chapterIndex);
    setCurrentLessonIndex(lessonIndex);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Add user note
  const addUserNote = (timestamp, note) => {
    const noteId = `user-note-${Date.now()}`;
    const newNote = {
      id: noteId,
      lessonId: currentLesson.id,
      timestamp,
      content: note,
      createdAt: new Date().toISOString()
    };

    const updatedNotes = {
      ...userNotes,
      [currentLesson.id]: [...(userNotes[currentLesson.id] || []), newNote]
    };

    setUserNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get lesson completion percentage
  const getLessonCompletionPercent = (lessonId) => {
    return lessonProgress[lessonId]?.progress || 0;
  };

  const enterFullScreen = ()=>{
    if(videoRef.current?.requestFullscreen){
        videoRef.current.requestFullscreen();
    }else if(videoRef.current.webkitRequestFullscreen){
        videoRef.current.requestFullscreen()
    }
  }

  if (!currentLesson) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      Loading...
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="lg:w-2/3 bg-black">
          {/* Course Header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold">{courseData.title}</h1>
                <p className="text-sm text-gray-400">by {courseData.instructor}</p>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black" onClick={togglePlay} style={{ paddingBottom: '56.25%', height: 0 }}>
            <video
              ref={videoRef}
              src={currentLesson.videoUrl}
              poster={currentLesson.thumbnail}
              className="absolute top-0 left-0 w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls={false}
              controlsList='nodownload '
            />

            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-blue-600 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-blue-500 cursor-pointer">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-blue-500 cursor-pointer">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 accent-blue-600"
                    />
                  </div>

                  <span className="text-sm text-gray-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Control */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-gray-800 text-white text-sm rounded px-2 py-1 cursor-pointer"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={1.75}>1.75x</option>
                    <option value={2}>2x</option>
                  </select>

                  <button 
                    onClick={enterFullScreen}
                    className="text-white hover:text-blue-500 cursor-pointer"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
                <p className="text-gray-400">{currentLesson.description}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">{formatTime(currentLesson.duration)}</span>
                </div>
                
                {completedLessons.has(currentLesson.id) && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Your Progress</span>
                <span>{Math.round(getLessonCompletionPercent(currentLesson.id))}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getLessonCompletionPercent(currentLesson.id)}%` }}
                ></div>
              </div>
            </div>

            {/* Notes Toggle */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>

            {/* Notes Section */}
            {showNotes && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Lesson Notes</h3>
                
                {/* Lesson Notes */}
                <div className="space-y-4">
                  {currentLesson.notes.map(note => (
                    <div key={note.id} className="bg-gray-600 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{note.title}</h4>
                      <p className="text-gray-300 whitespace-pre-line">{note.content}</p>
                    </div>
                  ))}
                </div>

                {/* User Notes */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Your Notes</h4>
                  <div className="space-y-3">
                    {(userNotes[currentLesson.id] || []).map(note => (
                      <div key={note.id} className="bg-blue-900/20 border border-blue-700 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-blue-400">
                            At {formatTime(note.timestamp)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Note */}
                  <div className="mt-4">
                    <textarea
                      placeholder="Add a note at current time..."
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows="3"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) {
                          addUserNote(currentTime, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1">Press Ctrl+Enter to save note</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="lg:w-1/3 bg-gray-800 border-l border-gray-700">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Course Content</h3>
            
            <div className="space-y-4">
              {courseData.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id} className="border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setExpandedChapter(
                      expandedChapter === chapterIndex ? null : chapterIndex
                    )}
                    className="w-full p-4 cursor-pointer text-left flex items-center justify-between hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold">{chapter.title}</h4>
                      <p className="text-sm text-gray-400">{chapter.lessons.length} lessons</p>
                    </div>
                    {expandedChapter === chapterIndex ? 
                      <ChevronDown size={20} /> : <ChevronRight size={20} />
                    }
                  </button>

                  {expandedChapter === chapterIndex && (
                    <div className="border-t border-gray-600">
                      {chapter.lessons.map((lesson, lessonIndex) => {
                        const isUnlocked = isLessonUnlocked(chapterIndex, lessonIndex);
                        const isCompleted = completedLessons.has(lesson.id);
                        const isCurrent = currentLesson.id === lesson.id;
                        const progressPercent = getLessonCompletionPercent(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => loadLesson(chapterIndex, lessonIndex)}
                            disabled={!isUnlocked}
                            className={`w-full p-4 text-left flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                              isCurrent ? 'bg-blue-900/30 border-l-4 border-blue-500' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {!isUnlocked ? (
                                <Lock size={16} className="text-gray-500" />
                              ) : isCompleted ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : isCurrent ? (
                                <Play size={16} className="text-blue-500" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-500 rounded"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{lesson.title}</h5>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <span>{formatTime(lesson.duration)}</span>
                                {lesson.isPreview && (
                                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-full">
                                    Preview
                                  </span>
                                )}
                              </div>
                              
                              {/* Progress Bar for Lesson */}
                              {progressPercent > 0 && (
                                <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                                  <div 
                                    className="bg-green-500 h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Course Progress Summary */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-3">Your Progress</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Completed Lessons</span>
                  <span className="text-green-400">
                    {completedLessons.size} / {courseData.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(completedLessons.size / courseData.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;