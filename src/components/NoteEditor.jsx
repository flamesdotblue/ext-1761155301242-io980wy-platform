import { useEffect, useRef } from "react";

export default function NoteEditor({ note, onChange }) {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!note) return;
    if (!note.title) titleRef.current?.focus();
  }, [note?.id]);

  if (!note) {
    return (
      <div className="h-full grid place-items-center text-neutral-400">
        Select or create a note to begin
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <input
        ref={titleRef}
        value={note.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="Title"
        className="w-full text-2xl md:text-3xl font-semibold bg-transparent outline-none placeholder-neutral-500"
      />
      <div className="text-xs text-neutral-400">Last updated: {new Date(note.updatedAt).toLocaleString()}</div>
      <textarea
        value={note.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Start typing..."
        className="mt-2 flex-1 min-h-[50vh] w-full resize-none bg-transparent outline-none text-neutral-100 placeholder-neutral-500"
      />
    </div>
  );
}
