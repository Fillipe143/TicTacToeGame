let positions = []
let round = 0

export function startGame() {
    round = 0
    positions = []
    for (let i = 0; i < 9; i++) positions.push('-')
}

export function play(position) {
    if (positions[position] !== '-') return

    positions[position] = round ? 'Ｏ' : 'x'
    round = round ? 0 : 1
}

export function getWinningPositions() {
    let winningPositions = []

    for (let i = 0; i < 9; i += 3)
        checkIfEquals(0 + i, 1 + i, 2 + i)

    for (let i = 0; i < 3; i++)
        checkIfEquals(0 + i, 3 + i, 6 + i)

    for (let i = 0; i < 4; i += 2)
        checkIfEquals(4, 0 + i, 8 - i)


    function checkIfEquals(p1, p2, p3) {
        if (positions[p1] != '-' && positions[p1] == positions[p2] && positions[p2] == positions[p3])
            winningPositions.push(p1, p2, p3)
    }

    return winningPositions
}

export function getPositions() {
    return positions
}

export function getRound() {
    return round
}