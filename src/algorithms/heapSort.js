import '../utils/animation.js'
import animate from '../utils/animate.js'
import swap from '../utils/swap.js'
import Animation from '../utils/animation.js'

const heapSort = (array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed) => {
    const arrayCopy = array.slice()
    const animations = []

    const doSort = (arr) => {
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)
            heapify(arr, arr.length, i)
        
        for (let i = arr.length - 1; i > 0; i--)
        {
            animations.push(new Animation(i, 0, Animation.act.compare))
            animations.push(new Animation(i, 0, Animation.act.swap))
            swap(arr, i, 0)
            heapify(arr, i, 0)
        }
    }

    const heapify = (arr, arrSize, rootIdx) => {

        let largest = rootIdx
        let leftNodeIdx = rootIdx * 2 + 1
        let rightNodeIdx = rootIdx * 2 + 2

        
        if (leftNodeIdx < arrSize && arr[leftNodeIdx] > arr[largest])
        {
            animations.push(new Animation(leftNodeIdx, largest, Animation.act.compare))
            largest = leftNodeIdx
        }

        
        if (rightNodeIdx < arrSize && arr[rightNodeIdx] > arr[largest])
        {
            animations.push(new Animation(rightNodeIdx, largest, Animation.act.compare))
            largest = rightNodeIdx
        }
        
        if (largest !== rootIdx)
        {
            animations.push(new Animation(rootIdx, largest, Animation.act.compare))   
            animations.push(new Animation(rootIdx, largest, Animation.act.swap))
            swap(arr, rootIdx, largest)
            heapify(arr, arrSize, largest)
        }
    }

    doSort(arrayCopy)
    animate(animations, animationSpeed, array, setArray, setComparingIdxes, setSorted, setButtonDisabled)
}

export default heapSort;