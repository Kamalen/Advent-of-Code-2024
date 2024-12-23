import { readInput } from '../common'

let lanes: string[] = readInput('day1')

let list1: number[] = []
let list2: number[] = []

lanes.forEach(lane => {
    let elems = lane.split('   ')
    list1.push(parseInt(elems[0]))
    list2.push(parseInt(elems[1]))
})

let similarity = 0

list1.forEach(element => {
    similarity += element * list2.filter(item => item == element).length
})

console.log(similarity)
