import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

const API = 'http://localhost:4000'

export default function PostComment() {
  const { postId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const post = state?.post

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const fetchComments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/route/comment/getc/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load comments')
      setComments(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchComments() }, [postId])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitError('')
    try {
      const res = await fetch(`${API}/route/comment/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ post_id: postId, content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to add comment')
      setContent('')
      fetchComments()
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      const res = await fetch(`${API}/route/comment/delete/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to delete')
      fetchComments()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/')} style={{ marginBottom: 16 }}>&larr; Back</button>

      {post && (
        <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 20 }}>
          <p style={{ margin: 0 }}>{post.content}</p>
          <small style={{ color: '#666' }}>
            By {post.user_id?.username || 'unknown'} &mdash; {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      )}

      <h3>Add Comment</h3>
      <form onSubmit={handleAddComment} style={{ marginBottom: 20 }}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          placeholder="Write a comment..."
          required
          style={{ display: 'block', width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 8 }}
        />
        {submitError && <p style={{ color: 'red', margin: '4px 0' }}>{submitError}</p>}
        <button type="submit">Add Comment</button>
      </form>

      <h3>Comments</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && comments.length === 0 && <p>No comments yet.</p>}
      {comments.map(comment => (
        <div key={comment._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px' }}>{comment.content}</p>
          <small style={{ color: '#666' }}>
            By {comment.user_id?.username || 'unknown'} &mdash; {new Date(comment.createdAt).toLocaleString()}
          </small>
          {comment.user_id?._id === user?._id && (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => handleDelete(comment._id)} style={{ color: 'red' }}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}