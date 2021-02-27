const SIZE = 81
const ROWS = Math.sqrt(SIZE)
const BLOCK_SIZE = Math.sqrt(ROWS)

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
    [Math.floor(arrayIndex / ROWS), arrayIndex % ROWS]


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
    return Math.floor(i / ROWS / BLOCK_SIZE) * BLOCK_SIZE +
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

// const generateBoard = ({ nonEmptyCells }) => {
//     return [
//         [1, 2, 3, 4, 5, 6, 7, 8, 9],
//         [7, 8, 9, 1, 2, 3, 4, 5, 6],
//         [4, 5, 6, 7, 8, 9, 1, 2, 3],
//         [3, 4, 5, 6, 7, 8, 9, 1, 2],
//         [9, 1, 2, 3, 4, 5, 6, 7, 8],
//         [6, 7, 8, 9, 1, 2, 3, 4, 5],
//         [5, 6, 7, 8, 9, 1, 2, 3, 4],
//         [2, 3, 4, 5, 6, 7, 8, 9, 1],
//         [8, 9, 1, 2, 3, 4, 5, 6, 7],
//     ]
// }
const generateBoard = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    9, 1, 2, 3, 4, 5, 6, 7, 8,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    8, 9, 1, 2, 3, 4, 5, 6, 0,
]

module.exports = {
    FALSE_ARRAY,
    NULL_ARRAY,
    BLOCK_MATRIX,
    CELLS_BY_BLOCK,
    matrixIndices,
    getBlockNumber,
    getHighlightedCells,
    generateBoard
}