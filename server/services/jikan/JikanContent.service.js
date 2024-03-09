class JikanService {
    constructor() {
        this.path = `${process.env.JIKAN_PATH}`
    }

    findById = (id) => fetch(`${this.path}/${id}`).then(res => res.json()).then(res => res.data)
    findByName = name => fetch(`${this.path}?q="${name}"`).then(res => res.json()).then(res => {
        console.log("FETCH: ", `${this.path}?q="${name}"`)
        console.log(res)
        return res.data
    })
}

module.exports = require('../../bin/Singleton')(new JikanService())

// NOTE: Existe una version del findByID del anime full fetch(`${this.path}/${id}/full`)