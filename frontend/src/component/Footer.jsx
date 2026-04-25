export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #ccc', padding: '16px 24px', textAlign: 'center', marginTop: 'auto' }}>
      <p style={{ margin: 0, fontSize: 14 }}>Forum App &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}