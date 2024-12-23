
import { readExample, readExamplePure, readInput, readInputPure } from '../common'
import { buildRules, checkUpdateValidity, sorter } from './rules'

// let file: string = readExamplePure('day5')
let file: string = readInputPure('day5')

let content = file.split('\n\n')
let rules = content[0].split('\n')
let updates = content[1].split('\n')

console.log(rules)
console.log(updates)

buildRules(rules)

let result = 0
let wrongUpdates: number[][] = []
updates.forEach(updateText => {
    let update = updateText.split(',').map(x => parseInt(x))
    let validity = checkUpdateValidity(update)
    if (!checkUpdateValidity(update)) {
        wrongUpdates.push(update)
    }
})

wrongUpdates.forEach(wrongUpdate => {
    let correctedUpdate = wrongUpdate.toSorted(sorter)
    result += correctedUpdate[Math.floor(correctedUpdate.length / 2)]
})

console.log(result)