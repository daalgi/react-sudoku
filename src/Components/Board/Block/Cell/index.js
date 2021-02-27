const Cell = ({ 
    cellIndex, value, onSelect,
    isFixed, isSelected, isHighlighted
}) => {
    let className = "cell"
    if (isFixed)
        className += " cell-fixed"
    if (isHighlighted)
        className += " cell-highlighted"
    if (isSelected)
        className += " cell-selected"

    return (
        <div className={className} onClick={() => onSelect(cellIndex)}>
            {value}
        </div>
    )
}
export default Cell