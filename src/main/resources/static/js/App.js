import NotesView from "./NotesView.js";
import Notes from "./Notes.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        // Get all notes from Notes class
        const notes = Notes.getAllNotes();

        // Set notes, update note list, and set active note
        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        // Set notes, update note list, and update note preview visibility
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        // Set active note and update active note in view
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        // Return an object with event handlers for NotesView
        return {
            onNoteSelect: noteId => {
                // Find the selected note by ID and set it as the active note
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                // Create a new note with default title and body
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                // Save the new note and refresh notes
                Notes.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                // Save the edited note and refresh notes
                Notes.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                // Delete the selected note and refresh notes
                Notes.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
