
const bubbleSort = array => {
    let stages = []
    let length = array.length
    array = array.slice(0)
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length - i - 1; j++) {
            if(array[j] > array[j + 1]) {
                stages.push([j, j + 1])
                stages.push([j + 1, j])
                swap(array, j, j + 1)
            }
        }
    }
    return stages
}

const swap = (array, index1, index2) => {
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

export default bubbleSort

