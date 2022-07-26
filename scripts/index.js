import { startGame, play, getPositions, getWinningPositions, getRound } from './game.js'

const itens = document.getElementsByClassName('board-item')
const scoreItens = document.getElementsByTagName('p')

let score = [0, 0]
let isRunning = true
startGame()

for (let i = 0; i < itens.length; i++) {
    itens[i].addEventListener('click', async () => {
        if (!isRunning) return

        play(i)
        itens[i].innerHTML = getPositions()[i]

        let round = getRound()

        if (round) {
            scoreItens[0].classList.add('scoreboard-item-round')
            scoreItens[1].classList.remove('scoreboard-item-round')
            scoreItens[1].classList.add('scoreboard-item')
        } else {
            scoreItens[1].classList.add('scoreboard-item-round')
            scoreItens[0].classList.remove('scoreboard-item-round')
            scoreItens[0].classList.add('scoreboard-item')
        }
        
        const winningPositions = getWinningPositions()
        if (winningPositions.length == 0) return
        
        isRunning = false

        for (let i = 0; i < itens.length; i++) {
            if (!winningPositions.includes(i))
                itens[i].innerHTML = ''
        }


        if (round) scoreItens[0].innerHTML = `X: ${++score[0]}`
        else scoreItens[1].innerHTML = `Ｏ: ${++score[1]}`
    })
}

document.getElementsByTagName('button')[0].addEventListener('click', restart)

function restart() {
    for (let item of itens) item.innerHTML = '-'
    isRunning = true
    startGame()

    scoreItens[0].classList.add('scoreboard-item-round')
    scoreItens[1].classList.remove('scoreboard-item-round')
    scoreItens[1].classList.add('scoreboard-item')
}