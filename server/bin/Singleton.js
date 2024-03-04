module.exports = fn => new class {
    #instance
    constructor(fn) {
        if (!this.#instance) this.#instance = fn
        return this.#instance
    }
}(fn)