import './Navbar.css'

export default function Navbar({ search, onSearch, onUpload }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="brand">
          <span className="brand-name">SnapNotes</span>
        </a>

        <div className="search-wrap">
          <input
            className="search-input"
            type="search"
            placeholder="Search your notes…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label="Search notes"
          />
        </div>

        <button className="upload-btn" onClick={onUpload}>
          <span className="upload-btn-icon">+</span>
          <span className="upload-btn-label">New Note</span>
        </button>
      </div>
    </header>
  )
}