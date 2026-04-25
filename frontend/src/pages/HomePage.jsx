import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Header />
      <main style={{ flex: 1, padding: '24px', maxWidth: 720, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}