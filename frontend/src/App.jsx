import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import HomePage from './pages/HomePage'
import AllPost from './pages/AllPost'
import PostComment from './pages/PostComment'
import UserHistory from './pages/UserHistory'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route index element={<AllPost />} />
          <Route path="post/:postId" element={<PostComment />} />
          <Route path="history" element={<UserHistory />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}