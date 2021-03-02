import Block from './Block'
import { BLOCK_MATRIX, CELLS_BY_BLOCK } from '../../utils'


const Board = ({
    fixedCells, highlightedCells, selectedCell, selectedNumber,
    onSelectCell, 
    grid, solution, checkMistakes
}) =>
    <div className="board">
        {BLOCK_MATRIX.map((row, rowIndex) =>
            <div className="block-row" key={rowIndex}>
                {row.map((blockIndex, colIndex) => {
                    return <Block
                        key={colIndex}
                        checkMistakes={checkMistakes}
                        cellsMatrix={CELLS_BY_BLOCK[blockIndex]}
                        fixedCells={fixedCells}
                        highlightedCells={highlightedCells}
                        selectedCell={selectedCell}
                        selectedNumber={selectedNumber}
                        onSelectCell={onSelectCell}
                        grid={grid}
                        solution={solution}
                    />
                }
                )}
            </div>
        )}
    </div>

export default Board