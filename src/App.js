import { useState, useEffect } from 'react'
import useKeyPress from './hooks/useKeyPress'
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
    const [selectedCell, setSelectedCell] = useState(null)
    const [highlightedCells, setHighlightedCells] = useState(FALSE_ARRAY)
    const [selectedNumber, setSelectedNumber] = useState(0)

    useEffect(() => {
        // Initialize parameters
        const newFixedCells = [...fixedCells]
        newFixedCells[0] = true
        newFixedCells[1] = true
        newFixedCells[2] = true
        setFixedCells(newFixedCells)
    }, [])

    useKeyPress(({ key }) => {
        if (selectedCell == null || fixedCells[selectedCell])
            return            
        if (key > 0 && key <= 9) 
            handleInput(key)
        else if (key === "Delete")
            handleDelete()
    })

    const handleSelectCell = index => {
        const number = grid[index]
        setHighlightedCells(getHighlightedCells(index))
        setSelectedCell(index)
        setSelectedNumber(number > 0 ? number : null)
    }

    const handleInput = number => {
        if (number > 0 && number < 10)
            setGrid(grid.map((n, i) => i === selectedCell ? parseInt(number) : n))
    }

    const handleDelete = () => 
        setGrid(grid.map((n, i) => i === selectedCell ? " " : n))
    
    const handleNewGame = () => {
        let arr = generateBoard({ nonEmptyCells })
    }

    // console.log(({
    //     selectedCell, 
    //     isFixed: fixedCells[selectedCell],
    //     value: grid[selectedCell]
    // }))

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