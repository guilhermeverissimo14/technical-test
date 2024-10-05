"use client";
import { useState } from 'react';
import { notFound } from 'next/navigation';

import { useRadios } from './_services/useRadios';
import { useRadio } from './_contexts/radioContext';

import Header from '@/components/Header';

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

  if (isError) return notFound();

  if (isLoading) {
    return (
      <div className='h-ful w-full flex items-center justify-center'>
        <h1 className='text-white text-2xl'>Carregando...</h1>
      </div>
    )
  }


  return (
    <div>

      <Header />

      <div className="search">
        <input
          className="w-full p-3 mb-5  text-md bg-transparent"
          type="text"
          placeholder="Search for radio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        {data?.map((radio) => (
          <div key={radio.stationuuid} className="flex justify-between p-3 border-[#ddd] border-1 border-solid">
            <span>{radio.name}</span>
            <button onClick={() => handlePlay(radio.url_resolved)}>Play</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={() => addRadio(radio)}>Add</button>
            <button onClick={() => removeRadio(radio.stationuuid)}>Remove</button>
            <button onClick={() => editRadio({ ...radio, name: 'Edited Name' })}>Edit</button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button >
          Previous
        </button>
        <button onClick={() => setPage((old) => old + 1)} disabled={data?.length < 10}>
          Next
        </button>
      </div>

      {playingUrl && (
        <div className="mt-5">
          <audio src={playingUrl} controls autoPlay />
        </div>
      )}
    </div>
  );
};

export default RadioBrowser;
