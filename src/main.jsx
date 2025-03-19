import { StrictMode } from 'react'
import Home from './components/Home.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css';
import VideoPage from './components/videoPage.jsx'
import Login from './components/login.jsx'
import Register from './components/Register.jsx'
import Channel from './components/Channel.jsx'
import AddChannel from './components/AddChannel.jsx'
import UploadVideo from './components/uploadVideo.jsx'
import EditVideo from './components/editVideo.jsx'



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/:_id",
        element: <VideoPage/>
      },
      {
        path: "/Channel",
        element: <Channel/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/AddChannel",
    element: <AddChannel/>
  },
  {
    path: "/Channel/:channel_id/AddVideo",
    element: <UploadVideo/>
  },
  {
    path: "/video/:video_id/edit",
    element: <EditVideo/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
