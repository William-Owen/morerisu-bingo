import Title from "../../assets/title.svg"
import IconReset from "../../components/IconReset/IconReset"
import useBingoData from "../../hooks/useBingoData"
import type { TItem } from "../../types/TItem.type"
import Square from "../Square"

function Bingo() {
	const { itemsArray, updateBingo, resetData } = useBingoData()

	const handelClick = (index: number) => {
		const newItemsArray = [...itemsArray]
		newItemsArray[index].isMarked = !newItemsArray[index].isMarked
		updateBingo([...newItemsArray])
	}

	return (
		<div>
			<img title="Click to clear storage" className="title" width={450} src={Title} alt="Bingo" />

			<div className="board">
				{itemsArray.map((item: TItem, index: number) => {
					return (
						<Square
							onClick={handelClick}
							key={index}
							index={index}
							isBingo={item.isBingo}
							isMarked={item.isMarked}
							fontSize={item.fontSize}
							itemName={item.title}
						/>
					)
				})}
			</div>

			<p className="version">v.1.0.4</p>

			<button className="reset" type="button" onClick={resetData}>
				<IconReset />
			</button>
		</div>
	)
}

export default Bingo
