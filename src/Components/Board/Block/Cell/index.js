const Cell = ({ 
    cellIndex, value, onSelect,
    selectedNumber, checkMistakes,
    isFixed, isSelected, isHighlighted, isCorrect
}) => {
    let className = "unselectable cell"
    if (isFixed)
        className += " cell-fixed"
    if (isHighlighted)
        className += " cell-highlighted"
    if (isSelected)
        className += " cell-selected"
    if (selectedNumber === value)
        className += " cell-selected-number"
    if (checkMistakes && value !== 0 && !isCorrect)
        className += " red-text"

    return (
        <div className={className} onClick={() => onSelect(cellIndex)}>
            {value !== 0 ? value : " "}
        </div>
    )
}
export default Cell