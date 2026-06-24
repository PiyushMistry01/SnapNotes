import { useState, useRef } from 'react'
import './UploadModal.css'

export default function UploadModal({ onClose, onSave }) {
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Only image files are supported.')
      return
    }
    setError('')
    setSelectedFile(file)

const reader = new FileReader()
reader.onload = (e) => setPreview(e.target.result)
reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleSave = () => {
    if (!preview) { setError('Please select an image.'); return }
    if (!caption.trim()) { setError('Add a caption to save.'); return }
    onSave({
  image: selectedFile,
  caption: caption.trim()
})
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Add new note">
        <div className="modal-header">
          <h2 className="modal-title">New Note</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div
          className={`drop-zone ${dragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !preview && fileRef.current.click()}
        >
          {preview ? (
            <div className="preview-wrap">
              <img src={preview} alt="Preview" className="preview-image" />
              <button
                className="change-image-btn"
                onClick={e => { e.stopPropagation(); fileRef.current.click() }}
              >
                Change image
              </button>
            </div>
          ) : (
            <div className="drop-placeholder">
              <p className="drop-label">Drop an image or <span className="drop-link">browse</span></p>
              <p className="drop-hint">JPG, PNG, WEBP up to 10MB</p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="file-input-hidden"
          onChange={e => handleFile(e.target.files[0])}
        />

        <div className="caption-wrap">
          <label className="caption-label" htmlFor="caption-input">Caption</label>
          <textarea
            id="caption-input"
            className="caption-input"
            placeholder="What does this image remind you of?"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={3}
            maxLength={280}
          />
          <div className="caption-count">{caption.length}/280</div>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save note</button>
        </div>
      </div>
    </div>
  )
}