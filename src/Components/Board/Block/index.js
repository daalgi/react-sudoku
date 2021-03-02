import Cell from './Cell'

const Block = ({
    cellsMatrix, checkMistakes,
    fixedCells, highlightedCells, selectedCell, selectedNumber,
    onSelectCell,
    grid, solution
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
                        checkMistakes={checkMistakes}
                        isFixed={fixedCells[cellIndex]}
                        isHighlighted={highlightedCells[cellIndex]}
                        isSelected={selectedCell === cellIndex}
                        isCorrect={
                            grid[cellIndex] === solution[cellIndex] ? 
                            true : 
                            false
                        }
                    />
                )}
            </div>
        )}
    </div>

export default Block