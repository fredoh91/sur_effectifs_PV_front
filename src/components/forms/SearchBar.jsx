import { Input } from "./Input"

export function SearchBar({ search, onSearchChange }) {
    return (
      <div>
        <div className="mb-3">
          <Input
            onChange={onSearchChange}
            placeholder="Rechercher ..."
            value={search}
          />
        </div>
      </div>
    );
  }