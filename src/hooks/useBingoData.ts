import { useEffect, useState } from 'react';
import eventCollectionData from '../data/itemsList.json';
import arrayShuffle from '../lib/arrayShuffle';
import checkArrayForBingo from '../lib/checkBingo';
import type { TItem } from '../types/TItem.type';

const useBingoData = () => {
	const [itemsArray, setItemsArray] = useState<TItem[]>([]);

	useEffect(() => {
		try {
			const BingoData = localStorage.getItem('bingoData');
			if (BingoData) {
				setItemsArray(JSON.parse(BingoData));
			} else {
				setItemsArray(arrayShuffle(eventCollectionData));
			}
		} catch (error) {
			console.error('Error loading Bingo data:', error);
			setItemsArray(arrayShuffle(eventCollectionData));
		}
	}, []);

	const saveToLocalStorage = (newArray: TItem[]) => {
		try {
			localStorage.setItem('bingoData', JSON.stringify(newArray));
		} catch (error) {
			console.error('Error saving Bingo data:', error);
		}
	};

	const setData = (newData: TItem[]) => {
		const newArray = checkArrayForBingo([...newData]);
		setItemsArray(newArray);
		saveToLocalStorage(newArray);
	};

	const resetData = () => {
		localStorage.removeItem('bingoData');
		const resetArray = arrayShuffle(itemsArray.map(item => ({ ...item, isMarked: false, isBingo: false })));
		setItemsArray(resetArray);
		saveToLocalStorage(resetArray);
	};

	return {
		itemsArray,
		setData,
		resetData
	};
};

export default useBingoData;
