import { useState } from 'react';

interface SearchBarProps {
  onSearch: (gameName: string, tagLine: string) => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const [gameName, tagLine] = input.split('#');
    if (!gameName || !tagLine) {
      setError('Enter your Riot ID in the format Name#TAG');
      return;
    }
    setError(null);
    onSearch(gameName.trim(), tagLine.trim());
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name#TAG"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}