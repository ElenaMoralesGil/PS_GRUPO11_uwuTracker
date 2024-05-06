
const apiScoreNormalization = score => score ? (5 / 9 * score - 5 / 9) : null

const calcScore = ({ ourScore, scoreCount, apiScore }) => {
    if (apiScore == null) return ourScore
    const USER_THRESHOLD = 100
    if (!apiScore) return ourScore;
    return scoreCount >= USER_THRESHOLD ? ourScore
        : (scoreCount / USER_THRESHOLD) * ourScore + (1 - (scoreCount / USER_THRESHOLD)) * apiScore
}

const calcOurScore = ({ prevUserScore = null, userScore, score, scoreCount }) => {
    const percent = (scoreCount - 1) / scoreCount

    return prevUserScore == null ? score * percent + (1 - percent) * userScore
        : score - (1 - percent) * prevUserScore + (1 - percent) * userScore
}

module.exports = { apiScoreNormalization, calcScore, calcOurScore }