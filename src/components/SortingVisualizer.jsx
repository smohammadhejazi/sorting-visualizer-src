import { useEffect, useState } from "react";
import { Slider } from "@material-ui/core";
import '../css/SortingVisualizer.css'
import bubbleSort from '../algorithms/bubbleSort.js'
import mergeSort from '../algorithms/mergeSort.js'
import quickSort from "../algorithms/quickSort.js";
import heapSort from "../algorithms/heapSort.js";

const MAX_NUMBER = 150
const MIN_NUMBER = 20
const MIN_DELAY = 5
const MAX_DELAY = 50

const SortingVisualizer = () => {
    const [array, setArray] = useState([])
    const [comparigIdxes, setComparingIdxes] = useState({ 'first': null, 'second': null })
    const [sorted, setSorted] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [numberOfBars, setNumberOfBars] = useState(85)
    const [animationSpeed, setAnimationSpeed] = useState(5)

    useEffect(() => {
        generateArray(numberOfBars)
    }, [numberOfBars])

    const generateArray = (size) => {
        setSorted(false)
        setComparingIdxes({ 'first': null, 'second': null })
        setArray(new Array(size).fill().map(() => randomNumber(MIN_NUMBER, MAX_NUMBER)))
    }

    const handleChange = (event, newValue) => {
        if (numberOfBars !== newValue)
        {
            let newSpeed = MAX_DELAY - (((newValue - MIN_NUMBER) / (MAX_NUMBER - MIN_NUMBER)) * (MAX_DELAY - MIN_DELAY))
            setNumberOfBars(newValue)
            setAnimationSpeed(newSpeed)
            generateArray(newValue)

        }
    };

    return (
        <div className='container'>
            <div className='buttons-container'>
                <div className='generate-container'> 
                    <button className="button" disabled={buttonDisabled} onClick={() => generateArray(numberOfBars)}>Generate</button>
                </div>
                <div className='slider-container'>
                    <div className='slider-text'>Size of array</div>
                    <Slider disabled={buttonDisabled} defaultValue={numberOfBars} step={1} min={MIN_NUMBER} max={MAX_NUMBER} onChange={handleChange} style={{color: 'white' }}/>
                </div>
                <div className='algorithms-container'>
                    <button className="button" disabled={buttonDisabled} onClick={() => bubbleSort(array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed)}>Bubble Sort</button>
                    <button className="button" disabled={buttonDisabled} onClick={() => mergeSort(array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed)}>Merge Sort</button>
                    <button className="button" disabled={buttonDisabled} onClick={() => quickSort(array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed)}>Quick Sort</button>
                    <button className="button" disabled={buttonDisabled} onClick={() => heapSort(array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed)}>Heap Sort</button>
                </div>
            </div>
            <div className='bars-container'>
                {array.map((value, idx) => (
                    <div className={`bar ${(comparigIdxes.first === idx || comparigIdxes.second === idx) ? 'comparing-bar' : sorted ? 'sorted' : ''}`} key={idx} style={{
                        height: `${(value - MIN_NUMBER) / (MAX_NUMBER - MIN_NUMBER) * 99 + 1}%`,
                        width: `${100 / numberOfBars}%`,
                    }}></div>
                ))}
            </div>
        </div>
    )
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default SortingVisualizer;
