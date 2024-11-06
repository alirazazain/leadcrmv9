import { useState } from 'react';
import { MoreVertical, PenSquare, Trash2, Share } from 'lucide-react';
import { format } from 'date-fns';
import { Note } from '../../../../../types/notes';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  if (notes.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">No notes have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors duration-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {note.createdBy.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    by {note.createdBy.name} · {format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setExpandedMenu(expandedMenu === note.id ? null : note.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors duration-200"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {expandedMenu === note.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => {
                        onEdit(note);
                        setExpandedMenu(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <PenSquare className="h-4 w-4 mr-2" />
                      Edit Note
                    </button>
                    <button
                      onClick={() => {
                        onDelete(note);
                        setExpandedMenu(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Note
                    </button>
                    <button
                      onClick={() => {
                        // Handle share functionality
                        setExpandedMenu(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share with guest
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">
              {note.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}