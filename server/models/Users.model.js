const User = require("../schemas/User.schema")


class Users {
    #service
    constructor() {
        this.#service = require('../services/firebase/FirebaseUsers.service')
    }

    findById = id => this.#service.findById(id)
    find = queryObj => this.#service.find(queryObj)
    findOne = queryObj => this.#service.findOne(queryObj)
    create = user => this.#service.create(user)
    update = (id, userProps) => this.#service.update(id, userProps)
    getContentsFromList = (userId, listField) => this.#service.getContentsFromList(userId, listField)
    checkOnList =  async (contentId, nameList, userId) => this.#service.checkOnList(contentId, nameList, userId);
    trackingList = (userId,contentId, listField) => this.#service.trackingList(userId, contentId, listField)
    isOnList = (userId, contentId) => this.#service.isOnList(userId, contentId)
    incrementEpisodesCount = (userId, contentId) => this.#service.incrementEpisodesCount(userId, contentId)
    decrementEpisodesCount = (userId, contentId) => this.#service.decrementEpisodesCount(userId, contentId)
    checkUserexistence = (username) => this.#service.checkUserexistence(username)
    checkEmailexistence = (email) => this.#service.checkEmailexistence(email)
    modifyUserDetails = (userId, username, email, description) => this.#service.modifyUserDetails(userId, username, email, description)
    updateProfilePicture = (userId, profileImage) => this.#service.updateProfilePicture(userId, profileImage)
    updatePassword = (userId,  password) => this.#service.updatePassword(userId, password)
    deleteAccount = (id) => this.#service.deleteAccount(id)
}

module.exports = require('../bin/Singleton')(new Users())
