import { Plus, Trash2, Pin, PinOff, Clock } from "lucide-react";

export default function Toolbar({ hasSelection, selectedNote, onCreate, onDelete, onTogglePin, sort, onSortChange }) {
  const isPinned = selectedNote?.pinned;
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 text-neutral-900 font-medium hover:bg-white/90 active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" /> New
      </button>
      <button
        onClick={onDelete}
        disabled={!hasSelection}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 text-neutral-200 hover:bg-neutral-800/60 disabled:opacity-40"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
      <button
        onClick={onTogglePin}
        disabled={!hasSelection}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 text-neutral-200 hover:bg-neutral-800/60 disabled:opacity-40"
      >
        {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
        {isPinned ? "Unpin" : "Pin"}
      </button>
      <div className="ml-auto flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-neutral-400" />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-2 py-1 text-neutral-100"
        >
          <option value="updated">Sort by: Recent</option>
          <option value="title">Sort by: Title</option>
        </select>
      </div>
    </div>
  );
}
