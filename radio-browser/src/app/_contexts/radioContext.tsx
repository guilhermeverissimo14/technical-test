"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Radio {
    id: string;
    name: string;
    country: string;
    language: string;
    url: string;
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

    useEffect(() => {
        const savedRadios = JSON.parse(localStorage.getItem('radios') || '[]');
        setRadios(savedRadios);
    }, []);

    useEffect(() => {
        localStorage.setItem('radios', JSON.stringify(radios));
    }, [radios]);

    const addRadio = (radio: Radio) => {
        setRadios([...radios, radio]);
    };

    const removeRadio = (id: string) => {
        setRadios(radios.filter(radio => radio.id !== id));
    };

    const editRadio = (editedRadio: Radio) => {
        setRadios(radios.map(radio => (radio.id === editedRadio.id ? editedRadio : radio)));
    };

    return (
        <RadioContext.Provider value={{ radios, addRadio, removeRadio, editRadio }}>
            {children}
        </RadioContext.Provider>
    );
};
