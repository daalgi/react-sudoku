const SIZE = 81
const SIDE_LENGTH = Math.sqrt(SIZE)
const BLOCK_SIZE = Math.sqrt(SIDE_LENGTH)

const FALSE_ARRAY = Array(SIZE).fill(false)
const NULL_ARRAY = Array(SIZE).fill(null)
// const BLOCK_MATRIX = Array(BLOCK_SIZE).fill(null).map((_, row) => 
//     Array(BLOCK_SIZE).fill(null).map((_, col) => row * BLOCK_SIZE + col))
const BLOCK_MATRIX = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
const CELLS_BY_BLOCK = {
    0: [[0, 1, 2], [9, 10, 11], [18, 19, 20]],
    1: [[3, 4, 5], [12, 13, 14], [21, 22, 23]],
    2: [[6, 7, 8], [15, 16, 17], [24, 25, 26]],
    3: [[27, 28, 29], [36, 37, 38], [45, 46, 47]],
    4: [[30, 31, 32], [39, 40, 41], [48, 49, 50]],
    5: [[33, 34, 35], [42, 43, 44], [51, 52, 53]],
    6: [[54, 55, 56], [63, 64, 65], [72, 73, 74]],
    7: [[57, 58, 59], [66, 67, 68], [75, 76, 77]],
    8: [[60, 61, 62], [69, 70, 71], [78, 79, 80]],
}

const matrixIndices = arrayIndex =>
    [Math.floor(arrayIndex / SIDE_LENGTH), arrayIndex % SIDE_LENGTH]


const getRowNumber = i => {
    // Given the array index `i`, 
    // get the row number, between 0 and 8.
    // Only valid for 9x9 grids.
    return matrixIndices(i)[0]
}
const getColumnNumber = i => {
    // Given the array index `i`, 
    // get the column number, between 0 and 8.
    // Only valid for 9x9 grids.
    return matrixIndices(i)[1]
}
const getBlockNumber = i => {
    // Given the array index `i`, 
    // get the block number, between 0 and 8, 
    // from left to right and from top to bottom.
    // Only valid for 9x9 grids.
    const [_, col] = matrixIndices(i)
    return Math.floor(i / SIDE_LENGTH / BLOCK_SIZE) * BLOCK_SIZE +
        Math.floor(col / BLOCK_SIZE)
}

const areInSameRow = ({ i, index }) => {
    // Do the array indices `i` and `index` 
    // belong to the same row ?
    return getRowNumber(i) === getRowNumber(index)
}
const areInSameColumn = ({ i, index }) => {
    // Do the array indices `i` and `index` 
    // belong to the same column ?
    return getColumnNumber(i) === getColumnNumber(index)
}
const areInSameBlock = ({ i, index }) => {
    // Do the array indices `i` and `index` 
    // belong to the same block ?
    return getBlockNumber(i) === getBlockNumber(index)
}

const getHighlightedCells = index => {
    // Returns an array of booleans, which indicate
    // whether a cell should be highlighted or not.
    // The ones to be highlighted are in the same
    // row, column or block as the cell in the array index `index`.
    // Only valid for 9x9 grids.

    let [row, col] = matrixIndices(index)
    return FALSE_ARRAY.map((_, i) =>
        areInSameRow({ i, index }) ||
            areInSameColumn({ i, index }) ||
            areInSameBlock({ i, index }) ? true : false)
}


/**
 * Shuffle array - Fisher-Yates algorithm.
 * Mutable. 
 * @param {array} arr 
 */
const shuffle = arr => {
    let j, temp
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        // [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

/**
 * Random choice of an element within an array
 * @param {array} arr 
 */
const choice = arr =>
    arr[Math.floor(Math.random() * arr.length)]

/**
 * Randomly cipher the numbers in the Sudoku array.
 * Mutable.
 * @param {array} arr - Sudoku array
 */
const cipher = arr => {
    let mask = Array(SIDE_LENGTH).fill(0).map((_, i) => i + 1)
    shuffle(mask)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = mask[arr[i] - 1]
    }
    return arr
}

/**
 * Returns a random row index within the block
 * to which `i` belongs to.
 * Used to swap valid rows or columns.
 * @param {integer} i 
 */
const randomIntWithinBlockIndex = i => {
    let arr = []
    if ([0, 1, 2].includes(i)) {
        arr = [0, 1, 2]
    } else if ([3, 4, 5].includes(i)) {
        arr = [3, 4, 5]
    } else {
        arr = [6, 7, 8]
    }
    return choice(arr.filter(v => v != i))
}

/**
 * Returns an array of two integers, which
 * are the indices of rows or columns to be
 * swapped within a block 
 */
const randomIndicesPairWithinBlock = () => {
    let i = Math.floor(Math.random() * SIDE_LENGTH)
    return [i, randomIntWithinBlockIndex(i)]
}

