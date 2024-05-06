require('dotenv').config()
const bcrypt = require('bcrypt')

const { setDoc, doc } = require('firebase/firestore/lite')
const fss = require('../../services/firebase/firebase.service')

const { calcOurScore, calcScore, apiScoreNormalization } = require('../utils/index')

const Content = require('../../schemas/Content.schema')
const User = require('../../schemas/User.schema')
const Review = require('../../schemas/Review.schema')
const Comment = require('../../schemas/Comment.schema')


const randomFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))


// *=> consts
const USERS_SIZE = 10
const REVIEWS_SIZE = 10
const COMMENTS_SIZE = 20
const COMMENTS_MAX_LEVEL = 1
const COMMENTS_LEVEL_CONVERSION_PROP = .5




// *=> GENERATORS
const genContents = async () => {
    const contentsIds = [['52991', '1111', '1112']/*, ['432', '5', '51']*/]
    const contents = await Promise.all(contentsIds[0].map((id, idx) => fetch(`${process.env.JIKAN_PATH}/anime/${id}`)
        .then(res => res.json())
        .then(json => json.data)
        .then(content => Content.parse(content)))
    )

    // await setTimeout(async () => {
    //     contents.push(...await Promise.all(contentsIds[0].map((id, idx) => fetch(`${process.env.JIKAN_PATH}/anime/${id}`)
    //         .then(res => res.json())
    //         .then(json => json.data)
    //         .then(content => Content.parse(content))))
    //     )
    // }, 3000)

    return contents
}

const genUsers = async () => {

    const users = [User.parse({
        id: "0",
        username: 'pepe',
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(Number(process.env.SALT))),
        email: 'pepe@domain.com',
        country: 'Españita',
        description: 'El buen pepe',
        profilePicture: '"https://cdn.myanimelist.net/images/anime/9/11709.webp"'
    })]

    const adjective = ["Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan", "Broad", "Crooked", "Curved", "Deep", "Even", "Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan", "Broad", "Crooked", "Curved", "Deep", "Even", "Flat", "Hilly", "Jagged", "Round", "Shallow", "Square", "Steep", "Straight", "Thick", "Thin", "Cooing", "Deafening", "Faint", "Harsh", "High-pitched", "Hissing", "Hushed", "Husky", "Loud", "Melodic", "Moaning", "Mute", "Noisy", "Purring", "Quiet", "Raspy", "Screeching", "Shrill", "Silent", "Soft", "Squeaky", "Squealing", "Thundering", "Voiceless", "Whispering"]
    const object = ["Taco", "Operating System", "Sphere", "Watermelon", "Cheeseburger", "Apple Pie", "Spider", "Dragon", "Remote Control", "Soda", "Barbie Doll", "Watch", "Purple Pen", "Dollar Bill", "Stuffed Animal", "Hair Clip", "Sunglasses", "T-shirt", "Purse", "Towel", "Hat", "Camera", "Hand Sanitizer Bottle", "Photo", "Dog Bone", "Hair Brush", "Birthday Card"]
    const countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután",
        "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia",
        "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia",
        "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria",
        "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Palestina", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia",
        "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez",
        "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"]


    let username
    for (let i = 1; i < USERS_SIZE; i++) {

        do username = `${randomFromArr(adjective)}_${randomFromArr(object)}`
        while (users.some(user => user.username === username))

        users.push(User.parse({
            id: `${i}`,
            username,
            password: bcrypt.hashSync('pass', bcrypt.genSaltSync(Number(process.env.SALT))),
            email: `${username}@domain.com`,
            country: randomFromArr(countries),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            profilePicture: "https://cdn.myanimelist.net/images/anime/9/11709.webp"
        }))
    }

    return users
}

// Reviews
const genReviews = async () => {

    const adj = ["Worst", "Best", "Amazing", "Great"]
    const sus = ["experience", "anime", "content", "time"]
    const adver = ["of my life", "ever", "of all time"]

    const reviews = []
    for (let i = 0; i < REVIEWS_SIZE; i++)
        reviews.push(Review.parse({
            id: `${i}`,
            userId: "",
            content: "",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            dislikes: 0,
            likes: 0,
            title: `${randomFromArr(adj)} ${randomFromArr(sus)} ${randomFromArr(adver)}`
        }))

    return reviews
}


// Comments
const getComments = async () => {
    const adj = ["Worst", "Best", "Amazing", "Great"]
    const sus = ["experience", "anime", "content", "time"]
    const adver = ["of my life", "ever", "of all time"]

    const comments = []
    let comment
    for (let i = 0; i < COMMENTS_SIZE; i++) {

        comment = Comment.parse({
            id: `${i}`,
            title: `${randomFromArr(adj)} ${randomFromArr(sus)} ${randomFromArr(adver)}`,
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            level: 0,
            comments: []
        })

        comments.push(comment)
    }

    return comments
}


