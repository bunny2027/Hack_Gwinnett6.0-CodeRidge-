import React, { useState, useEffect } from 'react'

//JavaFX alternative method but find replacement function using REact

export default function JournalApp() {
  // Load initial entries from localStorage if they exist
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage in sync with our state
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  // Handler to add a new journal entry widget
  const addEntry = (newEntry) => {
    setEntries([newEntry, ...entries]); // Prepends so newest is first
  };

  // Handler to delete an entry widget
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">My Daily Journal</h1>
          <p className="text-gray-600 mt-1">Capture your thoughts and view them as widgets below.</p>
        </header>

        {/* Form Section */}
        <div className="mb-10">
          <JournalForm onSave={addEntry} />
        </div>

        {/* Widgets Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Journal Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 italic text-center py-8">No entries yet. Write your first thoughts above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <JournalWidget key={entry.id} entry={entry} onDelete={deleteEntry} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JournalForm({ onSave }){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Neutral');

    const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title,
      content,
      mood,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onSave(newEntry);

    // Reset
    setTitle('');
    setContent('');
    setMood('Neutral');
  };

  return(<form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=" Neutral"> Neutral</option>
            <option value=" Excited"> Excited</option>
            <option value=" Tired"> Tired</option>
            <option value=" Calm"> Calm</option>
            <option value=" Low Energy">Low Energy</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today?"
          rows="4"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow"
      >
        Save to Dashboard Widget
      </button>
    </form>
  );
}

function JournalWidget({ entry, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200 relative group">
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{entry.title}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
            {entry.mood}
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-3">{entry.date}</p>
        <p className="text-gray-600 text-sm whitespace-pre-wrap line-clamp-4">{entry.content}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
        <button
          onClick={() => onDelete(entry.id)}
          className="text-xs text-red-500 hover:text-red-700 font-medium transition"
        >
          Delete Widget
        </button>
      </div>
    </div>
  );
}
