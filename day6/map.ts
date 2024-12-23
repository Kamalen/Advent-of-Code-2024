
export enum StepResult {
    PASS,
    ROTATION,
    LOOP,
    OUT_OF_BOUNDS,
}

export class Point {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toString() {
        return `${(this.x)} ; ${(this.y)}`
    }

    equals(p: Point): boolean {
        return this.x === p.x && this.y === p.y
    }

    addDirection(direction: Point) {
        return new Point(this.x + direction.x, this.y + direction.y)
    }
}

export const DIRECTION_UP = new Point(0, -1)
export const DIRECTION_DOWN = new Point(0, 1)
export const DIRECTION_LEFT = new Point(-1, 0)
export const DIRECTION_RIGHT = new Point(1, 0)

export class GuardMap {
    private guardDirection: Point = new Point(0, -1)

    private _obstacles: Point[]

    guardPosition: Point

    private crossedPoints: Point[] = []
    crossedPointsDirection: Point[] = []

    width: number
    height: number

    constructor(private lines: string[]) {
        this._obstacles = []
        for (let y = 0; y < lines.length; y++) {
            let line = lines[y];
            let lineElements = line.split('')

            for (let x = 0; x < lineElements.length; x++) {
                let element = lineElements[x]
                if(element === '#') {
                    this._obstacles.push(new Point(x, y))
                }
                if(element === '^') {
                    this.guardPosition = new Point(x, y)
                    this.crossedPoints = []
                    this.crossedPoints.push(this.guardPosition)
                    this.crossedPointsDirection.push(this.guardDirection)
                }
            }
        }

        this.height = lines.length
        this.width = lines[0].length
    }

    public get obstacles() {
        return this._obstacles
    }

    public copyWithNewObstacle(point: Point): GuardMap {
        const newMap = new GuardMap(this.lines)
        newMap.obstacles.push(point)
        return newMap
    }

    public getNextPoint() {
        return this.guardPosition.addDirection(this.guardDirection)
    }

    public isAnObstacle(point: Point) {
        return !!this._obstacles.find(p => p.x === point.x && p.y === point.y)
    }

    public rotateGuard() {
        if (this.guardDirection.equals(DIRECTION_UP)) {
            this.guardDirection = DIRECTION_RIGHT
        } else if(this.guardDirection.equals(DIRECTION_RIGHT)) {
            this.guardDirection = DIRECTION_DOWN
        } else if (this.guardDirection.equals(DIRECTION_DOWN)) {
            this.guardDirection = DIRECTION_LEFT
        } else if (this.guardDirection.equals(DIRECTION_LEFT)) {
            this.guardDirection = DIRECTION_UP
        }
    }

    public isOutOfMap(p: Point) {
        return p.x < 0 || p.x >= this.width
            || p.y < 0 || p.y >= this.height
    }

    public get positionsCrossed() {

        return this.crossedPoints
            .filter((point, index) => this.crossedPoints.findIndex(p => p.x === point.x && p.y === point.y) === index)
    }

    hasPointBeenTraversedAlready(point: Point) {
        const pointIndex = this.crossedPoints.findIndex(p => p.x === point.x && p.y === point.y)
        return pointIndex > -1 && this.crossedPointsDirection[pointIndex].equals(this.guardDirection)
    }

    traversePoint(point: Point) {
        this.crossedPoints.push(point)
        this.crossedPointsDirection.push(this.guardDirection)
        this.guardPosition = point
    }
}