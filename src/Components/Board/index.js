import Block from './Block'
import { BLOCK_MATRIX, CELLS_BY_BLOCK } from '../../utils'


const Board = ({
    fixedCells, highlightedCells, selectedCell, 
    onSelectCell,
    grid
}) =>
    <div className="board">
        {BLOCK_MATRIX.map((row, rowIndex) =>
            <div className="block-row" key={rowIndex}>
                {row.map((blockIndex, colIndex) => {
                    return <Block
                        key={colIndex}
                        cellsMatrix={CELLS_BY_BLOCK[blockIndex]}
                        fixedCells={fixedCells}
                        highlightedCells={highlightedCells}
                        selectedCell={selectedCell}
                        onSelectCell={onSelectCell}
                        grid={grid}
                    />
                }
                )}
            </div>
        )}
    </div>

export default Board