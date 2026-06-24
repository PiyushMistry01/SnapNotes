import NoteCard from './NoteCard'
import './Gallery.css'

export default function Gallery({ notes, onDelete, onEdit }) {
  return (
    <section className="gallery" aria-label="Your notes">
      <div className="gallery-count">{notes.length} note{notes.length !== 1 ? 's' : ''}</div>
      <div className="gallery-grid">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </section>
  )
}