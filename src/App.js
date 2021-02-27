import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Board from './Components/Board'
import {
    FALSE_ARRAY, NULL_ARRAY, BLOCK_MATRIX,
    CELLS_BY_BLOCK,
    getHighlightedCells, generateBoard
} from './utils'


function App() {
    const [nonEmptyCells, setNonEmptyCells] = useState(35)
    const [fixedCells, setFixedCells] = useState(FALSE_ARRAY)
    const [grid, setGrid] = useState(generateBoard)
    const [selectedCell, setSelectedCell] = useState(0)
    const [highlightedCells, setHighlightedCells] = useState(FALSE_ARRAY)
    const [selectedNumber, setSelectedNumber] = useState(0)

    useEffect(() => {
        const newFixedCells = [...fixedCells]
        newFixedCells[0] = true
        newFixedCells[1] = true
        newFixedCells[2] = true
        setFixedCells(newFixedCells)
    }, [])

    const handleSelectCell = index => {
        const number = grid[index]
        setHighlightedCells(getHighlightedCells(index))
        setSelectedCell(index)
        setSelectedNumber(number)
    }

    const handleNewGame = () => {
        let arr = generateBoard({ nonEmptyCells })
    }

    return (
        <div className="App">
            <Header />
            <Board
                fixedCells={fixedCells}
                highlightedCells={highlightedCells}
                selectedCell={selectedCell}
                selectedNumber={selectedNumber}
                onSelectCell={handleSelectCell}
                grid={grid}
            />
        </div>
    )
}

export default App