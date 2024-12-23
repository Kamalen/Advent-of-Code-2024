import { readExample } from '../common'

let lanes: string[] = readExample('day4')
// let lanes: string[] = readInput('day4')

let grid = lanes.map(lane => lane.split(''))

console.log('Grid size > ', grid.length, grid[0].length)

function getValueAtPoint(point: Point): string {
    return grid[point.y][point.x]
}

interface Point {
    x: number,
    y: number
}

function computeAroundPoints(point: Point): Point[] {
    return [
        { x: point.x - 1, y: point.y },
        { x: point.x + 1, y: point.y },
        { x: point.x, y: point.y - 1 },
        { x: point.x, y: point.y + 1 },
        { x: point.x - 1, y: point.y - 1 },
        { x: point.x - 1, y: point.y + 1 },
        { x: point.x + 1, y: point.y - 1 },
        { x: point.x + 1, y: point.y + 1 }
    ].filter(point =>
        point.x >= 0 && point.x < grid[0].length &&
        point.y >= 0 && point.y < grid.length)
}

function findWordAround(word: string[], point: Point, depth: number = 0): number {
    const newWord = [ ...word ]
    const letter = newWord.shift()
    const prefix = ''.padStart(depth, '=')
    if (getValueAtPoint(point) === letter) {
        console.log(`${prefix}Letter find ${ letter } at point = `, point)

        if (newWord.length === 0) {
            console.log(`${prefix}Word completed, score 1`)
            return 1
        } else {
            console.log(`${prefix}Seeking word ${ newWord.join('') } around`)
            let lookAround = computeAroundPoints(point)
            return lookAround.reduce((acc, newPoint) => {
                return acc + findWordAround(newWord, newPoint, depth + 1)
            }, 0)
        }
    } else {
        console.log(`${prefix}Word not able to continue from point = `, point)
        return 0
    }
}

const wordToFind = [ 'X', 'M', 'A', 'S' ]
let result = 0
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let point = { x, y }
        result += findWordAround(wordToFind, point)
    }
}

console.log(result)