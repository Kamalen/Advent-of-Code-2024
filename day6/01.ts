import { readExample, readExamplePure, readInput } from '../common'
import { GuardMap, StepResult } from './map'

// let lines: string[] = readExample('day6')
let lines: string[] = readInput('day6')
let map = new GuardMap(lines)

/**
 * Execute a movement step.
 * Returns false if the movement is finished (guard out of map)
 */
function step(): boolean {
    const newPoint = map.getNextPoint()
    if (map.isAnObstacle(newPoint)) {
        map.rotateGuard()
        return false
    } else if (map.isOutOfMap(newPoint)) {
        return true
    }  else {
        map.traversePoint(newPoint)
        return false
    }
}

let finished = false
while(!finished) {
    finished = step()
}

console.log(map.positionsCrossed.length)