/**
 * Swaps two rows `i` and `j` in a Sudoku array .
 * Mutable.
 * @param {array} arr - Sudoku array
 * @param {integer} i - row
 * @param {integer} j - row 
 */
const swapRow = (arr, i, j) => {
    let temp = undefined
    for (let col = 0; col < SIDE_LENGTH; col++) {
        temp = arr[SIDE_LENGTH * i + col]
        arr[SIDE_LENGTH * i + col] = arr[SIDE_LENGTH * j + col]
        arr[SIDE_LENGTH * j + col] = temp
    }
    return arr
}

/**
 * Swaps two columns `i` and `j` in a Sudoku array.
 * Mutable.
 * @param {array} arr - Sudoku array
 * @param {integer} i - column
 * @param {integer} j - column
 */
const swapColumn = (arr, i, j) => {
    let temp = undefined
    for (let row = 0; row < SIDE_LENGTH; row++) {
        temp = arr[row * SIDE_LENGTH + i]
        arr[row * SIDE_LENGTH + i] = arr[row * SIDE_LENGTH + j]
        arr[row * SIDE_LENGTH + j] = temp
    }
    return arr
}

/**
 * Rotates 90 degrees the Sudoku grid.
 * Non-mutable.
 * @param {array} arr - Sudoku array
 */
const rotate = arr => {
    let copy = Array(SIZE).fill(0)
    for (let row = 0; row < SIDE_LENGTH; row++) {
        for (let col = 0; col < SIDE_LENGTH; col++) {
            copy[col * SIDE_LENGTH + SIDE_LENGTH - 1 - row] = arr[row * SIDE_LENGTH + col]
        }
    }
    return copy
}

/**
 * Vertical mirroring.
 * Non-mutable
 * @param {array} arr - Sudoku array
 */
const verticalMirroring = arr => {
    let copy = Array(SIZE).fill(0)
    for (let row = 0; row < SIDE_LENGTH; row++) {
        for (let col = 0; col < SIDE_LENGTH; col++) {
            copy[row * SIDE_LENGTH + col] = arr[(SIDE_LENGTH - row - 1) * SIDE_LENGTH + col]
        }
    }
    return copy
}

/**
 * Horizontal mirroring.
 * Non-mutable
 * @param {array} arr - Sudoku array
 */
const horizontalMirroring = arr => {
    let copy = Array(SIZE).fill(0)
    for (let row = 0; row < SIDE_LENGTH; row++) {
        for (let col = 0; col < SIDE_LENGTH; col++) {
            copy[row * SIDE_LENGTH + col] = arr[row * SIDE_LENGTH + (SIDE_LENGTH - col - 1)]
        }
    }
    return copy
}

const DEFAULT_SUDOKU = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    9, 1, 2, 3, 4, 5, 6, 7, 8,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    8, 9, 1, 2, 3, 4, 5, 6, 7,
]

const generateBoard = ({ nonEmptyCells }) => {
    let emptyCells = SIZE - nonEmptyCells

    // Generate a valid solution
    let solution = cipher([...DEFAULT_SUDOKU])
    // let solution = [...DEFAULT_SUDOKU]    
    swapRow(solution, ...randomIndicesPairWithinBlock())
    swapColumn(solution, ...randomIndicesPairWithinBlock())
    
    solution = rotate(solution)
    swapRow(solution, ...randomIndicesPairWithinBlock())
    swapColumn(solution, ...randomIndicesPairWithinBlock())
    
    solution = verticalMirroring(solution)
    swapRow(solution, ...randomIndicesPairWithinBlock())
    swapColumn(solution, ...randomIndicesPairWithinBlock())
    
    solution = horizontalMirroring(solution)
    swapRow(solution, ...randomIndicesPairWithinBlock())
    swapColumn(solution, ...randomIndicesPairWithinBlock())

    // Empty random cells
    let grid = [...solution]
    let i
    while (emptyCells > 0) {
        // Random index
        i = Math.floor(Math.random() * SIZE)
        // let [row, col] = matrixIndices(i)
        
        if (grid[i] != 0) {
            grid[i] = 0
            // Subtract the emptied cells
            emptyCells--
        }
        

        // Symmetric index
        // j = (SIDE_LENGTH - 1 - row) * SIDE_LENGTH + SIDE_LENGTH - 1 - col
        // grid[j] = 0

        
    }

    return [grid, solution]
}

const GRID_INPUTS = Array(SIZE).fill(null).map(() => [])

module.exports = {
    FALSE_ARRAY,
    NULL_ARRAY,
    GRID_INPUTS,
    BLOCK_MATRIX,
    CELLS_BY_BLOCK,
    matrixIndices,
    getBlockNumber,
    getHighlightedCells,
    generateBoard
}