const findRemainingAttributes = (aliens) => {
    const remainingAttributes = {
        skinColour: [],
        horns: [],
        eyes: [],
        eyeColour: [],
        hasAntenna: [],
        isFriendly: [],
        skinTexture: [],
        planet: []
    }

    aliens.forEach(alien => {
        for (let attribute in alien) {
            if (remainingAttributes[attribute]) {
                if (!remainingAttributes[attribute].includes(alien[attribute])) {
                    remainingAttributes[attribute].push(alien[attribute])
                }
            }
        }
    })

    return remainingAttributes
}

export default findRemainingAttributes