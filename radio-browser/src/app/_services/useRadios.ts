"use client"
import { useQuery } from 'react-query';
import axios from 'axios';

import { Radio } from '../_contexts/radioContext';

const fetchRadios = async (page: number, searchQuery: string) => {
    const { data } = await axios.get<Radio[]>(
        `https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${page * 10}&name=${searchQuery}`
    );
    return data;
};

export const useRadios = (page: number, searchQuery: string) => {
    return useQuery(['radios', page, searchQuery], () => fetchRadios(page, searchQuery), {
        keepPreviousData: true,
    });
};
