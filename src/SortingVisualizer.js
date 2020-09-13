import React, {useState} from 'react'
import { Box } from '@material-ui/core'
import bubbleSort from './algorithms/bubble-sort'
import insertionSort from './algorithms/insertion-sort'
import selectionSort from './algorithms/selection-sort'
import shellSort from './algorithms/shell-sort'
import heapSort from './algorithms/heap-sort'

const SortingVisualizer = () => {
    const [speed, setSpeed] = useState(500)
    const [size, setSize] = useState(141)
    const [sorting, setSorting] = useState(false)

    const getRandomInt = (min, max) => {
        return parseInt(Math.random() * (max - min) + min)
    }

    const setSortingParams = () => {
        let sliderSize = document.getElementById('size')
        let sliderSpeed = document.getElementById('speed')
        setSize(sliderSize.value)
        setSpeed(301 - sliderSpeed.value)
    }

    const createCircles = () => {
        let numberList = []
        for (let i = 0; i < size; i++) numberList.push(getRandomInt(1, 286))
        return numberList
    }

    const [list, setList] = useState(createCircles())
    const circles = list && document.getElementsByClassName('sorting-visualizer__circle')
    const shrinkAnimation = (circleOne, circleTwo) => {
        circles[circleOne].animate([{
            width: '0px',
            height: '0px',
            marginLeft: '22.5px',
            marginRight: '22.5px',
            marginTop: '18px'
        }, {width: '35px', height: '35px', marginTop: '0px'}], {duration: speed})
        circles[circleTwo].animate([{
            width: '0px',
            height: '0px',
            marginLeft: '22.5px',
            marginRight: '22.5px',
            marginTop: '18px'
        }, {width: '35px', height: '35px', marginTop: '0px'}], {duration: speed})
    }

    const bubbleInsert = stages => {
        for (let i = 0; i < stages.length; i++) {
            if (i % 2 !== 1) {
                setTimeout(() => {
                    const [firstCircle, secondCircle] = stages[i]
                    circles[firstCircle].style.border = '4px white solid'
                    circles[secondCircle].style.border = '4px white solid'
                }, i * speed)
            } else {
                setTimeout(() => {
                    const [firstCircle, secondCircle] = stages[i]
                    circles[firstCircle].style.border = 'none'
                    circles[secondCircle].style.border = 'none'
                    shrinkAnimation(firstCircle, secondCircle)
                    let temp = circles[firstCircle].style.background
                    circles[firstCircle].style.background = circles[secondCircle].style.background
                    circles[secondCircle].style.background = temp
                    if (i === stages.length - 1) setSorting(false)
                }, i * speed)

            }
        }
    }

    const selectionShellHeap = stages => {
        for(let i = 0; i < stages.length; i++) {
            const compare  = stages[i][2].includes('compare')
            if (compare) {
                const [firstCircle, secondCircle] = stages[i]
                let borderColor = stages[i][2] === 'compare1' ? '4px white solid' : 'none'
                setTimeout(() => {
                    circles[firstCircle].style.border = borderColor
                    circles[secondCircle].style.border = borderColor
                }, i * speed)
            } else {
                setTimeout(() => {
                    const [firstCircle, secondCircle] = stages[i]
                    shrinkAnimation(firstCircle, secondCircle)
                    let temp = circles[firstCircle].style.background
                    circles[firstCircle].style.background = circles[secondCircle].style.background
                    circles[secondCircle].style.background = temp
                    if (i === stages.length - 1) setSorting(false)
                }, i * speed)
            }
        }
    }

    const sortByType = async type => {
        setSorting(true)
        switch (type) {
            case 'Bubble': {
                const stages = bubbleSort(list)
                bubbleInsert(stages)
                break
            }
            case 'Insertion': {
                const stages = insertionSort(list)
                bubbleInsert(stages)
                break
            }
            case 'Selection': {
                const stages = selectionSort(list)
                selectionShellHeap(stages)
                break
            }
            case 'Shell': {
                const stages = shellSort(list)
                selectionShellHeap(stages)
                break
            }
            case 'Heap': {
                const stages = heapSort(list)
                selectionShellHeap(stages)
                break
            }
            default:
                alert('Invalid')
                break
        }
    }

    return (
        <div className="sorting-visualizer">
            <div className="sorting-visualizer__header">
                <h1>Sorting Visualizer</h1>
                <div className="sorting-visualizer__button-container">
                    {!sorting ?
                        <div className="sorting-visualizer__algorithm" onClick={() => sortByType('Bubble')}>Bubble
                            Sort</div> : <div className="sorting sorting-visualizer__algorithm">Bubble Sort</div>}
                    {!sorting ?
                        <div className="sorting-visualizer__algorithm" onClick={() => sortByType('Insertion')}>Insertion
                            Sort</div> : <div className="sorting sorting-visualizer__algorithm">Insertion Sort</div>}
                    {!sorting ?
                        <div className="sorting-visualizer__algorithm" onClick={() => sortByType('Selection')}>Selection
                            Sort</div> : <div className="sorting sorting-visualizer__algorithm">Selection Sort</div>}
                    {!sorting ?
                        <div className="sorting-visualizer__algorithm" onClick={() => sortByType('Shell')}>Shell
                            Sort</div> : <div className="sorting sorting-visualizer__algorithm">Shell Sort</div>}
                    {!sorting ?
                        <div className="sorting-visualizer__algorithm" onClick={() => sortByType('Heap')}>Heap
                            Sort</div> : <div className="sorting sorting-visualizer__algorithm">Heap Sort</div>}
                </div>
            </div>
            {!sorting ?
                <div className="sorting-visualizer__size">Size: <input type="range" id="size" name="size" min="4"
                                                                       max="286" onChange={setSortingParams}/></div> :
                <div className="sorting sorting-visualizer__size">Size: <input type="range" id="size" name="size"
                                                                               min="4" max="286" disabled/></div>}
            {!sorting ?
                <div className="sorting-visualizer__speed">Speed: <input type="range" id="speed" name="speed" min="1"
                                                                         max="300" onChange={setSortingParams}/></div> :
                <div className="sorting sorting-visualizer__speed">Speed: <input type="range" id="speed" name="speed"
                                                                                 min="1" max="300" disabled/></div>}
            {!sorting ? <div className="sorting-visualizer__generate-array" onClick={() => setList(createCircles())}>Reset
                Array</div> : <div className="sorting sorting-visualizer__generate-array">Reset Array</div>}
            {list && <Box boxShadow={23} className="sorting-visualizer__circle-container">{
                list.map((value, index) => {
                    return <div className="sorting-visualizer__circle"
                                style={{background: `radial-gradient(circle at 65% 15%, white 1px, hsl(${value}, 100%, 50%), hsl(${value}, 100%, 30%) 60%)`}}
                                                   key={index}></div>
                })
            }</Box>}
        </div>
    )
}
export default SortingVisualizer