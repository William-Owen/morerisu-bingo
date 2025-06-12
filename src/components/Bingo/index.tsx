import Square from '../Square'
import useBingoData from '../../hooks/useBingoData'
import type { TItem } from '../../types/TItem.type'
import IconReset from '../../components/IconReset/IconReset'
import Title from '../../assets/title.svg'

function Bingo() {

	const {itemsArray, updateBingo, resetData, isLoading, isError} = useBingoData()

	const handelClick = (index:number) => {
		const newItemsArray = [...itemsArray]
		newItemsArray[index].isMarked = !newItemsArray[index].isMarked
		updateBingo([...newItemsArray])
	}

	const ClearLocalStorage = () => {

		console.log('Local storage cleared')
	}

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error loading data</p>

	return (

		<div>

			<img title='Click to clear storage' onClick={ClearLocalStorage} className="title" width={450} src={Title} alt="Bingo" />

			<div className="board">
				{itemsArray.map((item:TItem, index:number) => {
					return <Square 
						onClick={handelClick} 
						key={index} 
						index={index} 
						isBingo={item.isBingo} 
						isMarked={item.isMarked} 
						fontSize={item.fontSize} 
						itemName={item.title} />
				})}
			</div>

			<p className='version'>v.1.0.4</p>

			<button className="reset" onClick={resetData}>
				<IconReset />
			</button>

		</div>

	)
}

export default Bingo
