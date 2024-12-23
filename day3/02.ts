import { readFileSync } from 'node:fs'

let day = 'day3'
console.log(`========= Reading input ${day} ===============`)
let file: string = readFileSync(`./${day}/input.txt`, 'utf8')

function mul(a,b) {
    return a*b
}

let megaRegex = /^(.*?)don't\(\)|do\(\)(.*?)don't\(\)|do\(\)(.*?)$/g
let multiplicationRegex = /mul\(([0-9]+),([0-9]+)\)/g

let completeRegexResult = file.matchAll(megaRegex)
let executableFile = Array.from(completeRegexResult).reduce((acc, val) => {
    return acc + val[1] + val[2] + val[3]
}, '')

let operations = executableFile.matchAll(multiplicationRegex)

let result = Array.from(operations).reduce((acc, val) => {
    return acc + mul(parseInt(val[1]), parseInt(val[2]))
}, 0)

console.log(result)