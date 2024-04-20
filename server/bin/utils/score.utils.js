
const jikanScoreNormalization = score => 5 / 9 * score - 5 / 9

const calcScore = ({ ourScore, scoreCount, jikanScore }) => {
    const USER_THRESHOLD = 100

    return scoreCount >= USER_THRESHOLD ? ourScore
        : (scoreCount / USER_THRESHOLD) * ourScore + (1 - (scoreCount / USER_THRESHOLD)) * jikanScore
}

const calcWeithedScore = ({ prevUserScore = null, userScore, score, scoreCount }) => {
    const percent = (scoreCount - 1) / scoreCount

    return prevUserScore == null ? score * percent + (1 - percent) * userScore
        : score - (1 - percent) * prevUserScore + (1 - percent) * userScore
}

module.exports = { jikanScoreNormalization, calcScore, calcWeithedScore }