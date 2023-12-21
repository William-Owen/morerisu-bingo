import clsx from 'clsx';
import logo from '../../assets/logo-santa.svg'
import './Square.css'

interface SquareProps {
	index: number
	itemName: string
	fontSize: number
	isMarked?: boolean
	isBingo?: boolean
	onClick: (index:number) => void
}

const Square:React.FC<SquareProps> = ({ index, isBingo, isMarked, fontSize, itemName, onClick }) => {

	const handleClick = () => onClick(index)

	const rootStyle = clsx([
		{
			"notMarked": !isMarked,
			"marked": isMarked,
			"bingo": isBingo
		}, 
		"square"
	])

	return (
		<div onClick={handleClick} style={{"fontSize": `${fontSize}rem`}} className={rootStyle}>
			<div className={"container"}>
				<div className={"squareLabel"}>
					{itemName}
				</div>
				<div className={"squareLogo"}>
					<img src={logo} />
				</div>
			</div>
		</div>
	)

}

export default Square