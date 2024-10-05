"use client";
import { useState } from 'react';

import { useRadios } from './_services/useRadios';
import { useRadio } from './_contexts/radioContext';

import Header from '@/components/Header';
import { Edit, PlayCircle, StopCircle, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InputSearch from '@/components/Input-search';

const RadioBrowser = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useRadios(page, searchQuery);
  const { radios, addRadio, removeRadio, editRadio } = useRadio();
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const handlePlay = (url: string) => {
    setPlayingUrl(url);
  };

  const handleStop = () => {
    setPlayingUrl(null);
  };


  if (isLoading) {
    return (
      <div className='h-[100vh] w-full flex items-center justify-center'>
        <h1 className='text-white text-2xl'>Carregando...</h1>
      </div>
    )
  }


  return (
    <div className='flex flex-col items-center '>

      <Header />

      <main className='w-[90%] mt-5'>

        <section className='flex items-center justify-between mb-5'>

          <span className='text-white font-bold text-lg'>Radios favoritas</span>

          <InputSearch
            placeholder="Pesquisar rádio..."
          />

        </section>

        <section className='h-[75vh] bg-[#4b4b54] rounded-md' >

          <article className='flex p-5 gap-3 border-b-2 border-[#73737f]'>
            <StopCircle />
            <span className='text-white'>Nome da Rádio Atual</span>
          </article>

          <article className='flex justify-between bg-white p-5 overflow-y-auto mb-2'>

            <div className='flex items-center gap-3'>
              <Button size="icon" className='bg-[#4c4c55]'>
                <PlayCircle />
              </Button>

              <div>
                <h4 className='font-bold'>Testes</h4>
                <span>Minas, Gerais</span>
              </div>
            </div>

            <div className='flex items-center gap-3'>

              <Button size="icon" className='bg-transparent'>
                <Edit className='text-black hover:text-white' />
              </Button>

              <Button size="icon" className='bg-transparent hover:text-white'>
                <Trash className='text-black hover:text-white' />
              </Button>

            </div>

          </article>

        </section>

      </main>

      {/* <div className="flex flex-col gap-3">
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
      )} */}

    </div>
  );
};

export default RadioBrowser;
