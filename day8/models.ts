

export class Point {
    x: number
    y: number
    value?: string

    static filterDuplicates(points: Point[]): Point[] {
        return points.filter((point, index) => points.findIndex(p => p.x === point.x && p.y === point.y) === index)
    }

    constructor(x: number, y: number, antenna?: string) {
        this.x = x
        this.y = y
        this.value = antenna
    }

    add(distance: Point) {
        return new Point(this.x + distance.x, this.y + distance.y)
    }

    substract(distance: Point) {
        return new Point(this.x - distance.x, this.y - distance.y)
    }

    distance(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y)
    }

    antinodes(other: Point): Point[] {
        const distance = this.distance(other)
        return [
            this.add(distance),
            other.substract(distance)
        ]
    }

    antinodesWithHarmonicResonnance(other: Point, map: AntennaMap): Point[] {
        const distance = this.distance(other)
        const result = []
        // build negative direction until OOB
        let newPoint: Point = this
        while(map.isInBound(newPoint)) {
            result.push(newPoint)
            newPoint = newPoint.add(distance)
        }
        newPoint = other
        while(map.isInBound(newPoint)) {
            result.push(newPoint)
            newPoint = newPoint.substract(distance)
        }
        return result
    }

    toString() {
        return `${this.x};${this.y}`
    }
}

export class AntennaMap {
    width: number
    height: number

    antennas: Point[] = []

    constructor(private lines: string[]) {
        lines.forEach((line, y) => {
            const points = line.split('')
            points.forEach((pointValue, x) => {
                if(pointValue !== '.') {
                    this.antennas.push(new Point(x, y, pointValue))
                }
            })
        })

        this.width = lines[0].length
        this.height = lines.length
    }

    isInBound(point: Point): boolean {
        return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height
    }

    filterOutOfBoundsPoints(points: Point[]) {
        return points.filter(point => this.isInBound(point))
    }

    extractAntennaTypes(): string[] {
        return Array.from(this.antennas
            .filter(antenna => !!antenna.value)
            .reduce((acc, point) => acc.add(point.value), new Set<string>()))
    }

    partitionAntennasByTypes(): {[antenna: string]: Point[]} {
        const result = {}
        this.extractAntennaTypes().forEach(antennaValue => {
            if(!result[antennaValue]) {
                result[antennaValue] = []
            }

            result[antennaValue].push(...this.antennas.filter(antenna => antenna.value === antennaValue))
        })
        return result
    }

    printAntinodesMap(points: Point[]) {
        let line = ''
        for(let y = 0; y < this.height; y++) {
            line = ''
            for(let x = 0; x < this.width; x++) {
                if(points.find(p => p.x === x && p.y === y)) {
                    line += '#'
                } else {
                    line += '.'
                }
            }
            console.log(line)
        }
    }
}