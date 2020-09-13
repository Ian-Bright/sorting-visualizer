const shellSort = array => {
    let stages  = []
    array = array.slice(0)
    let length = array.length
    let gap = array.length
    while (gap >= 1) {
        for (let i = 0; i < length; i += gap) {
            for (let j = i; j > 0; j -= gap) {
                if (array[j] < array[j - gap]) {
                    stages.push([j, j - gap, 'compare1'])
                    stages.push([j, j - gap, 'compare2'])
                    stages.push([j, j - gap, 'swap'])
                    let temp = array[j]
                    array[j] = array[j - gap]
                    array[j - gap] = temp
                }
            }
        }
        gap = Math.floor(gap / 2)
    }
    return stages
}
export default shellSort