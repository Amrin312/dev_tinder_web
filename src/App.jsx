import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
const Body = React.lazy(() => import("./components/Body"))
const Login = React.lazy(() => import("./components/Login"))
const Profile = React.lazy(() => import("./components/Profile"))
const Feed = React.lazy(() => import("./components/Feed"))
const Connections = React.lazy(() => import("./components/Connections"))
const Requests = React.lazy(() => import("./components/Requests"))
const Home = React.lazy(() => import("./pages/Home"))
import toast, { Toaster } from 'react-hot-toast'
import CardSkeleton from "./skeleton/CardSkeleton"
import RequestSkeleton from "./skeleton/RequestSkeleton"


function App() {
  
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />

      <Provider store={appStore}>
        <BrowserRouter basename="/">

          <Routes>
            <Route path="/" element={<Body />}>

              <Route index element={<Home />} />
              <Route path="/login" element={<Suspense fallback={<CardSkeleton />}><Login /></Suspense>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Suspense fallback={<CardSkeleton />}><Feed /></Suspense>} />
              <Route path="/connections" element={<Suspense fallback={<RequestSkeleton  />}><Connections /></Suspense>} />
              <Route path="/requests" element={<Suspense fallback={<RequestSkeleton />}><Requests /></Suspense>} />

            </Route>
          </Routes>
          
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

