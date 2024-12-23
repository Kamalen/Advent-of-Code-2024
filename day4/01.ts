import { readExample, readInput } from '../common'

// let lanes: string[] = readExample('day4')
let lanes: string[] = readInput('day4')

let grid = lanes.map(lane => lane.split(''))

console.log('Grid size > ', grid.length, grid[0].length)

function getValueAtPoint(point: Point): string {
    return grid[point.y][point.x]
}

interface Point {
    x: number,
    y: number
}

const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 }
]

function computeDirectionalPoints(point: Point, direction: Point, length: number): Point[] {
    let points: Point[] = []
    for (let i = 1; i <= length; i++) {
        points.push({ x: point.x + (direction.x * i), y: point.y + (direction.y * i) })
    }
    return points.filter(point =>
        point.x >= 0 && point.x < grid[0].length &&
        point.y >= 0 && point.y < grid.length)
}

function seekWordInDirection(word: string[], point: Point, direction: Point) {
    const pointsInDirection = computeDirectionalPoints(point, direction, word.length)
    // If there is not enough point in the direction, no need to bother
    if (word.length !== pointsInDirection.length) {
        return 0
    }

    return pointsInDirection.every((newPoint, index) => getValueAtPoint(newPoint) === word[index]) ? 1 : 0
}

const wordToFind = [ 'X', 'M', 'A', 'S' ]

let result = 0
// Explore the grid
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        // Seeking current letter
        let point = { x, y }
        let value = getValueAtPoint(point)

        // If we find the first letter of the word, seek the other parts in all directions
        if (value === wordToFind[0]) {
            const newWordToFind = wordToFind.toSpliced(0, 1)
            result += directions.reduce((acc, direction) => {
                return acc + seekWordInDirection(newWordToFind, point, direction)
            }, 0)
        }
    }
}

console.log(result)