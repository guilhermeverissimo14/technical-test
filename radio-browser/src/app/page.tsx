"use client";
import { useState } from 'react';
import { useRadios } from './_services/useRadios';
import { useRadio } from './_contexts/radioContext';

const RadioBrowser = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError } = useRadios(page, searchQuery);
  const { radios, addRadio, removeRadio, editRadio } = useRadio();
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const handlePlay = (url: string) => {
    setPlayingUrl(url);
  };

  const handleStop = () => {
    setPlayingUrl(null);
  };

  if (isError) return <div>Error ao listar os dados na tela...</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="radio-browser">
      <div className="search">
        <input
          type="text"
          placeholder="Search for radio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="radio-list">
        {data?.map((radio: any) => (
          <div key={radio.stationuuid} className="radio-item">
            <span>{radio.name}</span>
            <button onClick={() => handlePlay(radio.url_resolved)}>Play</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={() => addRadio(radio)}>Add</button>
            <button onClick={() => removeRadio(radio.stationuuid)}>Remove</button>
            <button onClick={() => editRadio({ ...radio, name: 'Edited Name' })}>Edit</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage((old) => old + 1)} disabled={data?.length < 10}>
          Next
        </button>
      </div>

      {playingUrl && (
        <div className="audio-player">
          <audio src={playingUrl} controls autoPlay />
        </div>
      )}
    </div>
  );
};

export default RadioBrowser;
