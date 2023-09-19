import findRemainingAttributes from "./findRemainingAttributes"
import findValidQuestions from "./findValidQuestions"
import { getQuestions } from "./getAliens"

const generateQuestions = (aliens) => {
    const remainingAliens = aliens.filter(alien => alien.isActive)
    const remainingAttributes = findRemainingAttributes(remainingAliens)
    return getQuestions().then((allQuestions) => {
        return findValidQuestions(remainingAttributes, allQuestions)
    }).then((validQ) => {
        return validQ
    })
}

export default generateQuestions 