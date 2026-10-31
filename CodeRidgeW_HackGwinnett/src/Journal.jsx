import React, { useState, useEffect, useRef } from "react";
import { EntryForm } from "./EntryForm";


function Journal(){
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const formDialogRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = (newEntry) => {
    setEntries([newEntry, ...entries]);
    formDialogRef.current.close();
  };

  return (
    <main className="page">

      {/* HEADER WITH THE BUTTON THAT OPENS THE FORM */}
      <div className="page_header">
        <div>
          <h2>My Journal</h2>
          <p>Notes, reminders, and how you're feeling, all in one place.</p>
        </div>
        <button className="btn" onClick={() => formDialogRef.current.showModal()}>
          + New Entry
        </button>
      </div>

      {/* THE POPUP FORM WINDOW */}
      <dialog ref={formDialogRef} className="dialog">
        <h3>New Journal Entry</h3>
        <EntryForm onSave={handleSave} onCancel={() => formDialogRef.current.close()} />
      </dialog>

      {/* SAVED ENTRIES */}
      {entries.length === 0 ? (
        <p className="empty">No entries yet. Click "New Entry" to write your first one.</p>
      ) : (
        <div className="card_grid">
          {entries.map((entry) => (
            <article key={entry.id} className="card entry">
              <h3>{entry.title}</h3>
              <small>{entry.date}</small>
              <p>{entry.content}</p>
              <button className="btn_text" onClick={() => setEntries(entries.filter(e => e.id !== entry.id))}>
                Delete
              </button>
            </article>
          ))}
        </div>
      )}

    </main>
  );
}

export default Journal
