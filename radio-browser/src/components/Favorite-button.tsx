import { Heart } from "lucide-react";

import { Radio, useRadio } from "@/app/_contexts/radioContext";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "./ui/tooltip";
import { Button } from "./ui/button";

interface FavoriteButtonProps {
    station: Radio;
}

const FavoriteButton = ({ station }: FavoriteButtonProps) => {

    const { radios, addRadio, removeRadio } = useRadio();

    const isFavorite = radios?.some((fav) => fav.stationuuid === station.stationuuid);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={() => isFavorite ? removeRadio(station.stationuuid) : addRadio(station)}>
                        <Heart className={isFavorite ? "text-red-500" : ""} size="icon" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-[#4c4c55] semi-bold">
                        {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default FavoriteButton;