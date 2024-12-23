export interface Point {
    x: number,
    y: number
}

export function isInBounds(xLength: number, yLength) {
    return (point: Point) =>
        point.x >= 0 && point.x < xLength &&
        point.y >= 0 && point.y < yLength
}

export function getValueAtPoint(grid: string[][], point: Point): string {
    return grid[point.y][point.x]
}