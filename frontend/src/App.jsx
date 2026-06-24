import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import UploadModal from './components/UploadModal'
import EmptyState from './components/EmptyState'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {

  
  
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const fetchNotes = async () => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/notes'
    )

    setNotes(res.data)
  } catch (err) {
    console.error(err)
  }
}

useEffect(() => {
  fetchNotes()
}, [])

  const filtered = notes.filter(n =>
    n.caption.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = async (id, newCaption) => {
  try {
    await axios.put(
      `http://localhost:5000/api/notes/${id}`,
      {
        caption: newCaption
      }
    )

    await fetchNotes()
  } catch (err) {
    console.error(err)
  }
}

  const handleAddNote = async (noteData) => {
  try {
    const rotation = (
      Math.random() * 3.6 - 1.8
    ).toFixed(1)

    const formData = new FormData()

    formData.append('image', noteData.image)
    formData.append('caption', noteData.caption)

    formData.append(
      'date',
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    )

    formData.append(
      'rotation',
      parseFloat(rotation)
    )

    await axios.post(
      'http://localhost:5000/api/notes',
      formData
    )

    await fetchNotes()

    setIsModalOpen(false)

  } catch (err) {
    console.error(err)
  }
}

  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/notes/${id}`
    )

    await fetchNotes()
  } catch (err) {
    console.error(err)
  }
}

  return (
    <div className="app">
      <Navbar
        search={search}
        onSearch={setSearch}
        onUpload={() => setIsModalOpen(true)}
      />

      <main className="main">
        {filtered.length === 0 ? (
          <EmptyState
            isSearching={search.length > 0}
            onUpload={() => setIsModalOpen(true)}
          />
        ) : (
          <Gallery
            notes={filtered}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </main>

      <button
        className="fab"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add new note"
      >
        <span className="fab-icon">+</span>
      </button>

      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />
      )}
    </div>
  )
}