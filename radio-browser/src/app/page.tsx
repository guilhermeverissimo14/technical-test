"use client";
import { useEffect, useState } from 'react';
import { Edit, PlayCircle, StopCircle } from 'lucide-react';

import { Radio, useRadio } from './_contexts/radioContext';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import InputSearch from '@/components/Input-search';
import DeleteRadioDialog from '@/components/Delete-dialog';
import SidebarButton from '@/components/Sidebar-button';

const RadioBrowser = () => {
  const [searchFavorites, setSearchFavorites] = useState('');
  const { radios, removeRadio } = useRadio();

  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [statusAudio, setStatusAudio] = useState<string | null>(null);
  const [dataFavorites, setDataFavorites] = useState<Radio[]>([])
  const [stationToDelete, setStationToDelete] = useState<string | null>(null);

  const handlePlay = (url: string, stationuuid: string) => {
    setPlayingUrl(url);
    setStatusAudio(stationuuid);
  };

  const handleStop = () => {
    setPlayingUrl(null);
    setStatusAudio(null);
  };

  const confirmDelete = (stationuuid: string) => {
    setStationToDelete(stationuuid);
  };

  const deleteRadio = () => {

    if (stationToDelete) {
      removeRadio(stationToDelete);
      setStationToDelete(null);
    }
  };

  useEffect(() => {
    const savedRadios = JSON.parse(localStorage.getItem('radios') || '[]');

    const filterFavorites = savedRadios.filter((radio: Radio) => radio.name.toLowerCase().includes(searchFavorites.toLowerCase()));
    setDataFavorites(filterFavorites);

  }, [radios, searchFavorites]);


  return (
    <div className='flex flex-col items-center '>

      <Header />

      <main className='w-[90%] mt-5'>

        <section className='flex items-center gap-3 justify-between mb-5'>

          <span className='text-white font-bold text-sm md:text-lg whitespace-nowrap'>
            Rádios favoritas
          </span>

          <InputSearch
            placeholder="Pesquisar rádio favorita..."
            value={searchFavorites}
            onChange={e => setSearchFavorites(e.target.value)}
          />

        </section>

        <section className='h-[73vh] bg-[#4b4b54] rounded-md overflow-y-auto mb-5' >

          <article className='flex p-5 gap-3 border-b-2 border-[#73737f]'>
            <StopCircle />
            <span className='text-white font-semibold'>Nome da Rádio Atual</span>
          </article>


          {dataFavorites.map((item) => (
            <article key={item.stationuuid} className='flex justify-between bg-white p-5 mb-2'>

              <div className='flex items-center gap-3'>

                {statusAudio === item.stationuuid ? (
                  <Button
                    onClick={handleStop}
                    size="icon"
                    className='bg-[#4c4c55]'
                  >

                    <StopCircle />

                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePlay(item.url_resolved, item.stationuuid)}
                    size="icon"
                    className='bg-[#4c4c55]'
                  >

                    <PlayCircle />

                  </Button>
                )}

                <div>
                  <h4 className='font-bold'>
                    {item.name.length > 30 ? item.name.substring(0, 20) + '...' : item.name}
                  </h4>
                  <span className='text-sm'>
                    {item.country.length > 30 ? item.country.substring(0, 20) + '...' : item.country}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3'>

                <Button size="icon" className='bg-transparent'>
                  <Edit className='text-black hover:text-white' />
                </Button>

                <DeleteRadioDialog
                  stationuuid={item.stationuuid}
                  onDelete={deleteRadio}
                  onConfirmDelete={confirmDelete}
                />

              </div>

            </article>
          ))}

          {dataFavorites.length <= 0 && (
            <div className='h-full w-full p-3 flex items-center gap-3 flex-col justify-center'>
              <h1 className='text-white text-center text-sm md:text-lg font-bold'>
                Você não possui nenhuma rádio favorita
              </h1>

              <h3 className='text-[#f2f3f5] text-sm text-center'>
                Clique no botão abaixo 👇 e selecione suas rádias favoritas
              </h3>

              <SidebarButton />
            </div>
          )}

        </section>

      </main>

      {playingUrl && (
        <div className="mt-5">
          <audio src={playingUrl} controls autoPlay>
            <track kind="captions" />
          </audio>
        </div>
      )}

    </div>
  );
};

export default RadioBrowser;
