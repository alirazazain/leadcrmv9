import { useState } from 'react';
import { Plus } from 'lucide-react';
import { NoteList } from './NoteList';
import { CreateNoteModal } from './CreateNoteModal';
import { EditNoteModal } from './EditNoteModal';
import { DeleteConfirmationDialog } from '../../../../common/DeleteConfirmationDialog';
import { Note } from '../../../../../types/notes';
import { Client } from '../../../../../types/recruitment';

interface ClientNotesProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientNotes({ client, onUpdate }: ClientNotesProps) {
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteNote, setDeleteNote] = useState<Note | null>(null);

  const handleAddNote = (note: Note) => {
    onUpdate({
      notes: [...(client.notes || []), note]
    });
    setShowCreateNote(false);
  };

  const handleEditNote = (updatedNote: Note) => {
    onUpdate({
      notes: client.notes?.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      )
    });
    setEditingNote(null);
  };

  const handleDeleteNote = () => {
    if (deleteNote) {
      onUpdate({
        notes: client.notes?.filter(note => note.id !== deleteNote.id)
      });
      setDeleteNote(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
        <button
          onClick={() => setShowCreateNote(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </button>
      </div>

      <NoteList 
        notes={client.notes || []}
        onEdit={setEditingNote}
        onDelete={setDeleteNote}
      />

      <CreateNoteModal
        isOpen={showCreateNote}
        onClose={() => setShowCreateNote(false)}
        onSubmit={handleAddNote}
      />

      <EditNoteModal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        note={editingNote}
        onSubmit={handleEditNote}
      />

      <DeleteConfirmationDialog
        isOpen={!!deleteNote}
        onClose={() => setDeleteNote(null)}
        onConfirm={handleDeleteNote}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />
    </div>
  );
}