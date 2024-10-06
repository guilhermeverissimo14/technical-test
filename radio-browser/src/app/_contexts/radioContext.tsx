"use client";
import React, { createContext, useContext, useState } from 'react';

export interface Radio {
    name: string;
    country: string;
    language: string;
    url: string;
    stationuuid: string;
    url_resolved: string;
}

interface RadioContextType {
    radios: Radio[];
    addRadio: (radio: Radio) => void;
    removeRadio: (id: string) => void;
    editRadio: (radio: Radio) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const useRadio = () => {
    const context = useContext(RadioContext);
    if (!context) {
        throw new Error('useRadio must be used within a RadioProvider');
    }
    return context;
};

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [radios, setRadios] = useState<Radio[]>([]);

    const addRadio = (radio: Radio) => {
        setRadios(prevRadios => {
            const updatedRadios = [...prevRadios, radio];
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    const removeRadio = (stationuuid: string) => {
        setRadios(prevRadios => {
            const updatedRadios = prevRadios.filter(radio => radio.stationuuid !== stationuuid);
            console.log(updatedRadios);
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    const editRadio = (editedRadio: Radio) => {
        setRadios(prevRadios => {
            const updatedRadios = prevRadios.map(radio => (radio.stationuuid === editedRadio.stationuuid ? editedRadio : radio));
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    const value = React.useMemo(() => ({ radios, addRadio, removeRadio, editRadio }), [radios]);

    return (
        <RadioContext.Provider value={value}>
            {children}
        </RadioContext.Provider>
    );
};
