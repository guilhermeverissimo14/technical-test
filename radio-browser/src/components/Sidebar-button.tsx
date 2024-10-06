"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, Heart, MenuIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import InputSearch from "./Input-search";

import { useRadios } from "@/app/_services/useRadios";
import { useRadio } from "@/app/_contexts/radioContext";

const SidebarButton = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0)
    const { data, isLoading, isError } = useRadios(page, searchQuery);
    const { radios, addRadio, removeRadio } = useRadio();

    if (isError) {
        return notFound();
    }

    if (isLoading) {
        return (
            <div className='h-ful w-full'>
                <span className='text-white text-sm'>Carregando...</span>
            </div>
        )
    }

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                >
                    <MenuIcon
                        color="#0a67fc"
                    />
                </Button>
            </SheetTrigger>

            <SheetContent
                className="bg-[#18181b] w-[100%] md-w-[40%] border-transparent overflow-y-auto"
                side="left"
            >

                <div className="h-full pt-5 flex flex-col justify-between gap-4" >

                    <InputSearch
                        placeholder="Pesquisar rádio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {data?.map((stations) => (

                        <div key={stations.stationuuid} className="flex items-center justify-between bg-[#4c4c55] p-[6px] rounded-sm">
                            <span className="text-white">{stations.name}</span>

                            {radios?.some((fav) => fav.stationuuid === stations.stationuuid) ? (
                                <Button
                                    onClick={() => removeRadio(stations.stationuuid)}
                                >
                                    <Heart className="text-red-500" size="icon" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => addRadio(stations)}
                                >
                                    <Heart size="icon" />
                                </Button>
                            )}
                        </div>
                    ))}

                    {(data?.length ?? 0) <= 0 && (
                        <h1 className="w-full text-center text-white font-bold size-2xl">Nenhuma rádio encontrada...</h1>
                    )}

                    <div className="flex justify-evenly pb-3">

                        <Button
                            className="bg-transparent border-transparent"
                            onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronLeftIcon className="h-10  w-10 text-white hover:text-black" />
                        </Button>

                        <Button
                            className="bg-transparent border-transparent"
                            onClick={() => setPage((old) => old + 1)}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronRightIcon className="h-10  w-10 text-white hover:text-black" />
                        </Button>

                    </div>

                </div>

            </SheetContent>
        </Sheet>
    );
}

export default SidebarButton;