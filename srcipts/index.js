const titles = document.getElementsByTagName('h1')
const itens = document.getElementsByClassName('item')

let isRunning = true
let positions = []
let round = 0

titles[1].addEventListener('click', restartGame)

for (let i = 0; i < itens.length; i++) {
    positions.push('-')

    itens[i].addEventListener('click', () => {
        if (itens[i].innerHTML != '-') return

        positions[i] = round ? 'o' : 'x'
        itens[i].innerHTML = positions[i]
        itens[i].style.color = round ? '#e36262' : '#6282e3'

        const victoriousPositions = checkVictory()

        if (victoriousPositions.length != 0)
            onFinished(victoriousPositions)
        else {
            const unplayedPositions = positions.filter((positions) => positions === '-')
            
            if (unplayedPositions.length == 0) onFinished()
            else round = round ? 0 : 1
        }
    })
}

function checkVictory() {
    let victoriousPositions = []

    for (let i = 0; i < 9; i += 3)
        checkIfEquals(0 + i, 1 + i, 2 + i)

    for (let i = 0; i < 3; i++)
        checkIfEquals(0 + i, 3 + i, 6 + i)

    for (let i = 0; i < 4; i += 2)
        checkIfEquals(4, 0 + i, 8 - i)


    function checkIfEquals(p1, p2, p3) {
        if (positions[p1] != '-' && positions[p1] == positions[p2] && positions[p2] == positions[p3])
            victoriousPositions.push(p1, p2, p3)
    }

    return victoriousPositions
}

function onFinished(victoriousPositions) {
    isRunning = false

    titles[0].style.display = 'none'
    titles[1].style.display = 'block'

    for (let i = 0; i < itens.length; i++) {
        if (!victoriousPositions.includes(i))
            itens[i].innerHTML = ''
    }
}

function restartGame() {
    isRunning = true
    positions = []
    round = 0

    for (let i = 0; i < itens.length; i++) {
        positions[i] = '-'
        itens[i].innerHTML = '-'
        itens[i].style.color = '#cccccc'
    }

    titles[0].style.display = 'block'
    titles[1].style.display = 'none'
}