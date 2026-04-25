import { useState } from 'react'

const API = 'http://localhost:4000'

export default function CreatePost({ token, onCreated }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/route/post/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create post')
      setContent('')
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: 24, padding: 16, border: '1px solid #ccc' }}>
      <h3 style={{ margin: '0 0 12px' }}>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          placeholder="Write something..."
          required
          style={{ display: 'block', width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 8 }}
        />
        {error && <p style={{ color: 'red', margin: '4px 0' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}