import {characterData} from "./data.js"
import Character from "./Character.js"

let monstersArray = ["orcData", "demonData", "dragonData"]

function getNewMonster(){
    const nextMonsterData= characterData[monstersArray.shift()]
    if (!nextMonsterData){
        setTimeout(endGame, 1500)
    }

    return new Character(nextMonsterData)   


}

function render(){
    document.getElementById('hero').innerHTML = wiz.getHtml()
    document.getElementById('monster').innerHTML = monster.getHtml()

}

function attack(){
    wiz.getDiceHtml()
    monster.getDiceHtml()
    monster.takeDamage(wiz.currentDiceScore)
    wiz.takeDamage(monster.currentDiceScore)
    render()
    if (wiz.dead){
        document.getElementById("attack-button").classList.add("disabled")
        setTimeout(endGame, 1400)
    }

    else if (monster.dead){
        document.getElementById("attack-button").classList.add("disabled")
        if (monstersArray.length>0){
        setTimeout(()=>{
            monster = getNewMonster()
            document.getElementById("attack-button").classList.remove("disabled")
            render()
        }, 1200)}
        else {
            setTimeout(endGame, 1400)
        }
    }
        
}

function endGame(){
    const endEmoji = wiz.dead ? "☠️" : "🔮"
    const endMessage = wiz.dead && monster.dead? "Everyone is dead" 
    : monster.dead? "The Wizard defeated the Monsters!" :
    "The Wizard has perished."
    
    document.getElementById('main').innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
    <button onClick="window.location.reload();">Play Again</button>
    </div>` 

}

document.getElementById("attack-button").addEventListener("click", attack)

const wiz = new Character(characterData.wizData)    
let monster = getNewMonster()

render()

