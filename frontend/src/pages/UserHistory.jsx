import { useEffect, useState } from 'react'

const API = 'http://localhost:4000'

export default function UserHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API}/route/userhistory/history`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load history')
        setHistory(data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [token])

  if (loading) return <p>Loading history...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>My Activity History</h2>
      {history.length === 0 && <p>No activity yet.</p>}
      {history.map(item => (
        <div key={item._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                padding: '2px 8px',
                background: item.action === 'CREATE_COMMENT' ? '#d4edda' : '#f8d7da',
                color: item.action === 'CREATE_COMMENT' ? '#155724' : '#721c24',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              {item.action}
            </span>
            <small style={{ color: '#666' }}>{new Date(item.createdAt).toLocaleString()}</small>
          </div>
          {item.comment_id && !item.comment_id.is_deleted && (
            <p style={{ margin: '8px 0 0', fontSize: 14 }}>
              Comment: &quot;{item.comment_id.content}&quot;
            </p>
          )}
          {item.comment_id?.is_deleted && (
            <p style={{ margin: '8px 0 0', fontSize: 14, color: '#999' }}>[Comment deleted]</p>
          )}
          {item.post_id && (
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>
              Post: {item.post_id.title || item.post_id._id}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}