const findValidQuestions = (remainingAttributes, allQuestions) => {
    const remainingQuestions = []
    for (let attribute in remainingAttributes) {
        remainingAttributes[attribute].forEach(variation => {
            const question = allQuestions.filter(question => question.checkFor === variation && question.alienProp === attribute)
            remainingQuestions.push(question[0])
        })
    }
    // shuffle question order
    return remainingQuestions.sort((a, b) => 0.5 - Math.random());
}

export default findValidQuestions