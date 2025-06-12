import { useEffect, useState } from 'react';
import arrayShuffle from '../lib/arrayShuffle';
import checkArrayForBingo from '../lib/checkBingo';
import type { TItem } from '../types/TItem.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useBingoData = () => {
	const [itemsArray, setItemsArray] = useState<TItem[]>([]);
	const queryClient = useQueryClient();

	const resetData = async () => {
		localStorage.removeItem('bingoData');
		
		const data = await queryClient.fetchQuery({
			queryKey: ['bingo-data'],
			queryFn: async () => {
				const response = await fetch('/data/itemsList.json');
				return response.json();
			}
		});
		
		const shuffledData = arrayShuffle(data);
		setItemsArray(shuffledData as TItem[]);
		saveToLocalStorage(shuffledData as TItem[]);
	};
	
	useEffect(() => {

			const localBingoData = localStorage.getItem('bingoData');
			if (localBingoData) {
				setItemsArray(JSON.parse(localBingoData));
			} else {
				resetData
			}
	}, []);

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

	return {
		itemsArray,
		updateBingo,
		resetData,
	};
};

export default useBingoData;