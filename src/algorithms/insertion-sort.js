const insertionSort = array => {
    let stages = []
    array = array.slice(0)
    let length = array.length
    for(let i = 1; i < length; i++) {
        let current = array[i]
        let j = i - 1
        while((j > -1) && (current < array[j])) {
            stages.push([j, j + 1])
            stages.push([j + 1, j])
            array[j + 1] = array[j]
            j--
        }
        array[j + 1] = current
    }
    return stages
}

export default insertionSort