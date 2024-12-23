import { readExample, readInput } from '../common'
import { AntennaMap, Point } from './models'

// let lines: string[] = readExample('day8')
let lines: string[] = readInput('day8')

let map = new AntennaMap(lines)

let partitonnedPoints = map.partitionAntennasByTypes()
let antinodes = []
Object.keys(partitonnedPoints).forEach((antennaValue) => {
    let points = partitonnedPoints[antennaValue]
    for(let j = 0; j < points.length-1; j++) {
        for(let i = j+1; i < points.length; i++) {
            antinodes.push(...points[j].antinodes(points[i]))
        }
    }
})

// console.log(Point.filterDuplicates(antinodes))
console.log(map.filterOutOfBoundsPoints(Point.filterDuplicates(antinodes)).length)