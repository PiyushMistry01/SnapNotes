export default function EmptyState({ isSearching, onUpload }) {
  return (
    <div className="empty-state">
      {isSearching ? (
        <>
          <h2>No matching notes found</h2>
          <p>Try a different search term.</p>
        </>
      ) : (
        <>
          <h2>No notes yet</h2>
          <p>Upload your first note to get started.</p>
        </>
      )}
    </div>
  )
}