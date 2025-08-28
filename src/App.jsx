import { BrowserRouter, createBrowserRouter, Outlet, Router, RouterProvider, useLocation } from 'react-router-dom'
import './App.css'
import Login from './ui/auth/login'
import Register from './ui/auth/register'
import Navbar from './ui/nav/navbar'
import CoursePage from './ui/course/coursePage'
import Home from './ui/home'
import Footer from './ui/nav/footer'
import SingleCoursePage from './ui/course/singleCoursepage'

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
