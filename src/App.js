import { useState, useEffect } from 'react'
import useKeyPress from './hooks/useKeyPress'
import './App.css'
import Header from './Components/Header'
import Board from './Components/Board'
import Controls from './Components/Controls'
import {
    FALSE_ARRAY, NULL_ARRAY, BLOCK_MATRIX,
    CELLS_BY_BLOCK, GRID_INPUTS,
    getHighlightedCells, generateBoard
} from './utils'


function App() {
    const [nonEmptyCells, setNonEmptyCells] = useState(20)
    const [fixedCells, setFixedCells] = useState(FALSE_ARRAY)
    const [grid, setGrid] = useState([])
    const [solution, setSolution] = useState([])
    const [selectedCell, setSelectedCell] = useState(null)
    const [highlightedCells, setHighlightedCells] = useState(FALSE_ARRAY)
    const [selectedNumber, setSelectedNumber] = useState(0)
    const [gridInputStack, setGridInputStack] = useState([])
    const [inputCellIndexStack, setInputCellIndexStack] = useState([])

    useEffect(() => {
        // Initialize parameters
        const [newGrid, newSolution] = generateBoard({ nonEmptyCells })
        setGrid(newGrid)
        setSolution(newSolution)
        setGridInputStack(GRID_INPUTS.map((v, i) => [newGrid[i]]))
        setFixedCells(newGrid.map(v => v ? true : false))
        setSelectedNumber(false)
    }, [])

    useKeyPress((e) => {
        // e.preventDefault()
        if (selectedCell == null || fixedCells[selectedCell])
            return
        if (e.key > 0 && e.key < 10)
            handleInput(parseInt(e.key))
        else if (e.key === "Delete")
            handleDelete()
    })

    const handleSelectCell = index => {
        const number = grid[index]
        
        setHighlightedCells(getHighlightedCells(index))
        setSelectedCell(index)
        setSelectedNumber(number > 0 ? number : null)
    }

    const handleInput = number => {
        if (number > -1 && number < 10) {
            // Update the grid
            setGrid(grid.map((n, i) => i === selectedCell ? parseInt(number) : n))
            
            // Update the `gridInputStack` with the 
            // added number to the current cell
            // to keep track of the order of inputs and allow undo
            setGridInputStack(gridInputStack.map((v, i) =>
                i === selectedCell ? [...v, number] : v))

            // Add the current cell index to know the order of the inputs
            setInputCellIndexStack([...inputCellIndexStack, selectedCell])

            // If the input was a number (not a 0 or `delete`),
            // update the current selected number (for highlighting)
            if (number > 0)
                setSelectedNumber(number)
        }
    }

    const handleDelete = () => {
        // If the cell is not fixed, delete the number it contains
        if(!fixedCells[selectedCell])
            handleInput(0)
    }

    const handleUndo = () => {
        // If there's no element in the `inputCellIndexTack`, do nothing
        if (!inputCellIndexStack.length)
            return

        // Remove the last value of the last cell input
        let lastCellIndex = inputCellIndexStack[inputCellIndexStack.length - 1]
        let newGridInputStack = gridInputStack.map((v, i) =>
            i === lastCellIndex ? v.slice(0, -1) : v)

        // Update the value in the grid with the previous one
        let prev = newGridInputStack[lastCellIndex].slice(-1)[0]
        setGrid(grid.map((v, i) => i === lastCellIndex ? prev : v))

        // Update the input stack related state variables
        setGridInputStack(newGridInputStack)
        setInputCellIndexStack(inputCellIndexStack.slice(0, -1))
    }

    const handleHint = () => {
        // If the cell is not fixed, input the solution
        if (!fixedCells[selectedCell]) {
            handleInput(solution[selectedCell])
        }
    }

    const handleNewGame = () => {
        let arr = generateBoard({ nonEmptyCells })
    }

    // console.log(({
    //     selectedCell, 
    //     isFixed: fixedCells[selectedCell],
    //     value: grid[selectedCell]
    // }))
    // console.log('------')
    // console.log(inputCellIndexStack)
    // console.log()

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
            <Controls
                onNumberClick={handleInput}
                onUndo={handleUndo}
                onDelete={handleDelete}
                onHint={handleHint}
            />
        </div>
    )
}

export default App