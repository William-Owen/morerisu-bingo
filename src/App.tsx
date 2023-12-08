import Title from './assets/title.svg'
import Reset from './assets/restart.svg'
import Square from './components/Square'
import useBingoData from './hooks/useBingoData'
import type { TItem } from './types/TItem.type'
import IconReset from './components/IconReset/IconReset'

function App() {

	const {itemsArray, setData, resetData} = useBingoData()

	const handelClick = (index:number) => {
		const newItemsArray = [...itemsArray]
		newItemsArray[index].isMarked = !newItemsArray[index].isMarked
		setData([...newItemsArray])
	}

	return (

		<>
			
			<img className="title" width={450} src={Title} alt="Bingo" />

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

			<button className="reset" onClick={resetData}>
				<IconReset />
			</button>

		</>

	)
}

export default App
