const Cell = ({ 
    cellIndex, value, onSelect,
    selectedNumber,
    isFixed, isSelected, isHighlighted
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

    return (
        <div className={className} onClick={() => onSelect(cellIndex)}>
            {value !== 0 ? value : " "}
        </div>
    )
}
export default Cell