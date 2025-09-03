import { BrowserRouter, createBrowserRouter, Outlet, Router, RouterProvider, useLocation } from 'react-router-dom'
import Login from './ui/auth/login'
import Register from './ui/auth/register'
import Navbar from './ui/nav/navbar'
import CoursePage from './ui/course/coursePage'
import Home from './ui/home'
import Footer from './ui/nav/footer'
import SingleCoursePage from './ui/course/singleCoursepage'
import InstructorsPage from './ui/instructor/iinstructorPage'
import WishlistPage from './ui/wishlist/wishlist'
import UserProfilePage from './ui/user/userProfile'
import CourseUploadPage from './ui/course/courseUpload'
import CourseVideoPlayer from './ui/course/coursePlay'

const HomePage = ()=>{
  const navigate = useLocation()
  return (
    <>
     <Navbar/>
    {
      navigate.pathname === "/" ? <Home/> : <Outlet/>
    }
    <Footer/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>,
    children:[{
      path:"/auth",
      element:<Login/>
    },
    {
      path:"/course",
      element:<CoursePage/>,
    },
    {
      path:"/course/:id",
      element:<SingleCoursePage/>
    },
    {
      path:"/instructor",
      element:<InstructorsPage/>
    },
    {
      path:"/wishlist",
      element:<WishlistPage/>
    },
    {
      path:"/user",
      element:<UserProfilePage/>
    },
    {
      path:"/course/upload",
      element:<CourseUploadPage/>
    },
    {
      path:"/course/play",
      element:<CourseVideoPlayer/>
    }   
  ]
  },
  
  
])
function App() {
  
  return(
    <RouterProvider router={router} />
  )
}

export default App
