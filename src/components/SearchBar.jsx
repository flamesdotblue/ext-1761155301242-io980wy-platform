import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className="w-full pl-10 pr-9 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
      />
      {value ? (
        <button
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
