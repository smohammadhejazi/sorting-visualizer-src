import '../utils/animation.js'
import animate from '../utils/animate.js'
import Animation from '../utils/animation.js'

const mergeSort = (array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed) => {
    const arrayCopy = array.slice()
    let animations = []

    const doSort = (arr, l, r) => {
        if (l >= r) {
            return
        }

        let m = l + parseInt((r - l) / 2)
        doSort(arr, l, m)
        doSort(arr, m + 1, r)
        merge(arr, l, m, r)
    }

    const merge = (arr, l, m, r) => {
        let n1 = m - l + 1
        let n2 = r - m

        let L = new Array(n1)
        let R = new Array(n2)

        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i]
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j]

        let i = 0
        let j = 0
        let k = l

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                animations.push(new Animation(k, l + i, Animation.act.compare))
                animations.push(new Animation(k, L[i], Animation.act.exact))
                arr[k] = L[i]
                i++
            }
            else {
                animations.push(new Animation(k, m + 1 + j, Animation.act.compare))
                animations.push(new Animation(k, R[j], Animation.act.exact))
                arr[k] = R[j]
                j++
            }
            k++
        }

        while (i < n1) {
            animations.push(new Animation(k, l + i, Animation.act.compare))
            animations.push(new Animation(k, L[i], Animation.act.exact))
            arr[k] = L[i]
            i++
            k++
        }

        while (j < n2) {
            animations.push(new Animation(k, m + 1 + j, Animation.act.compare))
            animations.push(new Animation(k, R[j], Animation.act.exact))
            arr[k] = R[j]
            j++
            k++
        }
    }
    
    doSort(arrayCopy, 0, arrayCopy.length - 1)
    animate(animations, animationSpeed, array, setArray, setComparingIdxes, setSorted, setButtonDisabled)
}

export default mergeSort