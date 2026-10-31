import React, { useState } from "react";

//Journal entry form, Journal.jsx shows it in the popup window
export function EntryForm({ onSave, onCancel }){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onSave({
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString()
        });

        // Clear fields for the next entry
        setTitle('');
        setContent('');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="entry-title">Title</label>
                <input
                    id="entry-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title"
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="entry-content">Your Entry</label>
                <textarea
                    id="entry-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind today?"
                    rows="5"
                    required
                />
            </div>

            <div className="form_actions">
                <button type="button" className="btn btn_secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn">Add Entry</button>
            </div>
        </form>
    );
}
