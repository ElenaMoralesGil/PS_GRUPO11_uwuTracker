module.exports = fn => new class {
    #instance
    constructor(fn) {
        if (!this.#instance) {
            this.#instance = fn
            console.log('INSSTANCE');

        }
        return this.#instance
    }
}(fn)