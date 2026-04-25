import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatePost from '../component/CreatPost'

const API = 'http://localhost:4000'

export default function AllPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/route/post/all post`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch posts')
      setPosts(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  if (loading) return <p>Loading posts...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <CreatePost token={token} onCreated={fetchPosts} />
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <div
          key={post._id}
          style={{ border: '1px solid #ccc', padding: 16, marginBottom: 12, cursor: 'pointer' }}
          onClick={() => navigate(`/post/${post._id}`, { state: { post } })}
        >
          <p style={{ margin: '0 0 8px' }}>{post.content}</p>
          <small style={{ color: '#666' }}>
            By {post.ownerId?.username || 'unknown'} &mdash; {new Date(post.createdAt).toLocaleString()}
          </small>
          <div style={{ marginTop: 8 }}>
            <button onClick={e => { e.stopPropagation(); navigate(`/post/${post._id}`, { state: { post } }) }}>
              View Comments
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}