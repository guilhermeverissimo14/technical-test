"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Radio {
    id: string;
    name: string;
    country: string;
    language: string;
    url: string;
}

interface RadioContextType {
    radios: Radio[];
    addRadio: (radio: Radio) => void;
    isFavorite: (id: string) => boolean;
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

    useEffect(() => {
        const savedRadios = JSON.parse(localStorage.getItem('radios') || '[]');
        setRadios(savedRadios);
    }, []);

    useEffect(() => {
        localStorage.setItem('radios', JSON.stringify(radios));
        console.log(JSON.parse(localStorage.getItem('radios') || '[]'))
    }, [radios]);

    const addRadio = (radio: Radio) => {
        setRadios(prevRadios => {
            const updatedRadios = [...prevRadios, radio];
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    const isFavorite = (id: string) => {
        return radios.some(radio => radio.id === id);
    }

    const removeRadio = (id: string) => {
        setRadios(prevRadios => {
            const updatedRadios = prevRadios.filter(radio => radio.id !== id);
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    const editRadio = (editedRadio: Radio) => {
        setRadios(prevRadios => {
            const updatedRadios = prevRadios.map(radio => (radio.id === editedRadio.id ? editedRadio : radio));
            localStorage.setItem('radios', JSON.stringify(updatedRadios));
            return updatedRadios;
        });
    };

    return (
        <RadioContext.Provider value={{ radios, addRadio, isFavorite, removeRadio, editRadio }}>
            {children}
        </RadioContext.Provider>
    );
};
