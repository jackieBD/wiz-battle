function rollDice(diceCount){
    const diceArr = new Array(diceCount).fill(1).map(()=>(Math.floor(Math.random() * 6)+1))
    return diceArr
}

function getPlaceholderDice(diceCount){
    const placeholders = new Array(diceCount).fill(`<div class="placeholder-dice"></div>`).join("")
    return placeholders
}

function getPercentage(max, remaining){
    const percentage = remaining * 100/max
    return percentage
}


export {rollDice, getPlaceholderDice, getPercentage}