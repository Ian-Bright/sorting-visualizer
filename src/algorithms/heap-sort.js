const heapSort = array => {
    let stages = []
    let length = array.length;
    array = array.slice(0)
    for (let i = Math.floor(length / 2); i >= 0; i--) {
        convert(array, i, length, stages)
    }
    for (let i = length - 1; i > 0; i--) {
        swap(array, 0, i, stages)
        length--;
        convert(array, 0, length, stages)
    }
    return stages
}

    const convert = (arr, index, arrLength, stages) => {
        let leftIndex = 2 * index + 1
        let rightIndex = 2 * index + 2

        let max = index
        if (leftIndex < arrLength && arr[leftIndex] > arr[max]) {
            stages.push([leftIndex, max, 'compare1'])
            stages.push([leftIndex, max, 'compare2'])
            max = leftIndex
        }
        if (rightIndex < arrLength && arr[rightIndex] > arr[max]) {
            stages.push([rightIndex, max, 'compare1'])
            stages.push([rightIndex, max, 'compare2'])
            max = rightIndex
        }
        if (max !== index) {

            swap(arr, index, max, stages)
            convert(arr, max, arrLength, stages)
        }
    }

    const swap = (arr, firstIndex, lastIndex, stages) => {
        stages.push([firstIndex, lastIndex, 'swap'])
        let temp = arr[firstIndex]
        arr[firstIndex] = arr[lastIndex]
        arr[lastIndex] = temp
}

export default heapSort