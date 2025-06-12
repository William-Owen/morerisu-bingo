import { useEffect, useState } from 'react';
import arrayShuffle from '../lib/arrayShuffle';
import checkArrayForBingo from '../lib/checkBingo';
import type { TItem } from '../types/TItem.type';
import { useQuery } from '@tanstack/react-query';

const useBingoData = () => {
	const [itemsArray, setItemsArray] = useState<TItem[]>([]);

	const query = useQuery({ 
		queryKey: ['bingo-data'], 
		queryFn: async (): Promise<TItem[]> => {
			const response = await fetch('/data/itemsList.json');
			return response.json();
		},
		enabled: false,
	});
	
	useEffect(() => {
		if (query.isSuccess) {
			const shuffledData = arrayShuffle(query.data);
			setItemsArray(shuffledData);
			checkArrayForBingo(shuffledData);
		}
	}, [query.isSuccess, query.data]);

	useEffect(() => {
		try {
			const localBingoData = localStorage.getItem('bingoData');
			if (localBingoData) {
				setItemsArray(JSON.parse(localBingoData));
			} else {
				query.refetch();
			}
		} catch (error) {
			console.error('Error loading Bingo data:', error);
		}
	}, [query.data]);

	const saveToLocalStorage = (newArray: TItem[]) => {
		try {
			localStorage.setItem('bingoData', JSON.stringify(newArray));
		} catch (error) {
			console.error('Error saving Bingo data:', error);
		}
	};

	const updateBingo = (newData: TItem[]) => {
		const newArray = checkArrayForBingo([...newData]);
		setItemsArray(newArray);
		saveToLocalStorage(newArray);
	};

	const resetData = () => {
		localStorage.removeItem('bingoData')
		query.refetch();
	};

	return {
		itemsArray,
		updateBingo,
		resetData,
		isLoading: query.isLoading,
		isError: query.isError
	};
};

export default useBingoData;