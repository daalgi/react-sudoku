const SIZE = 81
const ROWS = Math.sqrt(SIZE)
const BLOCK_SIZE = Math.sqrt(ROWS)

const FALSE_ARRAY = Array(SIZE).fill(false)
const NULL_ARRAY = Array(SIZE).fill(null)

const matrixIndices = arrayIndex =>
    [Math.floor(arrayIndex / ROWS), arrayIndex % ROWS]

const getBlockNumber = i => {
    // Given the array index `i`, 
    // get the block number, between 0 and 8, 
    // from left to right and from top to bottom.
    // Only valid for 9x9 grids.
    const [_, col] = matrixIndices(i)
    return Math.floor(i / ROWS / BLOCK_SIZE) * BLOCK_SIZE + 
        Math.floor(col / BLOCK_SIZE)
}

const isSameBlock = ({ i, index }) => {
    // Do the array indices `i` and `index` 
    // belong to the same block ?
    return getBlockNumber(i) == getBlockNumber(index)
}

const getHighlightedCells = index => {
    // Returns an array of booleans, which indicate
    // whether a cell should be highlighted or not.
    // The ones to be highlighted are in the same
    // row, column or block as the cell in the array index `index`.
    // Only valid for 9x9 grids.
    
    let [row, col] = matrixIndices(index)
    return NULL_ARRAY.map((_, i) =>
        i === row || i === col || isSameBlock({ i, index }) ? true : false)
}

const generateBoard = ({ nonEmptyCells }) => {
    return 
}

module.exports = {
    FALSE_ARRAY,
    NULL_ARRAY,
    matrixIndices,
    getBlockNumber,
    isSameBlock,
    getHighlightedCells,
    generateBoard
}