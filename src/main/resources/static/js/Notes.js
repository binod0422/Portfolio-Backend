
export default class Notes {
    static getAllNotes() {
        // Get notes from localStorage or return an empty array if no notes found
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        // Sort notes by updated date in descending order
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        // Get all notes from localStorage
        const notes = Notes.getAllNotes();

        // Check if the note to save already exists
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update existing note or add a new note
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        // Save updated notes to localStorage
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        // Get all notes from localStorage
        const notes = Notes.getAllNotes();

        // Filter out the note to delete
        const newNotes = notes.filter(note => note.id != id);

        // Save updated notes to localStorage
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}
