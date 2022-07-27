export class Game {
    #players = ['X', 'Ｏ']

    constructor() {
        this.#gameOver = false
        this.board = new Array(9)
        this.round = 0
    }

    play(position) {
        if (this.board[position] != undefined) return

        this.board[position] = this.#players[this.round]
        this.round = this.round === 1 ? 0 : 1
    }

    getWinningPositions() {
        let winningPositions = []

        for (let i = 0; i < 9; i += 3)
            checkIfEquals(0 + i, 1 + i, 2 + i)

        for (let i = 0; i < 3; i++)
            checkIfEquals(0 + i, 3 + i, 6 + i)

        for (let i = 0; i < 4; i += 2)
            checkIfEquals(4, 0 + i, 8 - i)


        function checkIfEquals(p1, p2, p3) {
            if (this.board[p1] != undefined && this.board[p1] == this.board[p2] && this.board[p2] == this.board[p3])
                winningPositions.push(p1, p2, p3)
        }

        return winningPositions
    }
}