import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  return (
    <header style={{ borderBottom: '1px solid #ccc', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <strong>Forum</strong>
        <NavLink to="/" end>All Posts</NavLink>
        <NavLink to="/history">My History</NavLink>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span>Hi, <strong>{user?.username}</strong></span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}