import { Game } from './game.js'

const views = document.getElementsByClassName('board-item')
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

    if (game.winningPositions.length != 0) onFinished()
}

function onFinished() {
    gameOver = true

    for (let i = 0; i < views.length; i++) {
        if (!game.winningPositions.includes(i)) views[i].innerHTML = ''
    }
}

function restart() {
    game = new Game()
    gameOver = false

    for (let view of views) {
        view.innerHTML = ''
    }
}