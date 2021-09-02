import '../utils/animation.js'
import animate from '../utils/animate.js'
import swap from '../utils/swap.js'
import Animation from '../utils/animation.js'

const bubbleSort = (array, setArray, setComparingIdxes, setSorted, setButtonDisabled, animationSpeed) => {
    const arrayCopy = array.slice()
    const animations = []

    for (let i = 0; i < arrayCopy.length; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
            animations.push(new Animation(j, j + 1, Animation.act.compare))
            if (arrayCopy[j] > arrayCopy[j + 1]) {
                animations.push(new Animation(j, j + 1, Animation.act.swap))
                swap(arrayCopy, j, j + 1)
            }
        }
    }

    animate(animations, animationSpeed, array, setArray, setComparingIdxes, setSorted, setButtonDisabled)
}

export default bubbleSort;