import { readFileSync } from 'node:fs'
import { readInput } from '../common'

let day = 'day3'
console.log(`========= Reading input ${day} ===============`)
let file: string = readFileSync(`./${day}/input.txt`, 'utf8')

function mul(a,b) {
    return a*b
}

let regex = /mul\(([0-9]+),([0-9]+)\)/g
let operations = file.matchAll(regex)

let result = Array.from(operations).reduce((acc, val) => {
    return acc + mul(parseInt(val[1]), parseInt(val[2]))
}, 0)

console.log(result)