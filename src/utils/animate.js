import Animation from '../utils/animation.js'
import swap from '../utils/swap.js'

export default function animate(animations, animationSpeed, array, setArray, setComparingIdxes, setSorted, setButtonDisabled) {
    console.log(animationSpeed);
    setButtonDisabled(true)
    setSorted(false)

    for (let i = 0; i < animations.length; i++) {
        if (animations[i].action === Animation.act.compare) {
            setTimeout(() => setComparingIdxes({ 'first': animations[i].firstBar, 'second': animations[i].secondBar }), i * animationSpeed)
        }
        else if (animations[i].action === Animation.act.swap) {
            setTimeout(() => {
                swap(array, animations[i].firstBar, animations[i].secondBar)
                setArray(array)
            }, i * animationSpeed)
        }
        else if (animations[i].action === Animation.act.exact) {
            setTimeout(() => {
                array[animations[i].firstBar] = animations[i].secondBar
                setArray(array)
            }, i * animationSpeed)
        }
    }
    setTimeout(() => {
        setComparingIdxes({ 'first': null, 'second': null })
        setSorted(true)
        setButtonDisabled(false)
    }, animations.length * animationSpeed)
}