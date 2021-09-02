export default class Animation{
    static act = Object.freeze({"compare":0, "swap":1, "exact":2})

    constructor(firstBar, secondBar, action)
    {
        this.firstBar = firstBar
        this.secondBar = secondBar
        this.action = action
    }
}