"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useRadios } from "@/app/_services/useRadios";

const SidebarButton = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0)
    const { data, isLoading, isError } = useRadios(page, searchQuery);

    useEffect(() => {
        console.log(data)
    }, [searchQuery])

    if (isError) {
        return notFound();
    }

    if (isLoading) {
        return (
            <div className='h-ful w-full flex items-center justify-center'>
                <h1 className='text-white text-2xl'>Carregando...</h1>
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

                    <div className="bg-[#4c4c55] flex items-center gap-2 rounded-sm w-full p-1 mb-3  hover:border-2 hover:border-white">

                        <Search className="text-white" />
                        <input
                            className="bg-transparent w-full text-white outline-none p-1"
                            placeholder="Pesquisar rádio..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {data.map((stations) => (

                        <div className="flex bg-[#4c4c55] p-[6px] rounded-sm">
                            <span className=" text-white">{stations.name}</span>
                        </div>
                    ))}

                    {data.length <= 0 && (
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