// *=> linker
linkDocs = ({ users, contents, reviews, comments }) => {

    let content, user, loopItr

    const userStandarLists = ['completed', 'dropped', 'planToWatch', 'watching']
    users.forEach(user => {

        // standard lists
        userStandarLists.forEach(list => {
            loopItr = randomNumber(0, contents.length - 1)
            for (let i = 0; i < loopItr; i++) {
                do content = randomFromArr(contents)
                while (user[list].includes(content.id))
                user[list].push(content.id)
            }
        })

        // favorites
        loopItr = randomNumber(0, contents.length - 1)
        for (let i = 0; i < loopItr; i++) {
            do content = randomFromArr(contents)
            while (user.favorites.includes(content.id))
            user.favorites.push(content.id)
            content.likes++
        }

        // user scores
        loopItr = randomNumber(0, contents.length - 1)
        for (let i = 0; i < loopItr; i++) {
            do content = randomFromArr(contents)
            while (Object.keys(user.userScores).includes(content.id))
            user.userScores[content.id] = randomNumber(0, 5)
        }

        // content progress
        loopItr = randomNumber(0, contents.length - 1)
        for (let i = 0; i < loopItr; i++) {
            do content = randomFromArr(contents)
            while (Object.keys(user.contentProgress).includes(content.id))
            user.contentProgress[content.id] = randomNumber(1, content.episodesNumber)
        }
    })

    // reviews
    reviews.forEach(review => {
        // reviews link
        do {
            user = randomFromArr(users)
            content = randomFromArr(contents)
        } while (reviews.filter(elm => elm.userId == user.id && elm.content).length > 0)

        review.userId = user.id
        review.content = content.id

        user.reviews.push(review.id)
        content.reviews.push(review.id)

        user.userScores[content.id] == undefined && (user.userScores[content.id] = randomNumber(0, 5))
        review.score = user.userScores[content.id]

        // liked reviews
        loopItr = randomNumber(0, users.length - 1)
        for (let i = 0; i < loopItr; i++) {
            do {
                user = randomFromArr(users)
            } while (user.likedReviews.includes(review.id))

            user.likedReviews.push(review.id)
            review.likes++
        }

        // disliked reviews
        loopItr = randomNumber(0, users.length - review.likes - 1)
        for (let i = 0; i < loopItr; i++) {
            do {
                user = randomFromArr(users)
            } while (user.likedReviews.includes(review.id) || user.dislikedReviews.includes(review.id))

            user.dislikedReviews.push(review.id)
            review.dislikes++
        }

    })

    // comments
    let tmpComment
    comments.forEach(comment => {
        user = randomFromArr(users)
        content = randomFromArr(contents)

        // forced lvl0 || standard lvl 0
        if (!content.comments.length || Math.random() > COMMENTS_LEVEL_CONVERSION_PROP) {

            comment.userId = user.id
            comment.username = user.username
            comment.contentId = content.id

            user.comments.push(comment.id)
            content.comments.push(comment.id)

            return
        }

        tmpComment = randomFromArr(comments.filter(elm => elm.level == 0))

        comment.father = tmpComment.id
        comment.userId = user.id
        comment.username = user.username
        comment.contentId = tmpComment.contentId
        comment.level = 1

        user.comments.push(comment.id)
    })


    return { users, contents, reviews, comments }
}


genData = async () => ({
    contents: await genContents(),
    users: await genUsers(),
    reviews: await genReviews(),
    comments: await getComments()
})


const seeData = () => genData().then(data => linkDocs(data)).then(data => {
    console.log("# Users\n")
    data.users.forEach(elm => {
        console.log("```json")
        console.log(elm.get())
        console.log("```")
    })

    console.log("# Contents\n")
    data.contents.forEach(elm => {
        console.log("```json")
        console.log(elm.get())
        console.log("```")
    })

    console.log("# Reviews\n")
    data.reviews.forEach(elm => {
        console.log("```json")
        console.log(elm.get())
        console.log("```")
    })

    console.log("# Comments\n")
    data.comments.forEach(elm => {
        console.log("```json")
        console.log(elm.get())
        console.log("```")
    })
})


populateDB = async (data) => {
    for (let [key, val] of Object.entries(data))
        val.forEach(async elm => {
            await setDoc(doc(fss.db, key.charAt(0).toUpperCase() + key.slice(1), `${elm.id}`), elm.get())
        })
}


const fn = {
    watch: () => seeData(),
    seed: () => genData().then(data => linkDocs(data)).then(data => populateDB(data))
}

fn.seed()