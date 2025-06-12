import type { TItem } from "../types/TItem.type"

const checkArrayForBingo = (array: TItem[]): TItem[] => {
	const gridSize = 5

	if (array.length !== gridSize * gridSize) {
		throw new Error("Invalid array size for Bingo grid.")
	}

	for (const item of array) {
		item.isBingo = false
	}

	const markBingo = (indexes: number[]) => {
		for (const index of indexes) {
			array[index].isBingo = true
		}
	}

	const checkSequence = (sequence: number[]) => {
		if (sequence.every(index => array[index].isMarked)) {
			markBingo(sequence)
		}
	}

	// Check rows and columns
	for (let i = 0; i < gridSize; i++) {
		checkSequence(Array.from({ length: gridSize }, (_, j) => i * gridSize + j))
		checkSequence(Array.from({ length: gridSize }, (_, j) => i + j * gridSize))
	}

	// Check diagonals
	checkSequence(Array.from({ length: gridSize }, (_, i) => i * (gridSize + 1)))
	checkSequence(Array.from({ length: gridSize }, (_, i) => (i + 1) * (gridSize - 1)))

	return array
}

export default checkArrayForBingo
