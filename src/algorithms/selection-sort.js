const selectionSort = array => {
    let stages = []
    let length = array.length
    array = array.slice(0)
    for (let i = 0; i < length - 1; i++) {
        let smallestIdx = i
        for (let j = i + 1; j < array.length; j++) {
            stages.push([smallestIdx, j, 'compare1'])
            stages.push([smallestIdx, j, 'compare2'])
            if (array[j] < array[smallestIdx]) smallestIdx = j
        }
        stages.push([i, smallestIdx, 'swap'])
        let temp = array[i]
        array[i] = array[smallestIdx]
        array[smallestIdx] = temp
    }
    return stages
}

export default selectionSort