import { useState, useEffect } from 'react'
import useKeyPress from './hooks/useKeyPress'
import './App.css'
import Header from './Components/Header'
import Board from './Components/Board'
import Controls from './Components/Controls'
import {
    FALSE_ARRAY, GRID_INPUTS,
    getHighlightedCells, generateBoard
} from './utils'


function App() {
    const [time, setTime] = useState(0)
    const [nonEmptyCells, setNonEmptyCells] = useState(35)
    const [fixedCells, setFixedCells] = useState(FALSE_ARRAY)
    const [grid, setGrid] = useState([])
    const [solution, setSolution] = useState([])
    const [selectedCell, setSelectedCell] = useState(null)
    const [highlightedCells, setHighlightedCells] = useState(FALSE_ARRAY)
    const [selectedNumber, setSelectedNumber] = useState(0)
    const [gridInputStack, setGridInputStack] = useState([])
    const [inputCellIndexStack, setInputCellIndexStack] = useState([])

    useEffect(() => {
        handleNewGame()
    }, [])

    useEffect(() => {
        // Timer
        let interval = setInterval(() => setTime(time + 1), 1000)
        return () => clearInterval(interval)
    }, [time])

    useKeyPress((e) => {
        // e.preventDefault()
        if (selectedCell == null || fixedCells[selectedCell])
            return
        if (e.key > 0 && e.key < 10)
            handleInput(parseInt(e.key))
        else if (e.key === "Delete")
            handleDelete()
        else if (e.key === "h")
            handleHint()
        else if (e.key === "u")
            handleUndo()
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
        if (!fixedCells[selectedCell])
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

    const handleChangeDifficulty = value =>
        setNonEmptyCells(parseInt(value))

    const handleNewGame = () => {
        const [newGrid, newSolution] = generateBoard({ nonEmptyCells })
        setGrid(newGrid)
        setSolution(newSolution)
        setGridInputStack(GRID_INPUTS.map(() => []))
        setFixedCells(newGrid.map(v => v ? true : false))
        setSelectedNumber(false)
        setTime(0)
    }

    // console.log(({
    //     selectedCell, 
    //     isFixed: fixedCells[selectedCell],
    //     value: grid[selectedCell]
    // }))
    // console.log('------')
    // console.log(inputCellIndexStack)
    // console.log()
    console.log(nonEmptyCells)

    return (
        <div className="App">
            <Header
                onNewGame={handleNewGame}
                time={time}
                nonEmptyCells={nonEmptyCells}
                onChangeDifficulty={handleChangeDifficulty}
            />
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