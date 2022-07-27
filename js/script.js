import { Game } from './game.js'

const views = document.getElementsByClassName('board-item')
const scoreview = document.getElementsByTagName('p')

let score = [0, 0]
let game = new Game()
let gameOver = false

document.getElementsByTagName('button')[0].addEventListener('click', restart)

for (let i = 0; i < views.length; i++) {
    const view = views[i]
    view.addEventListener('click', () => onClick(i, view))
}

function onClick(position, view) {
    if (gameOver) return

    game.play(position)
    view.innerHTML = game.board[position]

    if (game.winningPositions.length != 0) return onFinished()
    updateRound()
}

function updateRound() {
    scoreview[game.round].classList.add('scoreview-selected')
    scoreview[game.round ? 0 : 1].classList.remove('scoreview-selected')
}

function onFinished() {
    gameOver = true
    score[game.round ? 0 : 1]++

    scoreview[0].innerHTML = `X: ${score[0]}`
    scoreview[1].innerHTML = `Ｏ: ${score[1]}`

    for (let i = 0; i < views.length; i++) {
        if (!game.winningPositions.includes(i)) views[i].innerHTML = ''
    }
}

function restart() {
    game = new Game()
    updateRound()
    
    for (let view of views) {
        view.innerHTML = ''
    }
    
    gameOver = false
}