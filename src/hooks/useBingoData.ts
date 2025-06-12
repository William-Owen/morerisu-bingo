import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import arrayShuffle from "../lib/arrayShuffle"
import checkArrayForBingo from "../lib/checkBingo"
import type { TItem } from "../types/TItem.type"

const STORAGE_KEY = "bingoData"
const QUERY_KEY = ["bingo-data"]

const useBingoData = () => {
	const [itemsArray, setItemsArray] = useState<TItem[]>([])
	const queryClient = useQueryClient()

	const saveToLocalStorage = useCallback((data: TItem[]) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("Error saving Bingo data:", error)
		}
	}, [])

	const fetchBingoData = useCallback(async (): Promise<TItem[]> => {
		const data = await queryClient.fetchQuery({
			queryKey: QUERY_KEY,
			queryFn: async () => {
				const response = await fetch("/data/itemsList.json")
				return response.json()
			},
		})

		return arrayShuffle(data) as TItem[]
	}, [queryClient])

	const resetData = useCallback(async () => {
		localStorage.removeItem(STORAGE_KEY)

		const shuffledData = await fetchBingoData()
		setItemsArray(shuffledData)
		saveToLocalStorage(shuffledData)
	}, [fetchBingoData, saveToLocalStorage])

	const updateBingo = (newData: TItem[]) => {
		const processedArray = checkArrayForBingo([...newData])
		setItemsArray(processedArray)
		saveToLocalStorage(processedArray)
	}

	useEffect(() => {
		const initializeData = async () => {
			const localBingoData = localStorage.getItem(STORAGE_KEY)

			if (localBingoData) {
				setItemsArray(JSON.parse(localBingoData))
			} else {
				await resetData()
			}
		}

		initializeData()
	}, [resetData])

	return {
		itemsArray,
		updateBingo,
		resetData,
	}
}

export default useBingoData
