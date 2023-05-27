import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Memo.css';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(153, 153, 153, 0.75)'
  },
  content: {
    color: 'var(--second-color)',
    backgroundColor: 'var(--first-color)',
    height: '80%',
    width: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Memo = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [noteTitle, setNoteTitle] = useState('Untitled Note');
  const [noteContent, setNoteContent] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const now = new Date();
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = now.toLocaleDateString([], dateOptions);
  const formattedTime = now.toLocaleTimeString([], timeOptions);

  const editorRef = useRef();

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (activeNoteId) {
      const note = notes.find((note) => note.id === activeNoteId);
      if (note) {
        setNoteTitle(note.title);
        setNoteContent(note.content);
      }
    } else {
      setNoteTitle('Untitled Note');
      setNoteContent('');
    }
  }, [activeNoteId, notes]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (content, delta, source, editor) => {
    setNoteContent(content);
    if (source === 'user') {
      const updatedNotes = notes.map((note) =>
        note.id === activeNoteId
          ? {
            ...note,
            content: editorRef.current.getEditorContents(),
            timestamp: `${formattedDate} - ${formattedTime}`,
          }
          : note
      );
      moveNoteToFirstPosition(activeNoteId, updatedNotes);
      setNotes(updatedNotes);
    }
  };

  const updateNoteTitle = (updatedTitle) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId ? { ...note, title: updatedTitle } : note
      )
    );
    setNoteTitle(updatedTitle);
  };

  const deleteNote = () => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== activeNoteId)
    );
    setActiveNoteId(null);
  };

  const handleNoteSelection = (noteId) => {
    setActiveNoteId(noteId);
  };

  const moveNoteToFirstPosition = (noteId, updatedNotes) => {
    if (updatedNotes && updatedNotes.length > 0) {
      const noteIndex = updatedNotes.findIndex((note) => note.id === noteId);
      if (noteIndex > 0) {
        const [movedNote] = updatedNotes.splice(noteIndex, 1);
        updatedNotes.unshift(movedNote);
      }
    }
  };

  const truncateTitle = (title) => {
    if (title.length > 15) {
      return `${title.substring(0, 15)}...`;
    }
    return title;
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (noteId) => {
    setIsOpen(true);
    setActiveNoteId(noteId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    switchColors();
  }, [darkMode]);

  const switchColors = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--first-color', '#101010');
      root.style.setProperty('--second-color', '#dddddd');
    } else {
      root.style.setProperty('--first-color', '#dddddd');
      root.style.setProperty('--second-color', '#101010');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = searchTerm
    ? notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : notes;

  return (
    <div className="memo-container">
      <div className="memo-header">
        <NavLink end to="/" className="footer-prev underline">
          <div className="memo-header-title">Memo</div>
        </NavLink>
        <div className="memo-header-group">
          <div className="memo-header-icon">
            <i className="bx bx-search"></i>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="memo-search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="memo-main show">
        <div className="memo-main-left">
          <div className="note-list-header">
            <label className="note-list-text">All Notes</label>
            <button onClick={createNote}>Add note</button>
          </div>
          <div className="memo-notes-list">
            {filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className={`note-item ${note.id === activeNoteId ? 'note-active' : ''
                  }`}
                onClick={() => handleNoteSelection(note.id)}
              >
                <div className="note-description">
                  <div className="note-title-count">
                    <div className="note-count">{`${(index + 1)
                      .toString()
                      .padStart(2, '0')}`}</div>
                    <div className="note-title">{truncateTitle(note.title)}</div>
                  </div>
                  <div className="note-timestamp">{note.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="memo-main-right">
          {activeNoteId && (
            <div className="note-editor">
              <div className="note-input-form">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => updateNoteTitle(e.target.value)}
                  className="note-input"
                />
              </div>
              <ReactQuill
                ref={editorRef}
                value={noteContent}
                onChange={updateNote}
              />
              <button className="delete-note underline" onClick={deleteNote}>
                Delete Note
              </button>
            </div>
          )}
          {!activeNoteId && <div className="no-note-selected">No note selected.</div>}
        </div>
      </div>

      <div className="memo-main hidden">
        <div className="memo-main-left">
          <div className="note-list-header">
            <label className="note-list-text">All Notes</label>
            <button className="memo-add" onClick={createNote}>
              Add note
            </button>
          </div>
          <div className="memo-notes-list">
            {filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className={`note-item ${note.id === activeNoteId ? 'note-active' : ''
                  }`}
                onClick={() => openModal(note.id)}
              >
                <div className="note-description">
                  <div className="note-title-count">
                    <div className="note-count">{`${(index + 1)
                      .toString()
                      .padStart(2, '0')}`}</div>
                    <div className="note-title">{truncateTitle(note.title)}</div>
                  </div>
                  <div className="note-timestamp">{note.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          {activeNoteId && (
            <div className="note-editor">
              <div className="note-input-form">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => updateNoteTitle(e.target.value)}
                  className="note-input"
                />
              </div>
              <ReactQuill
                ref={editorRef}
                value={noteContent}
                onChange={updateNote}
              />
              <button className="delete-note underline" onClick={deleteNote}>
                Delete Note
              </button>
            </div>
          )}
          {!activeNoteId && <div className="no-note-selected">No note selected.</div>}
        </Modal>
      </div>

      <div className="footer">
        <NavLink end to="/classtimer" className="footer-prev underline">
          <i className="bx bx-left-arrow-alt"></i>
          <label className="footer-prev-text">Class Timer</label>
        </NavLink>

        <NavLink to="/" className="footer-next underline">
          <label className="footer-next-text">Home</label>
          <i className="bx bx-right-arrow-alt"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default Memo;
