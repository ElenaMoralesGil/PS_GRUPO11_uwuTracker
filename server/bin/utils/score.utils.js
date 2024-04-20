
const jikanScoreNormalization = score => 5 / 9 * score - 5 / 9


const calcScore = (ourScore, scoreCount, jikanScore) => {
    const USER_THRESHOLD = 100

    return scoreCount >= USER_THRESHOLD ? ourScore
        : (scoreCount / USER_THRESHOLD) * ourScore + (1 - (scoreCount / USER_THRESHOLD)) * jikanScore
}


module.exports = { jikanScoreNormalization, calcScore }