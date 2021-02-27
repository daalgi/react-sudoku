import Cell from './Cell'

const Block = ({ 
    cellsMatrix,
    fixedCells, highlightedCells, selectedCell, selectedNumber,
    onSelectCell,
    grid
}) =>
    <div className="block">
        {cellsMatrix.map((row, rowIndex) =>
            <div className="row" key={rowIndex}> {
                row.map((cellIndex, colIndex) =>
                    <Cell
                        key={colIndex}
                        cellIndex={cellIndex}
                        value={grid[cellIndex]}
                        onSelect={onSelectCell}
                        selectedNumber={selectedNumber}
                        isFixed={fixedCells[cellIndex]}
                        isHighlighted={highlightedCells[cellIndex]}
                        isSelected={selectedCell === cellIndex}
                    />
                )}
            </div>
        )}
    </div>

export default Block