import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import Toolbar from "./components/Toolbar";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

const STORAGE_KEY = "notes_v1";
const SELECTED_KEY = "notes_selected_v1";

function createNewNote() {
  const id = crypto.randomUUID();
  const now = Date.now();
  return {
    id,
    title: "Untitled",
    content: "",
    pinned: false,
    updatedAt: now,
    createdAt: now,
  };
}

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    // Default first note
    return [createNewNote()];
  });

  const [selectedId, setSelectedId] = useState(() => {
    try {
      const raw = localStorage.getItem(SELECTED_KEY);
      if (raw) return raw;
    } catch {}
    return null;
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated"); // "updated" | "title"

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId);
  }, [selectedId]);

  // Ensure selected id points to an existing note
  useEffect(() => {
    if (!notes.length) {
      const n = createNewNote();
      setNotes([n]);
      setSelectedId(n.id);
      return;
    }
    if (!selectedId || !notes.some(n => n.id === selectedId)) {
      setSelectedId(notes[0].id);
    }
  }, [notes]);

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedId) || null, [notes, selectedId]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = notes;
    if (q) {
      arr = arr.filter(n =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      );
    }
    arr = [...arr].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.updatedAt - a.updatedAt; // updated
    });
    return arr;
  }, [notes, search, sort]);

  function handleCreate() {
    const n = createNewNote();
    setNotes(prev => [n, ...prev]);
    setSelectedId(n.id);
  }

  function handleDelete(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) {
      // select next available
      const rest = filteredNotes.filter(n => n.id !== id);
      setSelectedId(rest[0]?.id || null);
    }
  }

  function handleTogglePin(id) {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n)));
  }

  function handleUpdate(id, fields) {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...fields, updatedAt: Date.now() } : n)));
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold tracking-tight">Notes</div>
            <div className="ml-auto text-xs text-neutral-400">{notes.length} total</div>
          </div>
          <SearchBar value={search} onChange={setSearch} onClear={() => setSearch("")} />
          <Toolbar
            hasSelection={!!selectedNote}
            selectedNote={selectedNote}
            onCreate={handleCreate}
            onDelete={() => selectedNote && handleDelete(selectedNote.id)}
            onTogglePin={() => selectedNote && handleTogglePin(selectedNote.id)}
            sort={sort}
            onSortChange={setSort}
          />
          <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur">
            <NoteList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <div className="h-full rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-4 md:p-6">
            <NoteEditor
              note={selectedNote}
              onChange={(fields) => selectedNote && handleUpdate(selectedNote.id, fields)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
