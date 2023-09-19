const chooseSecretAlien = (aliens) => {
    return aliens[Math.floor(Math.random() * aliens.length)]
}

export default chooseSecretAlien