import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSearch(gameName: string, tagLine: string) {
    setLoading(true);
    navigate(`/player/${gameName}/${tagLine}`);
  }

  return (
    <div>
      <h1>PROQUEUE</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
    </div>
  );
}