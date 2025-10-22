import { Pin, Trash2 } from "lucide-react";

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

export default function NoteList({ notes, selectedId, onSelect, onDelete, onTogglePin }) {
  if (!notes.length) {
    return (
      <div className="p-8 text-center text-neutral-400">No notes found</div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-800 max-h-[70vh] overflow-auto">
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={`p-3 cursor-pointer group ${selectedId === note.id ? "bg-neutral-800/60" : "hover:bg-neutral-900"}`}
        >
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium truncate">{note.title || "Untitled"}</div>
                {note.pinned && (
                  <Pin className="h-3.5 w-3.5 text-amber-400" />
                )}
              </div>
              <div className="text-xs text-neutral-400">{formatTime(note.updatedAt)}</div>
              <div className="text-sm text-neutral-300 line-clamp-2 whitespace-pre-wrap">{note.content || ""}</div>
            </div>
            <div className="flex flex-col items-end gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); onTogglePin(note.id); }}
                className="px-2 py-1 rounded border border-neutral-800 text-neutral-200 hover:bg-neutral-800/60"
              >
                <Pin className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                className="px-2 py-1 rounded border border-red-900/60 text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
