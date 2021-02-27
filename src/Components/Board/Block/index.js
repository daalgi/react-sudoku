import Cell from './Cell'

const Block = ({ 
    cellsMatrix,
    fixedCells, highlightedCells, selectedCell, 
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
                        isFixed={fixedCells[cellIndex]}
                        isHighlighted={highlightedCells[cellIndex]}
                        isSelected={selectedCell === cellIndex}
                    />
                )}
            </div>
        )}
    </div>

export default Block