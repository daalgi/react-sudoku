import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Board from './Components/Board'
import {
    FALSE_ARRAY, NULL_ARRAY, getHighlightedCells, generateBoard
} from './utils'

function App() {
    const [nonEmptyCells, setNonEmptyCells] = useState(35)
    const [fixedCells, setFixedCells] = useState(FALSE_ARRAY)
    const [grid, setGrid] = useState(NULL_ARRAY)
    const [selectedCell, setSelectedCell] = useState(0)
    const [highlightedCells, setHighlightedCells] = useState(FALSE_ARRAY)
    const [selectedNumber, setSelectedNumber] = useState(0)
    const [cellsClassNames, setCellsClassNames] = useState(NULL_ARRAY)

    const handleSelect = index => {
        const number = grid[index]
        setHighlightedCells(getHighlightedCells(index))
        setSelectedCell(index)
        if (number !== 0)
            setSelectedNumber(number)
    }

    const handleNewGame = () => {
        let arr = generateBoard({ nonEmptyCells })
    }

    // console.log(isSameBlock({ i: 31, index: 50 }))
    return (
        <div className="App">
            <Header />
            <Board fixedCells grid handleSelect />
            {/* <h1>{isSameBlock({ i: 0, arrayIndex: 1})}</h1> */}
        </div>
    )
}

export default App