import {rollDice, getPlaceholderDice, getPercentage} from "./utils.js"

function Character(data){
    Object.assign(this, data)

    this.maxHealth = this.healthPoints

    this.diceArray = getPlaceholderDice(this.diceCount)

    this.getDiceHtml = ()=> {
        this.currentDiceScore = rollDice(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num=>
            `<div class="dice">${num}</div>`).join("")
    }

    this.takeDamage = (enemyDiceScore)=>{
        const total = enemyDiceScore.reduce((prev, current)=> prev+current)
        this.healthPoints-=total
        if (this.healthPoints <1) {
            this.healthPoints = 0
            this.dead = true
        }
        // const percentStrng = `The ${this.name} has ${getPercentage(this.maxHealth, this.healthPoints)}% health left`
        // console.log(percentStrng)
    }

    this.getHealthBarHtml = ()=>{
        const percent = getPercentage(this.maxHealth, this.healthPoints)
        const checkDanger = ()=>{
            if (percent < 25){
                return 'danger'
            } 
        }
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${checkDanger()} " 
                    style="width: ${percent}%;">
                    </div>
                </div>`
    }

    this.getHtml = ()=>{
        const healthbarHtml = this.getHealthBarHtml()
        const {name, imgSource, healthPoints, diceArray} = this
        return `<div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${imgSource}"/>
        <div class="health">health: <b> ${healthPoints} </b></div>
        <div class="dice-container">${diceArray}</div>
        ${healthbarHtml}

    </div>`

    }

}

export default Character
