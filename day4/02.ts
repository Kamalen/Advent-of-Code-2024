import { readExample, readInput } from '../common'
import { getValueAtPoint, isInBounds, Point } from './point'

// let lanes: string[] = readExample('day4')
let lanes: string[] = readInput('day4')

let grid = lanes.map(lane => lane.split(''))

console.log('Grid size > ', grid.length, grid[0].length)

function computeCrossAroundPoint(point: Point) {
    return [
        {x: point.x - 1, y: point.y - 1, seekDirection: {x: 1, y: 1}},
        {x: point.x - 1, y: point.y + 1, seekDirection: {x: 1, y: -1}},
        {x: point.x + 1, y: point.y - 1, seekDirection: {x: -1, y: 1}},
        {x: point.x + 1, y: point.y + 1, seekDirection: {x: -1, y: -1}},
    ].filter(isInBounds(grid[0].length, grid.length))
}

function computeDirectionalPoints(point: Point, direction: Point, length: number): Point[] {
    let points: Point[] = []
    for (let i = 0; i < length; i++) {
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
    const calculatedWord = pointsInDirection.map(p => getValueAtPoint(grid, p))

    return pointsInDirection.every((newPoint, index) => getValueAtPoint(grid, newPoint) === word[index]) ? 1 : 0
}

function seekXMas(point: Point) {
    const crossPoints = computeCrossAroundPoint(point)
    const matchs = crossPoints.reduce((acc, point, index) => {
        return acc + seekWordInDirection(['M', 'A', 'S'], point, point.seekDirection)
    }, 0)

    return (matchs == 2) ? 1 : 0
}

let result = 0
// Explore the grid
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        // Seeking current letter
        let point = { x, y }
        let value = getValueAtPoint(grid, point)

        // If we find the A, seek the other parts in all directions
        if (value === 'A') {
            result += seekXMas(point)
        }
    }
}

console.log(result)