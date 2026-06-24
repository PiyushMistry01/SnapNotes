import { useState } from 'react'
import './NoteCard.css'

export default function NoteCard({ note, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [editedCaption, setEditedCaption] = useState(note.caption)

  const handleSave = () => {
    onEdit(note._id, editedCaption)
    setIsEditing(false)
  }

  return (
    <>
      <article
        className="note-card"
        style={{ '--rotation': `${note.rotation}deg` }}
        aria-label={`Note: ${note.caption}`}
      >
        <div
          className="note-image-wrap"
          onClick={() => setIsZoomed(true)}
        >
          <img
  src={`http://localhost:5000${note.imageUrl}`}
  alt={note.caption}
  className="note-image"
/>
          <div className="note-image-overlay">
            <span className="zoom-hint">View</span>
          </div>
        </div>

        <div className="note-body">
          <p className="note-caption">{note.caption}</p>

          <div className="note-footer">
            <span className="note-date">{note.date}</span>

            {!confirmDelete ? (
              <button
                className="note-delete-btn"
                onClick={() => setConfirmDelete(true)}
                aria-label="Delete note"
              >
                🗑
              </button>
            ) : (
              <div className="note-confirm-delete">
                <button
                  className="btn-danger"
                  onClick={() => onDelete(note._id)}
                >
                  Delete
                </button>

                <button
                  className="btn-cancel1"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      {isZoomed && (
        <div
          className="note-zoom-overlay"
          onClick={() => {
            setIsZoomed(false)
            setIsEditing(false)
          }}
        >
          <div
            className="note-zoom-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
  src={`http://localhost:5000${note.imageUrl}`}
  alt={note.caption}
  className="note-image"
/>

            {isEditing ? (
              <>
                <textarea
                  className="edit-caption-input"
                  value={editedCaption}
                  onChange={(e) =>
                    setEditedCaption(e.target.value)
                  }
                />

                <div className="edit-actions">
                  <button
                    className="btn-save"
                    onClick={handleSave}
                  >
                    Save
                  </button>

                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setEditedCaption(note.caption)
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="note-zoom-caption">
                  {note.caption}
                </p>

                <div className="note-zoom-actions">
                  <button
                    className="note-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}

            <span className="note-zoom-date">
              {note.date}
            </span>

            <button
              className="note-zoom-close"
              onClick={() => {
                setIsZoomed(false)
                setIsEditing(false)
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}