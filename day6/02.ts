import { Worker } from 'node:worker_threads'
import { readExample, readInput } from '../common'
import { GuardMap, StepResult } from './map'

// let lines: string[] = readExample('day6')
let lines: string[] = readInput('day6')

let time = Date.now()

/**
 * Execute a movement step.
 * Returns false if the movement is finished (guard out of map)
 */
function step(map: GuardMap): StepResult {
    const newPoint = map.getNextPoint()
    if (map.isAnObstacle(newPoint)) {
        map.rotateGuard()
        return StepResult.ROTATION
    } else if (map.isOutOfMap(newPoint)) {
        return StepResult.OUT_OF_BOUNDS
    } else if (map.hasPointBeenTraversedAlready(newPoint)) {
        return StepResult.LOOP
    } else {
        map.traversePoint(newPoint)
        return StepResult.PASS
    }
}

let startingMap = new GuardMap(lines)

// First process the normal path of the guard
let finished = false
while(!finished) {
    let doneStep = step(startingMap)
    finished = doneStep !== StepResult.PASS && doneStep !== StepResult.ROTATION
}

let result = 0
for (let pointOfPath of startingMap.positionsCrossed) {
    let newMap = startingMap.copyWithNewObstacle(pointOfPath)
    let status = null
    while(true) {
        status = step(newMap)
        if(status === StepResult.LOOP) {
            result++
            break;
        } else if (status === StepResult.OUT_OF_BOUNDS) {
            break;
        }
    }
}

console.log(result)
console.log(`Time of execution : ${Date.now() - time}`)