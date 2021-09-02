import '../utils/animation.js'
import animate from '../utils/animate.js'
import swap from '../utils/swap.js'
import Animation from '../utils/animation.js'

const quickSort = (array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed) => {
    const arrayCopy = array.slice()
    const animations = []

    const doSort = (arr, start, end) => {
        if (start < end) {
            let pivot = partition(arr, start, end)
            doSort(arr, start, pivot - 1)
            doSort(arr, pivot + 1, end)
        }
    }

    const partition = (arr, start, end) => {
        let j = start
        for (let i = start; i < end; i++)
        {
            animations.push(new Animation(i, end, Animation.act.compare))
            if (arr[i] < arr[end])
            {
                animations.push(new Animation(i, j, Animation.act.swap))
                swap(arr, i, j)
                j++
            }
        }

        animations.push(new Animation(j, end, Animation.act.swap))
        swap(arr, j, end)
        return j
    }

    doSort(arrayCopy, 0, arrayCopy.length - 1)
    animate(animations, animationSpeed, array, setArray, setComparingIdxes, setSorted, setButtonDisabled)
}

export default quickSort;