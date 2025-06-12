/**
	Shuffles an array of items and returns a new shuffled array using the Fisher-Yates algorithm.
	@param array - Array of items to be shuffled.
	@returns A new array with items shuffled.
*/

const arrayShuffle = <T>(array: T[]): T[] => {
	if (!Array.isArray(array)) {
		throw new TypeError("The provided argument is not an array")
	}

	const shuffledArray = [...array]

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = shuffledArray[i]
		shuffledArray[i] = shuffledArray[j]
		shuffledArray[j] = temp
	}

	return shuffledArray
}

export default arrayShuffle
