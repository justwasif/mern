import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header style={{padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <h3>Forum</h3>
        <NavLink to="/" end>All Posts</NavLink>
        <NavLink to="/history">My History</NavLink>
        <NavLink to="creat_post">post</NavLink>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}